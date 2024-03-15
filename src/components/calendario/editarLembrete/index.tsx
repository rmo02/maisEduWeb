import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { api } from "@/api/app";
// import { AuthContext } from "../../../../context/auth";
import EditIcon from "@mui/icons-material/Edit";

type eventProp = {
  eventId: string;
};

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

export function EditarLembrete({ meeting }: { meeting: any }) {
  // export function EditarLembrete({ eventId }: eventProp) {
  //   const { user } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [titleEvent, setTitleEvent] = useState("");
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [inicioDateTime, setInicioDateTime] = useState("");
  const [fimDateTime, setFimDateTime] = useState("");
  const [disciplinas, setDisciplinas] = useState<Record<string, Disciplina>>(
    {}
  );
  const [series, setSeries] = useState<Record<string, Serie>>({});
  const [turmas, setTurmas] = useState<Record<string, Turma>>({});
  const [idDisc, setIdDisc] = useState("");
  const [idSerie, setIdSerie] = useState("");
  const [idTurma, setIdTurma] = useState("");
  const [dataMasked, setDataMasked] = useState("");

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

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/lembretes/${meeting.id}`);
      // const response = await api.get(`/lembretes/${eventId}`);
      setTitleEvent(response.data.lembrete.title);
      setDescriptionEvent(response.data.lembrete.description);
      setInicioDateTime(response.data.lembrete.start.slice(0, 5));
      setFimDateTime(response.data.lembrete.end.slice(0, 5));
      setIdDisc(response.data.lembrete.id_disciplina);
      setIdSerie(response.data.lembrete.turma.id_serie);
      setIdTurma(response.data.lembrete.turma.id);
      setDataMasked(response.data.lembrete.data_masked);
    };
    getData();
  }, [meeting.id]);
  // }, [eventId]);

  async function enviarLembrete() {
    try {
      await api.put(`/lembretes/${meeting.id}`, {
        // await api.put(`/lembretes/${eventId}`, {
        title: titleEvent,
        description: descriptionEvent,
        data: `${dataMasked} 00:00`,
        start: `${dataMasked} ${inicioDateTime}`,
        end: `${dataMasked} ${fimDateTime}`,
        id_professor: "a618b405-0eaa-4992-a3ae-21dafb816646",
        id_disciplina: idDisc,
        id_serie: idSerie,
        id_turma: idTurma,
      });
      alert("Lembrete editado!");
      document.location.reload();
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
    }
  }

  async function excluirLembrete(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    try {
      const res = await api.delete(`/lembretes/${meeting.id}`);
      // const res = await api.delete(`/lembretes/${eventId}`);
      if (res.status !== 204) {
        alert(res.status);
      }
      console.log("deu certo", res.data);
      document.location.reload();
    } catch (error) {
      console.log("erro ao excluir", error);
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
    setDataMasked("");
    setInicioDateTime("");
    setFimDateTime("");
    setIdDisc("");
    setIdSerie("");
    setIdTurma("");
    alert("Lembrete cancelado!");
    closeModal();
  }

  return (
    <div className="w-full">
      <button onClick={openModal} className="w-full">
        <div className="w-full">
          <div className="flex flex-col items-start mb-3 rounded-lg bg-[#FFFFFF] px-4">
            <p className="text-[#748FFC] text-[18px] font-bold mb-2">
              {meeting.title}
            </p>
            <p className="text-foreground text-[18px] font-bold mb-2 whitespace-pre-line">
              {meeting.description}
            </p>
            <div className="flex flex-row items-center justify-between">
              <p className="text-[#748FFC] text-[14px] font-medium ">
                {meeting.start.slice(0, 5)} - {meeting.end.slice(0, 5)}
              </p>
              {/* <p className="text-azul_verde text-[14px] font-roboto ">
                {meeting.turma.name}
              </p> */}
            </div>
          </div>
        </div>
      </button>
      <Modal
        isOpen={modalIsOpen}
        // ariaHideapi={false}
        onRequestClose={closeModal}
        overlayClassName="flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 bg-black_rgba"
        className="flex flex-col bg-white w-1/3 h-3/5 rounded-lg p-1 px-8 text-dark-purple scrollbar-thin scrollbar-thumb-[#EDF2FF]-700 scrollbar-track-[#000000]-300 overflow-y-scroll"
      >
        <form className="flex flex-col space-y-6">
          <div className="flex items-center justify-center">
            <p className="text-[25px] font-semibold">Editar lembrete</p>
          </div>

          <div className="bg-popover rounded-lg text-blue-600 py-4">
            <input
              required
              placeholder="Título"
              value={titleEvent}
              onChange={(e) => {
                setTitleEvent(e.target.value);
              }}
              className="w-full placeholder-blue-600 outline-none text-[25px]"
            />
          </div>

          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row justify-between">
              <div className="w-1/2 text-blue-600 py-4">
                <textarea
                  required
                  placeholder="Descrição"
                  value={descriptionEvent}
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
                  defaultValue={dataMasked}
                  onChange={(e) => {
                    setDataMasked(e.target.value);
                  }}
                  className="w-fit placeholder-blue-600 outline-none text-[18px]"
                />
              </div>
              {/* <div className="flex flex-col text-dark-purple py-4">
                <p className="text-[20px]">Data do evento:</p>
                <input
                  required
                  type="date"
                  defaultValue={dataMasked}
                  onChange={(e) => {
                    setDataMasked(e.target.value);
                  }}
                  className="w-fit placeholder-dark-purple outline-none text-[18px]"
                />
              </div> */}
            </div>

            <div className="w-full flex flex-row justify-between">
              <div className="w-1/2 flex flex-col text-blue-600 py-4">
                <p className="text-[20px]">Início</p>
                <input
                  required
                  type="time"
                  value={inicioDateTime}
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
                  value={fimDateTime}
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
              onClick={() => clearLembrete()}
              className="bg-popover rounded-lg text-black w-1/5 h-[40px]"
            >
              Cancelar
            </button>

            <button
              onClick={excluirLembrete}
              className="bg-red-500 rounded-lg text-black w-1/5 h-[40px] ml-4"
            >
              Excluir
            </button>

            {titleEvent.length === 0 ||
            descriptionEvent.length === 0 ||
            dataMasked.length === 0 ||
            inicioDateTime.length === 0 ||
            fimDateTime.length === 0 ? (
              // ||
              // idDisc.length === 0 ||
              // idSerie.length === 0 ||
              // idTurma.length === 0
              <button
                type="submit"
                disabled={true}
                onClick={() => enviarLembrete()}
                className="bg-blue-600 rounded-lg text-white w-1/5 h-[40px] ml-4 cursor-not-allowed"
              >
                Salvar
              </button>
            ) : (
              <button
                type="submit"
                onClick={() => enviarLembrete()}
                className="bg-blue-600 rounded-lg text-white w-1/5 h-[40px] ml-4"
              >
                Salvar
              </button>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
}
