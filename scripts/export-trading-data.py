"""
Export trading bot data to static JSON for the portfolio dashboard.
Reads from ../trading-alert-bot/data/trading_data.db and outputs to
public/trading-dashboard/data/
"""

import sqlite3
import json
from pathlib import Path
from datetime import datetime

SCRIPT_DIR = Path(__file__).parent
PORTFOLIO_ROOT = SCRIPT_DIR.parent
DB_PATH = PORTFOLIO_ROOT.parent / "trading-alert-bot" / "data" / "trading_data.db"
OUTPUT_DIR = PORTFOLIO_ROOT / "public" / "trading-dashboard" / "data"

# Same filters as server.py
FILTERS = {
    "combined": """(
        (signal_score BETWEEN 36 AND 39 OR signal_score BETWEEN -39 AND -36)
        AND (confidence BETWEEN 40 AND 49 OR confidence BETWEEN 70 AND 79)
    )""",
    "buy": """(
        signal_score BETWEEN 36 AND 39
        AND (confidence BETWEEN 40 AND 49 OR confidence BETWEEN 70 AND 79)
    )""",
    "sell": """(
        signal_score BETWEEN -39 AND -36
        AND (confidence BETWEEN 40 AND 49 OR confidence BETWEEN 70 AND 79)
    )""",
}


def get_connection():
    if not DB_PATH.exists():
        print(f"Database not found at {DB_PATH}")
        return None
    conn = sqlite3.connect(str(DB_PATH), timeout=10.0)
    conn.row_factory = sqlite3.Row
    return conn


