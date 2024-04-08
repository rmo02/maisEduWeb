import { ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import api from "@/api";
import { ConteudoDTO } from "@/DTO/ConteudoDTO";
import { useParams } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { AtividadeDTO, AulaDTO, VideoAulaDTO } from "@/DTO/AulaDTO";
import { AssuntoDTO } from "@/DTO/AssuntoDTO";
import { Tabs } from "@/components/tab";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import iconAula from "../../assets/icons/mini/Ícone Aula Mini.png";
import iconAtividade from "../../assets/icons/mini/Ícone Atividade Mini.png";
import { DisciplinaDTO } from "@/DTO/DisciplinasDTO";
import { Atividade } from "@/components/atividade";
import { FavoritoDTO } from "@/DTO/FavoritoDTO";
import { VideoPlayer } from "@/components/videoPlayer";

export function Aulas() {
  const { user } = useContext(AuthContext);
  const { idDisc, idAssunto, numIndex } = useParams();

  const [assunto, setAssunto] = useState<AssuntoDTO[]>([]);
  const [conteudo, setConteudo] = useState<ConteudoDTO | null>();
  const [aula, setAula] = useState<AulaDTO[]>([]);

  const [videoAula, setVideoAula] = useState<VideoAulaDTO | null>(null);
  const [atividade, setAtividade] = useState<AtividadeDTO | null>(null);
  const [titleConteudo, setTitleConteudo] = useState("");
  const [newTitleConteudo, setNewTitleConteudo] = useState("");
  const [disciplina, setDisciplina] = useState<DisciplinaDTO>();
  const [indexDesejado, setIndexDesejado] = useState<string | undefined>();

  const getAssunto = async () => {
    try {
      const res = await api.get(`/conteudosAluno/${user?.id}/${idDisc}`);
      setAssunto(res.data.conteudo["conteudo"]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getConteudos = async () => {
    try {
      const res = await api.get(`/conteudos/${idAssunto}/${user?.id}`);
      setConteudo(res.data["conteudo"]);
      setAula(res.data.conteudo["array_conteudos"]);
      setNewTitleConteudo(res.data["conteudo"].name);
      if (numIndex !== undefined) {
        setVideoAula(
          res.data.conteudo["array_conteudos"][Number(numIndex)].aula
        );
        setAtividade(
          res.data.conteudo["array_conteudos"][Number(numIndex)].atividade
        );
      }
      setDisciplina(res.data.conteudo["disciplina"]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getAssunto();
    getConteudos();
  }, []);

  useEffect(() => {
    const indexAssuntoInicial = assunto.findIndex(
      (item) => item.id === idAssunto
    );
    setIndexDesejado(
      indexAssuntoInicial !== -1 ? `item-${indexAssuntoInicial}` : undefined
    );
  }, [assunto]);

  const handleNewIdAssunto = async (id: string) => {
    try {
      const res = await api.get(`/conteudos/${id}/${user?.id}`);
      setConteudo(res.data["conteudo"]);
      setTitleConteudo(res.data["conteudo"].name);
      setAula(res.data.conteudo["array_conteudos"]);
      setDisciplina(res.data.conteudo["disciplina"]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleNewIdVideoAula = async (index: number) => {
    if (aula[index].aula) {
      setVideoAula(aula[index].aula);
      setNewTitleConteudo(titleConteudo);
      setAtividade(null);
    } else if (aula[index].atividade) {
      setAtividade(aula[index].atividade);
      setVideoAula(null);
    }
  };

  return (
    <div className="w-full h-full flex px-4 sm:px-8 md:px-16 lg:px-20 xl:px-20 mt-4 gap-6">
      <div className="w-[30%] flex flex-col">
        <h1 className="text-blue-600 text-lg font-bold">Aulas</h1>
        <div className="w-full max-h-[75vh] flex flex-col bg-white p-3 rounded-xl gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb">
          {indexDesejado && (
            <Accordion type="single" collapsible defaultValue={indexDesejado}>
              {assunto.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  onClick={() => handleNewIdAssunto(item.id)}
                >
                  <AccordionTrigger>
                    <div className="w-full flex justify-center items-center cursor-pointer font-semibold">
                      {item.name}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col bg-white gap-2">
                      {aula.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => handleNewIdVideoAula(index)}
                          className="w-full flex items-center rounded-lg h-full cursor-pointer pt-1"
                        >
                          {item?.aula?.title && (
                            <div className="w-full flex flex-row justify-between items-center hover:bg-azul_azul_select rounded-lg px-2">
                              <img src={iconAula} className="w-5 h-5" />
                              <div className="pl-2 pr-2">
                                <p
                                  className={`font-semibold text-center text-sm ${
                                    item?.aula?.id === videoAula?.id
                                      ? "text-azul_claro-foreground"
                                      : "text-cinza_escuro-foreground"
                                  }`}
                                >
                                  {item?.aula?.title}
                                </p>
                              </div>
                              <div>
                                <ChevronRight className="w-5 h-5 text-azul_claro" />
                              </div>
                            </div>
                          )}
                          {item?.atividade?.title && (
                            <div className="w-full flex flex-row justify-between items-center hover:bg-azul_azul_select rounded-lg px-2">
                              <img src={iconAtividade} className="w-5 h-5" />
                              <div className="pl-2 pr-2">
                                <p
                                  className={`font-semibold text-center text-sm ${
                                    item?.atividade?.id === atividade?.id
                                      ? "text-azul_claro-foreground"
                                      : "text-cinza_escuro-foreground"
                                  }`}
                                >
                                  {item?.atividade?.title}
                                </p>
                              </div>
                              <div>
                                <ChevronRight className="w-5 h-5 text-azul_claro" />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col items-start">
        <div className="flex items-center mb-4">
          <div className="flex flex-row">
            <h1 className="text-blue-600 text-xl font-medium mb-2 hover:underline">
              <a href={`/disciplinas/${disciplina?.id}/assunto`}>
                {disciplina?.name}
              </a>
            </h1>
            <h1 className="text-blue-600 text-xl font-medium mb-2">
              <ChevronRight />
            </h1>
            <h1 className="text-blue-600 text-xl font-medium mb-2 hover:underline">
              <a
                href={`/disciplinas/${disciplina?.id}/assunto/${conteudo?.id}/conteudo`}
              >
                {newTitleConteudo}
              </a>
            </h1>
            <h1 className="text-blue-600 text-xl font-medium mb-2">
              <ChevronRight />
            </h1>
            <h1 className="text-blue-600 text-xl font-medium mb-2">
              {videoAula?.title}
              {atividade?.title}
            </h1>
          </div>
        </div>
        <div className="w-full h-full flex items-start justify-center">
          {videoAula && <VideoPlayer VideoAula={videoAula} />}
          {atividade && <Atividade id={atividade?.id} />}
        </div>
      </div>
      <div className="w-[30%]">
        <Tabs />
      </div>
    </div>
  );
}
