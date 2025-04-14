import React from "react";
import "./AboutCard.css";

const AboutCard = ({ name, title, bio, image }) => {
  return (
    <div className="about-card">
      <img src={image} alt={name} className="profile-img" />
      <div className="about-info">
        <h2>{name}</h2>
        <h4>{title}</h4>
        <p>{bio}</p>
      </div>
    </div>
  );
};

export default AboutCard;
