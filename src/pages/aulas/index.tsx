import { ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import api from "@/api";
import ReactPlayer from "react-player";
import { ConteudoDTO } from "@/DTO/ConteudoDTO";
import { useParams } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Calendario } from "@/components/calendario";

export function Aulas() {
  const { user } = useContext(AuthContext);
  const { idConteudo } = useParams();
  const [conteudo, setConteudo] = useState<ConteudoDTO | null>(null);

  const [firstAula, setFirstAula] = useState("");
  const [videos, setVideos] = useState([]);
  const [name, setName] = useState();
  const [nameConteudo, setNameConteudo] = useState("");
  const [idBimestre, setIdBimestre] = useState();
  const [idProfessor, setIdProfessor] = useState();
  const [nomeProfessor, setNomeProfessor] = useState();
  const [firstVideoTitle, setFirstVideoTitle] = useState("");

  const getConteudos = async () => {
    try {
      const res = await api.get(`/conteudos/${idConteudo}/${user?.id}`);
      setConteudo(res.data["conteudo"]);
      setFirstAula(res.data.conteudo["first_aula"]);
      setVideos(res.data.conteudo.array_conteudos);
      setName(res.data.conteudo["disciplina"].name);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  console.log(conteudo);

  useEffect(() => {
    getConteudos();
  }, []);

  return (
    <div className="w-full h-full flex px-4 sm:px-8 md:px-16 lg:px-20 xl:px-52 mt-4 gap-6">
      {/* Side content */}
      <div className="w-[25%] flex flex-col">
        <h1 className="text-blue-600 text-xl font-medium">Aulas</h1>
        <div className="flex flex-col bg-white p-3 rounded-xl gap-2">
          <div className="w-full flex justify-between items-center cursor-pointer">
            <h1 className="text-azul_claro-foreground font-medium text-lg">
              {conteudo?.name}
            </h1>
            <ChevronRight className="w-6 h-6 text-azul_claro mr-2" />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="border-2 border-solid border-blue-600 object-cover p-0 m-0">
          <ReactPlayer
            controls={true}
            playing
            loop
            url="https://cdn.jmvstream.com/vod/vod_11696/f/i1ufkp132v5a501/h/4/playlist.m3u8"
          />
        </div>
      </div>

      <div className="w-[30%]">
        <Calendario />
      </div>
    </div>
  );
}
