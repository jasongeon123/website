import { FaGraduationCap } from "react-icons/fa";
import { education } from "@/data/content";

export default function Education() {
  return (
    <section className="education" id="education">
      <div className="maxWidth">
        <div className="title">Education</div>

        <div className="education-content">
          {education.map((edu, index) => (
            <div key={index} className="education-card">
              <div className="education-icon">
                <FaGraduationCap />
              </div>
              <div className="education-info">
                <h3>{edu.school}</h3>
                <p className="degree">{edu.degree}</p>
                <p className="specialization">{edu.specialization}</p>
                <p className="minor">Minor: {edu.minor}</p>
                <p className="period">{edu.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
