import { ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import api from "@/api";
import ReactPlayer from "react-player";
import { ConteudoDTO } from "@/DTO/ConteudoDTO";
import { useParams } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
// import { AulaDTO } from "@/DTO/AulaDTO";
import { AssuntoDTO } from "@/DTO/AssuntoDTO";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { Tabs } from "@/components/tab";

export function Aulas() {
  const { user } = useContext(AuthContext);
  const { idDisc, idAssunto } = useParams();

  const [assunto, setAssunto] = useState<AssuntoDTO[]>([]);
  const [conteudo, setConteudo] = useState<ConteudoDTO | null>(null);
  // const [aula, setAula] = useState<AulaDTO[]>([]);

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
    console.log("Botão Favoritar clicado");
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
      // setAula(res.data.conteudo["array_conteudos"]);
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

  return (
    <div className="w-full h-full flex px-4 sm:px-8 md:px-16 lg:px-20 xl:px-20 mt-4 gap-6">
      {/* Side content */}
      <div className="w-[25%] flex flex-col">
        <h1 className="text-blue-600 text-lg font-bold">Aulas</h1>
        <div className="w-full max-h-[80vh] flex flex-col bg-white p-3 rounded-xl gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb">
          {assunto.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full flex flex-row justify-between items-center cursor-pointer mb-6"
              >
                <h1 className="text-azul_claro-foreground font-semibold text-md">
                  {item.name}
                </h1>
                <div className="w-6 h-6   ">
                  <ChevronRight className="text-azul_claro" />
                </div>
              </div>
            );
          })}
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
              Nome da aula
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
              url="https://cdn.jmvstream.com/vod/vod_11696/f/i1ufkp132v5a501/h/4/playlist.m3u8"
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
        <Tabs/>
      </div>
    </div>
  );
}
