import React, { useState, useEffect, useContext } from "react";
import api from "@/api";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { AuthContext } from "@/context/AuthContext";

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
  const { user } = useContext(AuthContext);

  const [disciplinas, setDisciplinas] = useState<Record<string, Disciplina>>(
    {}
  );
  const [series, setSeries] = useState<Record<string, Serie>>({});
  const [turmas, setTurmas] = useState<Record<string, Turma>>({});

  const [titleEvent, setTitleEvent] = useState("");
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [dataEvent, setDataEvent] = useState("");
  const [inicioDateTime, setInicioDateTime] = useState("");
  const [fimDateTime, setFimDateTime] = useState("");
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
        id_aluno: user?.id,
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

  function clearLembrete() {
    setTitleEvent("");
    setDescriptionEvent("");
    setDataEvent("");
    setInicioDateTime("");
    setFimDateTime("");
  }

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="w-full flex items-center justify-center mt-3 rounded-lg bg-azul_verde hover:opacity-70 h-12 text-white"
            variant={null}
          >
            Novo Lembrete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-blue-600 text-2xl text-center">
              Novo lembrete
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={enviarLembrete} className="flex flex-col space-y-4">
            <div className="w-full flex flex-col text-blue-600">
              <p className="text-[20px] font-medium">Título</p>
              <input
                required
                placeholder="Insira um título"
                onChange={(e) => {
                  setTitleEvent(e.target.value);
                }}
                className="w-full placeholder-blue-600 placeholder:text-sm text-lg outline-none px-2"
              />
            </div>

            <div className="w-full flex flex-col">
              <div className="w-full flex flex-row justify-between">
                <div className="w-1/2 flex flex-col text-blue-600 py-4">
                  <p className="text-[20px] font-medium">Descrição</p>
                  <textarea
                    required
                    placeholder="Descreva aqui"
                    onChange={(e) => {
                      setDescriptionEvent(e.target.value);
                    }}
                    className="w-fit h-fit placeholder-blue-600 placeholder:text-sm text-lg outline-none scrollbar-thin resize-none px-2"
                  />
                </div>

                <div className="w-1/2 flex flex-col text-blue-600 py-4 pl-8">
                  <p className="text-[20px] font-medium">Data</p>
                  <input
                    required
                    type="date"
                    onChange={(e) => {
                      setDataEvent(e.target.value);
                    }}
                    className="w-fit placeholder-blue-600 outline-none text-[18px] rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full flex flex-row justify-between">
                <div className="w-1/2 flex flex-col text-blue-600 py-4">
                  <p className="text-[20px] font-medium">Início</p>
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
                  <p className="text-[20px] font-medium">Fim</p>
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
            <DialogFooter>
              <div className="flex flex-row items-center justify-end w-full">
                <DialogClose asChild>
                  <Button
                    onClick={clearLembrete}
                    className="bg-popover rounded-lg text-black w-1/5 h-[40px]"
                    variant={null}
                  >
                    Cancelar
                  </Button>
                </DialogClose>

                {titleEvent.length === 0 ||
                descriptionEvent.length === 0 ||
                dataEvent.length === 0 ||
                inicioDateTime.length === 0 ||
                fimDateTime.length === 0 ? (
                  // ||
                  // idDisc.length === 0 ||
                  // idSerie.length === 0 ||
                  // idTurma.length === 0
                  <Button
                    type="submit"
                    disabled={true}
                    variant={null}
                    className="bg-blue-600 rounded-lg text-white w-1/5 h-[40px] ml-4 cursor-not-allowed"
                  >
                    Salvar
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant={null}
                    className="bg-blue-600 hover:opacity-70 rounded-lg text-white w-1/5 h-[40px] ml-4"
                  >
                    Salvar
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
