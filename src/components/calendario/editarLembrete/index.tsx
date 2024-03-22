import React, { useState, useEffect, useContext } from "react";
import { api } from "@/api/app";
import { AuthContext } from "../../../context/AuthContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function EditarLembrete({ lembrete }: { lembrete: any }) {
  const { user } = useContext(AuthContext);
  const [titleEvent, setTitleEvent] = useState("");
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [inicioDateTime, setInicioDateTime] = useState("");
  const [fimDateTime, setFimDateTime] = useState("");
  const [dataMasked, setDataMasked] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/lembretes/${lembrete.id}`);
      setTitleEvent(response.data.lembrete.title);
      setDescriptionEvent(response.data.lembrete.description);
      setInicioDateTime(response.data.lembrete.start.slice(0, 5));
      setFimDateTime(response.data.lembrete.end.slice(0, 5));
      setDataMasked(response.data.lembrete.data_masked);
    };
    getData();
  }, [lembrete.id]);

  async function enviarLembrete(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const res = await api.put(`/lembretes/${lembrete.id}`, {
        title: titleEvent,
        description: descriptionEvent,
        data: `${dataMasked} 00:00`,
        start: `${dataMasked} ${inicioDateTime}`,
        end: `${dataMasked} ${fimDateTime}`,
      });
      console.log(res);
      if (res.status === 201) {
        console.log(res.status);
      }
      document.location.reload();
      alert("Lembrete editado!");
    } catch (error) {
      alert("Ocorreu um erro. Tente novamente.");
      console.log("Erro ao editar lembrete. ", error);
    }
  }

  async function excluirLembrete(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    try {
      const res = await api.delete(`/lembretes/${lembrete.id}`);
      if (res.status !== 204) {
        console.log(res.status);
      }
      console.log("deu certo", res.data);
      document.location.reload();
    } catch (error) {
      alert("Ocorreu um erro. Tente novamente.");
      console.log("Erro ao excluir lembrete. ", error);
    }
  }

  function truncateText(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    } else {
      return text;
    }
  }

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" variant={null} size={null}>
            <div className="w-full flex flex-col items-start mb-3 rounded-lg bg-[#FFFFFF] px-4">
              <p className="text-[#748FFC] text-[18px] font-bold mb-2">
                {truncateText(lembrete.title, 25)}
              </p>
              <p className="text-foreground text-[18px] text-left font-bold mb-2 whitespace-pre-line">
                {truncateText(lembrete.description, 25)}
              </p>
              <div className="flex flex-row items-center justify-between">
                <p className="text-[#748FFC] text-[14px] font-medium ">
                  {lembrete.start.slice(0, 5)} - {lembrete.end.slice(0, 5)}
                </p>
              </div>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-blue-600 text-2xl text-center">
              {lembrete.id_professor !== null ? "Lembrete" : "Editar Lembrete"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={enviarLembrete} className="flex flex-col space-y-4">
            <div className="w-full flex flex-col text-blue-600">
              <p className="text-[20px] font-medium">Título</p>
              <input
                required
                placeholder="Insira um título"
                value={titleEvent}
                onChange={(e) => {
                  setTitleEvent(e.target.value);
                }}
                className="w-full placeholder-blue-600 placeholder:text-sm text-lg outline-none px-2"
                disabled={lembrete.id_aluno !== user?.id} // Desabilita se o aluno não for o criado do lembrete
              />
            </div>

            <div className="w-full flex flex-col text-blue-600">
              <p className="text-[20px] font-medium">Descrição</p>
              <textarea
                required
                placeholder="Descreva aqui"
                value={descriptionEvent}
                onChange={(e) => {
                  setDescriptionEvent(e.target.value);
                }}
                className="w-full placeholder-blue-600 placeholder:text-sm text-lg outline-none px-2 scrollbar-thin resize-none"
                disabled={lembrete.id_aluno !== user?.id} // Desabilita se o aluno não for o criado do lembrete
              />
            </div>

            <div className="w-full flex flex-row justify-between">
              <div className="w-1/3 flex flex-col text-blue-600 pr-2">
                <p className="text-[20px] font-medium">Data</p>
                <input
                  required
                  type="date"
                  defaultValue={dataMasked}
                  onChange={(e) => {
                    setDataMasked(e.target.value);
                  }}
                  className="w-full placeholder-blue-600 outline-none text-[18px] rounded-lg"
                  disabled={lembrete.id_aluno !== user?.id} // Desabilita se o aluno não for o criado do lembrete
                />
              </div>

              <div className="w-1/3 flex flex-col justify-center text-blue-600 pl-2">
                <p className="text-[20px] font-medium">Início</p>
                <input
                  required
                  type="time"
                  value={inicioDateTime}
                  onChange={(e) => {
                    setInicioDateTime(e.target.value);
                  }}
                  className="w-full placeholder-blue-600 outline-none text-[18px]"
                  disabled={lembrete.id_aluno !== user?.id} // Desabilita se o aluno não for o criado do lembrete
                />
              </div>

              <div className="w-1/3 flex flex-col justify-center text-blue-600 pl-4">
                <p className="text-[20px] font-medium">Fim</p>
                <input
                  required
                  type="time"
                  value={fimDateTime}
                  onChange={(e) => {
                    setFimDateTime(e.target.value);
                  }}
                  className="w-full placeholder-blue-600 outline-none text-[18px]"
                  disabled={lembrete.id_aluno !== user?.id} // Desabilita se o aluno não for o criado do lembrete
                />
              </div>
            </div>

            {lembrete.id_aluno === user?.id && (
              <DialogFooter>
                <div className="flex flex-row items-center justify-end w-full">
                  <DialogClose asChild>
                    <Button
                      className="bg-popover hover:opacity-70 rounded-lg text-black font-semibold w-1/5 h-[40px]"
                      variant={null}
                    >
                      Cancelar
                    </Button>
                  </DialogClose>

                  <Button
                    onClick={excluirLembrete}
                    className="bg-red-500 hover:opacity-70 rounded-lg text-white font-semibold w-1/5 h-[40px] ml-4"
                    variant={null}
                  >
                    Excluir
                  </Button>

                  {titleEvent.length === 0 ||
                  descriptionEvent.length === 0 ||
                  dataMasked.length === 0 ||
                  inicioDateTime.length === 0 ||
                  fimDateTime.length === 0 ? (
                    <Button
                      type="submit"
                      disabled={true}
                      variant={null}
                      className="bg-blue-600 rounded-lg text-white font-semibold w-1/5 h-[40px] ml-4 cursor-not-allowed"
                    >
                      Salvar
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant={null}
                      className="bg-blue-600 hover:opacity-70 rounded-lg text-white font-semibold w-1/5 h-[40px] ml-4"
                    >
                      Salvar
                    </Button>
                  )}
                </div>
              </DialogFooter>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
