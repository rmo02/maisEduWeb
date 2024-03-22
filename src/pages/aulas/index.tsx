import { ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import api from "@/api";
import ReactPlayer from "react-player";
import { ConteudoDTO } from "@/DTO/ConteudoDTO";
import { useParams } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { AtividadeDTO, AulaDTO, VideoAulaDTO } from "@/DTO/AulaDTO";
import { AssuntoDTO } from "@/DTO/AssuntoDTO";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { Tabs } from "@/components/tab";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import iconAula from "../../assets/icons/mini/Ícone Aula Mini.png";
import iconAtividade from "../../assets/icons/mini/Ícone Atividade Mini.png";

export function Aulas() {
  const { user } = useContext(AuthContext);
  const { idDisc, idAssunto, numIndex } = useParams();

  const [assunto, setAssunto] = useState<AssuntoDTO[]>([]);
  const [conteudo, setConteudo] = useState<ConteudoDTO | null>();
  const [aula, setAula] = useState<AulaDTO[]>([]);

  const [videoAula, setVideoAula] = useState<VideoAulaDTO | null>(null);
  const [atividade, setAtividade] = useState<AtividadeDTO | string>();
  // const [firstAula, setFirstAula] = useState("");
  const [nameDisciplina, setNameDisciplina] = useState();
  // const [nameConteudo, setNameConteudo] = useState("");
  // const [idBimestre, setIdBimestre] = useState();
  // const [idProfessor, setIdProfessor] = useState();
  // const [nomeProfessor, setNomeProfessor] = useState();
  // const [firstVideoTitle, setFirstVideoTitle] = useState("");

  const [favoritado, setFavoritado] = useState(false);
  const handleFavoritar = () => {
    setFavoritado(!favoritado);
  };

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
      if (numIndex !== undefined) {
        setVideoAula(
          res.data.conteudo["array_conteudos"][Number(numIndex)].aula
        );
      }
      // setFirstAula(res.data.conteudo["first_aula"]);
      setNameDisciplina(res.data.conteudo["disciplina"].name);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getConteudos();
    getAssunto();
  }, []);

  const handleNewIdAssunto = async (id: string) => {
    try {
      const res = await api.get(`/conteudos/${id}/${user?.id}`);
      setConteudo(res.data["conteudo"]);
      setAula(res.data.conteudo["array_conteudos"]);
      // setFirstAula(res.data.conteudo["first_aula"]);
      setNameDisciplina(res.data.conteudo["disciplina"].name);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleNewIdVideoAula = async (index: number) => {
    if (aula[index].aula) {
      setVideoAula(aula[index].aula);
    } else if (aula[index].atividade) {
      setAtividade(aula[index].atividade.thumb);
    }
  };
  return (
    <div className="w-full h-full flex px-4 sm:px-8 md:px-16 lg:px-20 xl:px-20 mt-4 gap-6">
      {/* Side content */}
      <div className="w-[25%] flex flex-col">
        <h1 className="text-blue-600 text-lg font-bold">Aulas</h1>
        <div className="w-full max-h-[75vh] flex flex-col bg-white p-3 rounded-xl gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb">
          <Accordion type="single" collapsible>
            {assunto.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                onClick={() => handleNewIdAssunto(item.id)}
              >
                <AccordionTrigger>
                  <div className="w-full flex justify-center items-center cursor-pointer">
                    {item.name}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col bg-white p-2 gap-2">
                    {aula.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleNewIdVideoAula(index)}
                        className="w-full flex items-center rounded-lg h-full cursor-pointer"
                      >
                        {item?.aula?.title && (
                          <div className="w-full flex flex-row justify-between items-center hover:bg-azul_azul_select rounded-lg">
                            <img src={iconAula} className="w-6 h-6" />
                            <div className="w-full flex flex-row justify-between items-center">
                              <h1 className="ml-2 text-azul_claro-foreground font-medium text-base">
                                {item?.aula?.title}
                              </h1>
                              {/* <ChevronRight className="w-6 h-6 text-azul_claro mr-2" /> */}
                            </div>
                          </div>
                        )}
                        {item?.atividade?.title && (
                          <div className="w-full flex flex-row justify-between items-center hover:bg-azul_azul_select rounded-lg">
                            <img src={iconAtividade} className="w-6 h-6" />
                            <div className="w-full flex flex-row justify-between items-center">
                              <h1 className="ml-2 text-azul_claro-foreground font-medium text-base">
                                {item?.atividade?.title}
                              </h1>
                              {/* <ChevronRight className="w-6 h-6 text-azul_claro mr-2" /> */}
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
        </div>
      </div>
      <div className="w-full flex flex-col items-start">
        <div className="flex items-center mb-4">
          <div className="flex flex-row">
            <h1 className="text-blue-600 text-xl font-medium mb-2">
              {nameDisciplina}
            </h1>
            <h1 className="text-blue-600 text-xl font-medium mb-2">
              <ChevronRight />
            </h1>
            <h1 className="text-blue-600 text-xl font-medium mb-2">
              {conteudo?.name}
            </h1>
            <h1 className="text-blue-600 text-xl font-medium mb-2">
              <ChevronRight />
            </h1>
            <h1 className="text-blue-600 text-xl font-medium mb-2">
              {videoAula?.title}
            </h1>
          </div>
        </div>
        <div className="w-full h-full flex items-start justify-center relative">
          <div className="border-2 border-solid border-blue-600 object-cover relative">
            <ReactPlayer
              width="700px"
              height="400px"
              controls={true}
              playing
              loop
              // url="https://cdn.jmvstream.com/vod/vod_11696/f/i1ufkp132v5a501/h/4/playlist.m3u8"
              url={videoAula?.file}
            />
            <button
              className="w-1/6 absolute top-4 right-4 flex flex-row items-center justify-evenly bg-white text-cinza_escuro border-2 border-solid border-blue-600 py-1 rounded-3xl"
              onClick={handleFavoritar}
            >
              <div className="text-blue-600 text-xl font-bold">
                {favoritado ? <MdOutlineStar /> : <MdOutlineStarBorder />}
              </div>
              <h1 className="text-sm font-bold">Favoritar</h1>
            </button>
          </div>
        </div>
      </div>

      <div className="w-[30%]">
        <Tabs />
      </div>
    </div>
  );
}
