import React, { useState, FormEvent } from "react";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Select from "../../components/Select";

import TeacherItem, { Teacher } from "../../components/TeacherItem";

import api from "../../services/api";

import "./styles.css";

function TeacherList() {
  const [week_day, setWeek_day] = useState("");
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [teachers, setTeachers] = useState([]);

  async function handleSearchTeachers(e: FormEvent) {
    e.preventDefault();
    const response = await api.get("classes", {
      params: {
        week_day,
        subject,
        time,
      },
    });
    const data = response.data;
    if (data.error) {
      alert("Preecha os campos para realizar a busca.");
    } else {
      setTeachers(data);
    }
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes sao os proffys disponiveis:">
        <form id="search-teachers" onSubmit={handleSearchTeachers}>
          <Select
            label="Materia"
            name="subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            options={[
              { value: "Portugues", label: "Portugues" },
              { value: "Ingles", label: "Ingles" },
              { value: "Artes", label: "Artes" },
              { value: "Historia", label: "Historia" },
              { value: "Sociologia", label: "Sociologia" },
              { value: "Educacao Fisica", label: "Educacao Fisica" },
              { value: "Matematica", label: "Matematica" },
              { value: "Ciencias", label: "Ciencias" },
              { value: "Quimica", label: "Quimica" },
              { value: "Fisica", label: "Fisica" },
              { value: "Biologia", label: "Biologia" },
            ]}
          />
          <Select
            label="Dia da Semana"
            name="week_day"
            value={week_day}
            onChange={(e) => {
              setWeek_day(e.target.value);
            }}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terca-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sabado" },
            ]}
          />
          <Input
            label="Horario"
            name="time"
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;
