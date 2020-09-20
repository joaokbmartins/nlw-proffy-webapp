import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";
import api from "../../services/api";

export interface Teacher {
  id: number;
  name: string;
  avatar: string;
  subject: string;
  bio: string;
  cost: string;
  whatsapp: string;
}

interface TeacherProps {
  teacher: Teacher;
}

const TeacherItem: React.FunctionComponent<TeacherProps> = ({ teacher }) => {
  function handleCreateNewConnection() {
    api
      .post("connections", {
        user_id: teacher.id,
      })
      .then((response) => {
        console.log("Nova conexao realizada.");
      });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preco/Hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a
          href={`https://wa.me/${teacher.whatsapp}`}
          onClick={handleCreateNewConnection}
          target="blank"
        >
          <img src={whatsappIcon} alt="Contato via Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
