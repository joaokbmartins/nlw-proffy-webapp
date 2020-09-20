import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";
import api from "../../services/api";

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState(0);

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  function addScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  }

  function setScheduleItemValue(index: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map(
      (scheduleItem, scheduleIndex) => {
        if (index === scheduleIndex) {
          return { ...scheduleItem, [field]: value };
        }
        return scheduleItem;
      }
    );
    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api
      .post("classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        history.push("/");
      })
      .catch(() => {
        alert("Falha no cadastramento.");
      });

    e.preventDefault();
    console.log({
      name,
      avatar,
      bio,
      whatsapp,
      subject,
      cost,
      scheduleItems,
    });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrivel que voce quer dar aulas!"
        description="O primeiro passo eh preencher esse formulario."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              label="Nome Completo"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              label="Avatar"
              name="avatar"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
            <Input
              label="Whatsapp"
              name="whatsapp"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />
            <Textarea
              label="Biografia"
              name="bio"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
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
            <Input
              label="Custo Aula/Hora"
              name="cost"
              value={cost}
              onChange={(e) => {
                setCost(Number(e.target.value));
              }}
            />
          </fieldset>
          <fieldset>
            <legend>
              Horarios Disponiveis
              <button type="button" onClick={addScheduleItem}>
                + Novo horario
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={index} className="schedule-item">
                  <Select
                    label="Dia da Semana"
                    name="week_day"
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, "week_day", e.target.value)
                    }
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
                    label="Das"
                    name="from"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, "from", e.target.value)
                    }
                  />
                  <Input
                    label="Ate"
                    name="to"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, "to", e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante <br />
              Preencha todos os campos
            </p>
            <button type="submit">Salvar Castro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
