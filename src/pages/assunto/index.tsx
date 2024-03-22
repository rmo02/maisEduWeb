import { AssuntoDTO } from "@/DTO/AssuntoDTO";
import { AuthContext } from "@/context/AuthContext";
import api from "@/api";
import { ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs } from "@/components/tab";
import { DisciplinaDTO } from "@/DTO/DisciplinasDTO";

export function Assunto() {
  const { user } = useContext(AuthContext);
  const { idDisc } = useParams();
  const [disciplina, setDisciplina] = useState<DisciplinaDTO | null>(null);
  const [assunto, setAssunto] = useState<AssuntoDTO[]>([]);

  const getAssunto = async () => {
    try {
      const res = await api.get(`/conteudosAluno/${user?.id}/${idDisc}`);
      setAssunto(res.data.conteudo["conteudo"]);
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
    getAssunto();
    getDisciplinas();
  }, []);

  return (
    <div className="w-full h-full flex px-4 sm:px-8 md:px-16 lg:px-20 xl:px-52 mt-4 gap-6">
      <div className="flex flex-col w-full">
        <h1 className="text-blue-600 text-xl font-medium mb-2">
          {disciplina?.name}
        </h1>

        <div className="flex flex-col bg-white p-6 rounded-xl gap-2">
          {assunto.map((item, index) => (
            <a
              href={`/disciplinas/${idDisc}/assunto/${item.id}/conteudo`}
              key={index}
            >
              {/* <a href={`/disciplinas/${idDisc}/${item.id}`} key={index}> */}
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
        <Tabs />
      </div>
    </div>
  );
}
