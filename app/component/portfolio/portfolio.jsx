// PortfolioSection.jsx
import React from "react";

const projects = [
  {
    title: "Loon App",
    description:
      "The Urban Green Spaces Initiative aims to transform unused urban areas into vibrant green spaces.",
    image: "/pr-1.png"
  },
  {
    title: "Aurora Dashboard",
    description:
      "A powerful analytics dashboard that helps teams track performance in real time.",
    image: "https:/pr-2.png"
  },
  {
    title: "Nova Commerce",
    description:
      "An e-commerce experience designed to make online shopping delightful.",
    image: "https://via.placeholder.com/800x500?text=Project+3"
  },
  {
    title: "Orbit Finance",
    description:
      "A modern finance app that keeps your spending and saving on track.",
    image: "https://via.placeholder.com/800x500?text=Project+4"
  },
  {
    title: "Pulse Health",
    description:
      "A digital health companion that makes wellness tracking effortless.",
    image: "https://via.placeholder.com/800x500?text=Project+5"
  }
];

export default function PortfolioSection() {
  return (
    <section className="portfolio-section">
      <div className="portfolio-inner">
        {/* LEFT: sticky text */}
        <div className="portfolio-left">
          <p className="eyebrow">+ SELECTED WORK</p>
          <h1 className="headline">
            We&apos;ll Take Your Product to New Global Heights
          </h1>
          <p className="subcopy">
            Browse through our portfolio — your project could be our next
            standout feature!
          </p>

          <div className="button-row">
            <button className="primary-btn">View All Projects</button>
            <button className="ghost-btn">View Our X</button>
          </div>
        </div>

        {/* RIGHT: scrollable list of images + descriptions */}
        <div className="portfolio-right">
          {projects.map((project, index) => (
            <article className="project-card" key={index}>
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} />
              </div>
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}