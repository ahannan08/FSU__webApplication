import React from "react";
import AboutCard from "../components/AboutCard/AboutCard";
// import ganeshImg from "../assets/ganesh.jpg";
// import manishImg from "../assets/manish.jpg";
import "./About.css";

const About = () => {
  const team = [
    {
      name: "Ganesh Katrapati",
      title: "Co-Founder & CEO",
      bio: "Ganesh is an experienced AI professional and a senior PhD fellow from IIITH. With over a decade experience in AI/ML, he has developed AI solutions across banking, sports, and communications. His expertise lies in aligning business needs with AI innovation and identifying transformative opportunities.",
      // image: ganeshImg,
    },
    {
      name: "Prof. Manish Shrivastava",
      title: "Co-Founder, Director of Research & Strategy",
      bio: "Manish is a professor at IIIT with over a decade of teaching experience and a distinguished research career with publications in top AI & NLP conferences. He brings extensive industry expertise, leading multiple collaborations and advising GenAI startups, guiding both new and seasoned teams to success.",
      // image: manishImg,
    },
  ];

  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="team-section">
        {team.map((member, index) => (
          <AboutCard key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default About;
