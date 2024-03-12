import api from "@/api";
import { ChevronRight } from "lucide-react"
import { useState } from "react";

export function Aulas() {
  const [disciplinas, setDisciplinas] = useState([]);

  const getMaterias = async () => {
    try {
      const res = await api.get(`/disciplinasAluno/idDoAluno`)
      setDisciplinas(res.data["disciplinas"])
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

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
      {/* Player */}
      <div className="w-full bg-white">
        <h2>Vídeo</h2>
      </div>
      {/* Calendario */}
      <div className="w-[25%] bg-white rounded-xl">
        <h1>Calendario</h1>
      </div>
    </div>
  )
}