import { ConteudoDTO } from "@/DTO/ConteudoDTO";
import { DisciplinaDTO } from "@/DTO/DisciplinaDTO";
import api from "@/api";
import { Calendario } from "@/components/calendario";
import { AuthContext } from "@/context/AuthContext";
import { ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Conteudos() {
  const { user } = useContext(AuthContext);
  const { idDisc } = useParams();
  const [disciplina, setDisciplina] = useState<DisciplinaDTO | null>(null);
  const [conteudo, setConteudo] = useState<ConteudoDTO[]>([]);

  const getConteudos = async () => {
    try {
      const res = await api.get(`/conteudosAluno/${user?.id}/${idDisc}`);
      setConteudo(res.data["conteudo"]["conteudo"]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const getDisciplinas = async () => {
    try {
      const res = await api.get(`/disciplinas/${idDisc}`);
      setDisciplina(res.data["disciplina"]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getConteudos();
    getDisciplinas();
  }, []);

  return (
    <div className="w-full h-full flex px-4 sm:px-8 md:px-16 lg:px-20 xl:px-52 mt-4 gap-6">
      <div className="flex flex-col w-full">
        <h1 className="text-blue-600 text-xl font-medium mb-2">
          {disciplina?.name}
        </h1>
        
        <div className="flex flex-col bg-white p-6 rounded-xl gap-2">
          {conteudo.map((item, index) => (
            <a href={`/disciplinas/${idDisc}/${item.id}`} key={index}>
              <div className="w-full flex justify-between items-center bg-azul_azul_select rounded-lg h-10 cursor-pointer">
                <h1 className="ml-4 text-azul_claro-foreground font-medium text-lg">
                  {item.name}
                </h1>
                <ChevronRight className="w-6 h-6 text-azul_claro mr-2" />
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="w-[30%]">
        <Calendario />
      </div>
    </div>
  );
}
