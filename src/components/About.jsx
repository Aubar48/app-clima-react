// src/components/AboutButtonAndCards.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import teamMembers from "../data/teamMembers";

export default function AboutButtonAndCards() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/about")} style={{ marginBottom: "20px" }}>
        Sobre Nosotros
      </button>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {teamMembers.map(({ name, photo, portfolio, github, linkedin }) => (
          <div
            key={name}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              width: "250px",
              textAlign: "center",
              boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={photo}
              alt={`Foto de ${name}`}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{name}</h3>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              {portfolio && (
                <a href={portfolio} target="_blank" rel="noreferrer">
                  Portfolio
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
