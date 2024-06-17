import { useContext, useEffect, useState } from "react";
import api from "@/api";
import Fisica from "../../assets/fisica.png";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthContext";
import { DisciplinasDTO } from "@/DTO/DisciplinasDTO";
import { Tabs } from "@/components/tab";
import { UltimasAulasDTO } from "@/DTO/UltimasAulasDTO";

export function Home() {
  const { user } = useContext(AuthContext);
  const [ultimasAulas, setUltimasAulas] = useState<UltimasAulasDTO[]>([]);
  const [favoritos, setFavoritos] = useState([]);
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

  const getVistoPorUltimo = async () => {
    try {
      const res = await api.get(`/ultimasAulas/${user?.id}`);
      setUltimasAulas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAulasFavoritadas = async () => {
    try {
      const res = await api.get(`/favoritos/${user?.id}`);
      setFavoritos(res.data["favoritos"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDisciplinas();
    getVistoPorUltimo();
    getAulasFavoritadas();
  }, []);


  return (
    <div className="w-full h-full flex px-4 sm:px-8 md:px-16 lg:px-20 xl:px-20 mt-4 gap-6">
      <div className="flex flex-col w-full">
        <h1 className="text-zinc-700 text-2xl">
          Olá, <span className="text-blue-500 font-medium">{user?.name}!</span>{" "}
          O que vamos estudar hoje?
        </h1>

        <div className="w-full h-full flex gap-6 justify-between py-2">
          <div className="w-[60%] flex flex-col pr-4">
            <div className="flex justify-between items-center">
              <h1 className="text-blue-600 text-xl font-medium">Turmas</h1>
              <span className="text-zinc-600 text-sm underline cursor-pointer">
                <a href="/disciplinas">Todas as turmas</a>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-5">
              {disciplinas.map((item, index) => {
                return (
                  <div className="col-span-1 cursor-pointer" key={index}>
                    <a href={`/disciplinas/${item.disciplina.id}/assunto`}>
                      <img
                        src={item.disciplina.bk_img}
                        className="w-full h-full rounded-md hover:scale-105 duration-300 ease-in-out"
                      />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-[40%] flex flex-col bg-white border rounded-xl py-4 px-3 shadow-md shadow-[#4264eb86]">
            <div className="w-full flex justify-between mt-0 items-center">
              <h1 className="text-lg text-[#00B7B7]">Meu progresso</h1>
              <span className="text-zinc-600 text-sm underline cursor-pointer">
                <a href="/disciplinas">Todas as turmas</a>
              </span>
            </div>
            <div className="w-full h-full flex flex-col mt-6 gap-6">
              <div className="flex justify-between items-center gap-5">
                <Label className="text-md w-28 font-extralight">Artes</Label>
                <Progress value={30} />
              </div>
              <div className="flex justify-between items-center gap-5">
                <Label className="text-md w-28 font-extralight">Biologia</Label>
                <Progress value={50} />
              </div>
              <div className="flex justify-between items-center gap-5">
                <Label className="text-md w-28 font-extralight">Física</Label>
                <Progress value={90} />
              </div>
              <div className="flex justify-between items-center gap-5">
                <Label className="text-md w-28 font-extralight">
                  Geografia
                </Label>
                <Progress value={37} />
              </div>
              <div className="flex justify-between items-center gap-5">
                <Label className="text-md w-28 font-extralight">Inglês</Label>
                <Progress value={80} />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex justify-between gap-8 mt-4">
          <div className="w-[40%]">
            <h1 className="text-blue-600 font-medium text-xl">Últimas aulas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-5">
              {/* Limitando as últimas aulas em 4 */}
              {ultimasAulas.slice(0, 4).map((item, index) => {
                return (
                  <div key={index} className="col-span-1 cursor-pointer">
                    <a
                      href={`/disciplinas/370cfa26-fd05-4c90-92c1-e06cfeda3669/assunto/${item?.conteudo}/conteudo/aula/0`}
                    >
                      <img
                        src={item?.thumb}
                        className="w-full h-full rounded-md hover:scale-105 duration-300 ease-in-out"
                      />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col bg-white w-full sm:w-1/2 md:w-3/5 lg:w-3/5 rounded-xl p-4 shadow-md shadow-[#4264eb86]">
            <div className="flex justify-between items-center">
              <h1 className="text-[#00B7B7] font-medium text-xl">Chat</h1>
              <a href={"/chat"}>
              <span className="text-zinc-600 text-sm underline cursor-pointer">
                Chat completo
              </span>
              </a>
            </div>
            <div className="flex gap-4 mt-4 border-b border-slate-200">
              <img src={Fisica} className="w-12 h-12 rounded-full" />
              <div className="flex flex-col">
                <h1 className="text-blue-600 text-lg font-light">Nário</h1>
                <p className="text-sm font-light text-zinc-800 mb-2">
                  Professor, como se escreve o seu nome, é Nário ou Mário?
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-4 border-b border-slate-200">
              <img src={Fisica} className="w-12 h-12 rounded-full" />
              <div className="flex flex-col">
                <h1 className="text-blue-600 text-lg font-light">Nário</h1>
                <p className="text-sm font-light text-zinc-800 mb-2">
                  Professor, como se escreve o seu nome, é Nário ou Mário?
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className="w-[30%]">
        <Tabs />
      </div>
    </div>
  );
}
