import Image from "next/image";
import { education } from "@/data/content";

export default function Education() {
  return (
    <section className="education" id="education">
      <div className="maxWidth">
        <h2 className="title">Education</h2>

        <div className="education-content">
          {education.map((edu, index) => (
            <div key={index} className="education-card">
              <div className="education-logo">
                <Image
                  src={edu.logo}
                  alt={`${edu.school} logo`}
                  width={60}
                  height={60}
                />
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
