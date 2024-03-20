import { ChevronRight } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import api from "@/api";
import ReactPlayer from "react-player";
import { ConteudoDTO } from "@/DTO/ConteudoDTO";
import { useParams } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

export function Aulas() {
  const { user } = useContext(AuthContext);
  const { IdConteudo } = useParams();
  const [conteudo, setConteudo] = useState<ConteudoDTO[]>([]);

  const getConteudos = async () => {
    try {
      const res = await api.get(`/conteudosAluno/${user?.id}/${IdConteudo}`);
      setConteudo(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  console.log(conteudo)

  useEffect(() => {
    getConteudos();
  }, []);

  return (
    <div className="w-full h-full flex px-4 sm:px-8 md:px-16 lg:px-20 xl:px-52 mt-4 gap-6">
      {/* Side content */}
      <div className="w-[25%] flex flex-col">
        <h1 className="text-blue-600 text-xl font-medium">Aulas</h1>
        <div className="flex flex-col bg-white rounded-lg">
          <button>
            <div className="flex justify-between items-center">
              <h1>Geometria</h1>
              <ChevronRight className="w-8 h-6" />
            </div>
          </button>
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

      {/* Calendario */}
      <div className="w-[25%] bg-white rounded-xl">
        <h1>Calendario</h1>
      </div>
    </div>
  );
}