def export_stats(conn, filter_name, clause):
    cursor = conn.cursor()

    cursor.execute(f"""
        SELECT
            COUNT(*) as total_trades,
            SUM(CASE WHEN pnl_dollars > 0 THEN 1 ELSE 0 END) as total_winners,
            SUM(CASE WHEN pnl_dollars < 0 THEN 1 ELSE 0 END) as total_losers,
            COALESCE(SUM(pnl_dollars), 0) as total_pnl,
            COALESCE(AVG(pnl_percent), 0) as avg_pnl_pct,
            COALESCE(MAX(pnl_percent), 0) as best_trade_pct,
            COALESCE(MIN(pnl_percent), 0) as worst_trade_pct,
            COALESCE(SUM(CASE WHEN pnl_dollars > 0 THEN pnl_dollars ELSE 0 END), 0) as gross_profit,
            COALESCE(SUM(CASE WHEN pnl_dollars < 0 THEN ABS(pnl_dollars) ELSE 0 END), 0) as gross_loss,
            COALESCE(AVG(CASE WHEN pnl_dollars > 0 THEN pnl_percent END), 0) as avg_win_pct,
            COALESCE(AVG(CASE WHEN pnl_dollars < 0 THEN pnl_percent END), 0) as avg_loss_pct
        FROM smart_option_selections
        WHERE status = 'closed'
            AND pnl_dollars IS NOT NULL
            AND {clause}
    """)
    row = cursor.fetchone()

    total_trades = row["total_trades"] or 0
    total_winners = row["total_winners"] or 0
    gross_profit = row["gross_profit"] or 0
    gross_loss = row["gross_loss"] or 0
    profit_factor = round(gross_profit / gross_loss, 2) if gross_loss > 0 else 0

    # Today
    cursor.execute(f"""
        SELECT COUNT(*) as trades, COALESCE(SUM(pnl_dollars), 0) as pnl
        FROM smart_option_selections
        WHERE date(timestamp, 'localtime') = date('now', 'localtime')
            AND status = 'closed' AND {clause}
    """)
    today = cursor.fetchone()

    # Week
    cursor.execute(f"""
        SELECT COUNT(*) as trades, COALESCE(SUM(pnl_dollars), 0) as pnl
        FROM smart_option_selections
        WHERE timestamp >= datetime('now', '-7 days')
            AND status = 'closed' AND {clause}
    """)
    week = cursor.fetchone()

    # Month
    cursor.execute(f"""
        SELECT COUNT(*) as trades, COALESCE(SUM(pnl_dollars), 0) as pnl
        FROM smart_option_selections
        WHERE timestamp >= datetime('now', '-30 days')
            AND status = 'closed' AND {clause}
    """)
    month = cursor.fetchone()

    return {
        "overall": {
            "total_trades": total_trades,
            "total_winners": total_winners,
            "total_losers": row["total_losers"] or 0,
            "win_rate": round(total_winners / total_trades * 100, 1) if total_trades > 0 else 0,
            "total_pnl": round(row["total_pnl"], 2),
            "avg_pnl_pct": round(row["avg_pnl_pct"], 2),
            "best_trade_pct": round(row["best_trade_pct"], 2),
            "worst_trade_pct": round(row["worst_trade_pct"], 2),
            "profit_factor": profit_factor,
            "avg_win_pct": round(row["avg_win_pct"], 2) if row["avg_win_pct"] else 0,
            "avg_loss_pct": round(row["avg_loss_pct"], 2) if row["avg_loss_pct"] else 0,
        },
        "today": {"trades": today["trades"] or 0, "pnl": round(today["pnl"], 2)},
        "week": {"trades": week["trades"] or 0, "pnl": round(week["pnl"], 2)},
        "month": {"trades": month["trades"] or 0, "pnl": round(month["pnl"], 2)},
        "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }


def export_daily(conn, filter_name, clause, days=30):
    cursor = conn.cursor()
    cursor.execute(f"""
        SELECT
            date(timestamp, 'localtime') as date,
            COUNT(*) as total_trades,
            SUM(CASE WHEN pnl_dollars > 0 THEN 1 ELSE 0 END) as winners,
            SUM(CASE WHEN pnl_dollars < 0 THEN 1 ELSE 0 END) as losers,
            COALESCE(SUM(pnl_dollars), 0) as daily_pnl
        FROM smart_option_selections
        WHERE timestamp >= datetime('now', ? || ' days')
            AND status = 'closed'
            AND {clause}
        GROUP BY date(timestamp, 'localtime')
        ORDER BY date DESC
    """, (f'-{days}',))

    return [
        {
            "date": row["date"],
            "total_trades": row["total_trades"],
            "winners": row["winners"],
            "losers": row["losers"],
            "daily_pnl": round(row["daily_pnl"], 2),
        }
        for row in cursor.fetchall()
    ]


def export_trades(conn, filter_name, clause, limit=8):
    cursor = conn.cursor()
    cursor.execute(f"""
        SELECT symbol, action, pnl_dollars, pnl_percent,
               datetime(timestamp, 'localtime') as timestamp
        FROM smart_option_selections
        WHERE status = 'closed'
            AND pnl_dollars IS NOT NULL
            AND {clause}
        ORDER BY timestamp DESC
        LIMIT ?
    """, (limit,))

    return [
        {
            "symbol": row["symbol"],
            "action": row["action"],
            "pnl_dollars": round(row["pnl_dollars"], 2) if row["pnl_dollars"] else 0,
            "pnl_percent": round(row["pnl_percent"], 1) if row["pnl_percent"] else 0,
            "timestamp": row["timestamp"],
        }
        for row in cursor.fetchall()
    ]


def main():
    conn = get_connection()
    if not conn:
        print("No database found, skipping trading data export")
        return

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for filter_name, clause in FILTERS.items():
        print(f"Exporting {filter_name}...")

        stats = export_stats(conn, filter_name, clause)
        (OUTPUT_DIR / f"stats-{filter_name}.json").write_text(json.dumps(stats))

        daily = export_daily(conn, filter_name, clause)
        (OUTPUT_DIR / f"daily-{filter_name}.json").write_text(json.dumps(daily))

        trades = export_trades(conn, filter_name, clause)
        (OUTPUT_DIR / f"trades-{filter_name}.json").write_text(json.dumps(trades))

    conn.close()
    print(f"Exported to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
