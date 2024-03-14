import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import AddIcon from "@mui/icons-material/Add";
import { api } from "../../../api/app";
import { Button } from "../../ui/button";
import { Dialog } from "../../ui/dialog";

interface Disciplina {
  bk_color: string;
  bk_img: string;
  code: string;
  created_at: string;
  icon: string;
  id: string;
  id_escola: string;
  name: string;
  status: string;
  updated_at: string;
}

interface Serie {
  id: string;
  id_escola: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Turma {
  id: string;
  id_serie: string;
  name: string;
  code: string;
  shift: string;
  year: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export function CriarLembrete() {
  const [disciplinas, setDisciplinas] = useState<Record<string, Disciplina>>(
    {}
  );

  const [series, setSeries] = useState<Record<string, Serie>>({});
  const [turmas, setTurmas] = useState<Record<string, Turma>>({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [titleEvent, setTitleEvent] = useState("");
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [dataEvent, setDataEvent] = useState("");
  const [inicioDateTime, setInicioDateTime] = useState("");
  const [fimDateTime, setFimDateTime] = useState("");
  const [idDisc, setIdDisc] = useState("");
  const [idSerie, setIdSerie] = useState("");
  const [idTurma, setIdTurma] = useState("");
  // let checked = false;
  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/disciplinas`);

      setDisciplinas(response.data.disciplinas);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/series`);

      setSeries(response.data.series);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/turmas`);

      setTurmas(response.data.turmas);
    };
    getData();
  }, []);

  async function enviarLembrete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const res = await api.post("/lembretes", {
        title: titleEvent,
        description: descriptionEvent,
        data: `${dataEvent} 00:00`,
        start: `${dataEvent} ${inicioDateTime}`,
        end: `${dataEvent} ${fimDateTime}`,
        // id_aluno: "",
        id_professor: "a618b405-0eaa-4992-a3ae-21dafb816646",
        // id_disciplina: idDisc,
        id_disciplina: "370cfa26-fd05-4c90-92c1-e06cfeda3669",
        // id_serie: idSerie,
        id_serie: "da06838a-f8af-4bbd-b9c4-5ad4de6d5be2",
        // id_turma: idTurma,
        id_turma: "6e879d7f-6c60-4dc1-aade-d6d9197ec9bd",
      });
      if (res.status === 201) {
        console.log(res.status);
      }
      document.location.reload();
      alert("Lembrete criado!");
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
      console.log("erro");
    }
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function clearLembrete() {
    setTitleEvent("");
    setDescriptionEvent("");
    setDataEvent("");
    setInicioDateTime("");
    setFimDateTime("");
    // setIdDisc("");
    // setIdSerie("");
    // setIdTurma("");
    closeModal();
  }

  return (
    <div>
      <Button
        onClick={openModal}
        className="flex items-center justify-center mt-3 rounded-lg bg-azul_verde hover:opacity-70 w-full h-12 text-white"
        variant={null}
      >
        Novo Lembrete
      </Button>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        overlayClassName="flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 bg-black_rgba"
        className="flex flex-col bg-background w-1/3 h-3/5 rounded-lg p-1 px-8 text-blue-600 scrollbar-thin scrollbar-thumb-[#EDF2FF]-700 scrollbar-track-[#000000]-300 overflow-y-scroll"
      >
        <form onSubmit={enviarLembrete} className="flex flex-col space-y-6">
          <div className="flex items-center justify-center">
            <p className="text-[25px] font-semibold">Novo lembrete</p>
          </div>
          <div className="bg-popover rounded-lg text-blue-600 py-4">
            <input
              required
              placeholder="Título"
              onChange={(e) => {
                setTitleEvent(e.target.value);
              }}
              className="w-full placeholder-blue-600 outline-none text-[25px]"
            />
          </div>
          <div className="w-full flex flex-col w-full">
            <div className="w-full flex flex-row justify-between">
              <div className="w-1/2 text-blue-600 py-4">
                <textarea
                  required
                  placeholder="Descrição"
                  onChange={(e) => {
                    setDescriptionEvent(e.target.value);
                  }}
                  className="w-fit h-fit placeholder-blue-600 outline-none text-[20px] scrollbar-thin resize-none"
                />
              </div>

              <div className="w-1/2 flex flex-col text-blue-600 py-4 pl-8">
                <p className="text-[20px]">Data</p>
                <input
                  required
                  type="date"
                  onChange={(e) => {
                    setDataEvent(e.target.value);
                  }}
                  className="w-fit placeholder-blue-600 outline-none text-[18px]"
                />
              </div>
            </div>
            <div className="w-full flex flex-row justify-between">
              <div className="w-1/2 flex flex-col text-blue-600 py-4">
                <p className="text-[20px]">Início</p>
                <input
                  required
                  type="time"
                  onChange={(e) => {
                    setInicioDateTime(e.target.value);
                  }}
                  className="w-fit placeholder-blue-600 outline-none text-[18px]"
                />
              </div>

              <div className="w-1/2 flex flex-col text-blue-600 py-4 pl-8">
                <p className="text-[20px]">Fim</p>
                <input
                  required
                  type="time"
                  onChange={(e) => {
                    setFimDateTime(e.target.value);
                  }}
                  className="w-fit placeholder-blue-600 outline-none text-[18px]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end w-full">
            <button
              onClick={clearLembrete}
              className="bg-popover rounded-lg text-black w-1/5 h-[40px]"
            >
              Cancelar
            </button>

            {titleEvent.length === 0 ||
            descriptionEvent.length === 0 ||
            dataEvent.length === 0 ||
            inicioDateTime.length === 0 ||
            fimDateTime.length === 0 ? (
              // ||
              // idDisc.length === 0 ||
              // idSerie.length === 0 ||
              // idTurma.length === 0
              <button
                type="submit"
                disabled={true}
                className="bg-blue-600 rounded-lg text-white w-1/5 h-[40px] ml-4 cursor-not-allowed"
              >
                Salvar
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-600 rounded-lg text-white w-1/5 h-[40px] ml-4"
              >
                Salvar
              </button>
            )}
          </div>
        </form>
      </Modal>
      {/* <Dialog></Dialog> */}
    </div>
  );
}
