import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";
import api from "../../services/api";

import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";

import "./styles.css";

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get("connections").then((response) => {
      console.log(response);
      const { total } = response.data;
      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="" />
          <h2>Sua Plataforma de Estudos Online</h2>
        </div>

        <img
          src={landingImg}
          alt="Plataforma de Estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>

          <Link to="/new-teacher" className="give-classes">
            <img src={giveClassesIcon} alt="Dar Aula" />
            Dar Aula
          </Link>
        </div>

        <span className="total-connections">
          Total de {totalConnections} conexoes ja realizadas{" "}
          <img src={purpleHeartIcon} alt="Coracao Roxo" />
        </span>
      </div>
    </div>
  );
}

export default Landing;
