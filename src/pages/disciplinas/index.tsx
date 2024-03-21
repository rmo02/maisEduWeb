import api from "@/api";
import { Calendario } from "@/components/calendario";
import { AuthContext } from "@/context/AuthContext";
import { DisciplinasDTO } from "@/DTO/DisciplinasDTO";
import { useContext, useEffect, useState } from "react";

export function Disciplinas() {
  const { user } = useContext(AuthContext);
  const [disciplinas, setDisciplinas] = useState<DisciplinasDTO[]>([]);

  const getDisciplinas = async () => {
    try {
      const res = await api.get(`/disciplinasAluno/${user?.id}`);
      setDisciplinas(res.data["disciplinas"]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getDisciplinas();
  }, []);

  return (
    <div className="w-full h-full flex px-4 sm:px-8 md:px-16 lg:px-20 xl:px-52 mt-4 gap-6">
      <div className="flex flex-col w-full">
        <h1 className="text-blue-600 text-xl font-medium mb-2">Disciplinas</h1>
        <div className="flex flex-col bg-white p-6 rounded-xl justify-center items-center">
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
            {disciplinas.map((item, index) => {
              return (
                <div className="col-span-1 cursor-pointer" key={index}>
                  <a href={`/disciplinas/${item.disciplina.id}/assunto`}>
                    <img
                      src={item.disciplina.bk_img}
                      className="w-full h-full rounded-md"
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-[30%]">
        <Calendario />
      </div>
    </div>
  );
}
