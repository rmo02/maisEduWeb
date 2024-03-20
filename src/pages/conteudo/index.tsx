import { AssuntoDTO } from "@/DTO/AssuntoDTO";
import { AulaDTO } from "@/DTO/AulaDTO";
import { DisciplinaDTO } from "@/DTO/DisciplinaDTO";
import { api } from "@/api/app";
import { Calendario } from "@/components/calendario";
import { AuthContext } from "@/context/AuthContext";
import { ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import iconAtividade from "../../assets/icons/Ícone Atividade.png";
import iconAula from "../../assets/icons/Ícone Aula.png";

export function Conteudo() {
  const { user } = useContext(AuthContext);
  const { idDisc, idAssunto } = useParams();

  const [disciplina, setDisciplina] = useState<DisciplinaDTO | null>(null);
  const [assunto, setAssunto] = useState<AssuntoDTO | null>(null);
  const [conteudo, setConteudo] = useState<AulaDTO[]>([]);

  const getAssunto = async () => {
    try {
      const res = await api.get(`/conteudos/${idAssunto}/${user?.id}`);
      setAssunto(res.data.conteudo);
      setConteudo(res.data.conteudo.array_conteudos);
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

  console.log(assunto);

  return (
    <div className="w-full h-full flex px-4 sm:px-8 md:px-16 lg:px-20 xl:px-52 mt-4 gap-6">
      <div className="flex flex-col w-full">
        <div className="flex flex-row">
          <h1 className="text-blue-600 text-xl font-medium mb-2">
            {disciplina?.name}
          </h1>
          <h1 className="text-blue-600 text-xl font-medium mb-2">
            <ChevronRight />
          </h1>
          <h1 className="text-blue-600 text-xl font-medium mb-2">
            {assunto?.name}
          </h1>
        </div>

        <div className="flex flex-col bg-white p-6 rounded-xl gap-2">
          {conteudo.map((item, index) => {
            console.log(item);
            return (
              <a
                href={`/disciplinas/${idDisc}/aula/${assunto?.id}`}
                key={index}
              >
                <div className="w-full flex items-center rounded-lg h-10 cursor-pointer mb-4 p-4">
                  {item?.aula?.title && (
                    <div className="w-full flex flex-row">
                      <img src={iconAula} className="w-24 h-12" />
                      <div className="w-full flex flex-row justify-between items-center">
                        <h1 className="ml-4 text-azul_claro-foreground font-medium text-lg">
                          {item?.aula?.title}
                        </h1>
                        <ChevronRight className="w-6 h-6 text-azul_claro mr-2" />
                      </div>
                    </div>
                  )}
                  {item?.atividade?.title && (
                    <div className="w-full flex flex-row">
                      <img src={iconAtividade} className="w-24 h-12" />
                      <div className="w-full flex flex-row justify-between items-center">
                        <h1 className="ml-4 text-azul_claro-foreground font-medium text-lg">
                          {item?.atividade?.title}
                        </h1>
                        <ChevronRight className="w-6 h-6 text-azul_claro mr-2" />
                      </div>
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <div className="w-[30%]">
        <Calendario />
      </div>
    </div>
  );
}
