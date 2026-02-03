import { FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="maxWidth">
        <h2 className="title">Testimonials</h2>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <p className="quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <p className="author-name">{testimonial.name}</p>
                <p className="author-title">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
