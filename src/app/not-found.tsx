import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-terminal">
        <div className="not-found-header">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="not-found-body">
          <p className="not-found-prompt">
            <span className="not-found-user">geon@portfolio:~$</span> cd /this-page
          </p>
          <p className="not-found-error">
            bash: cd: /this-page: No such file or directory
          </p>
          <p className="not-found-code">404</p>
          <p className="not-found-message">Page Not Found</p>
          <p className="not-found-hint">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/" className="not-found-btn">
            cd /home &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
