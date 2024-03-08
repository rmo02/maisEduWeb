import { Progress } from "@/components/ui/progress";
import Artes from "../../assets/artes.png";
import Fisica from "../../assets/fisica.png";
import Geografia from "../../assets/geografia.png";
import Ingles from "../../assets/ingles.png";
import Matematica from "../../assets/matematica.png";
import Portugues from "../../assets/portugues.png";

import { Label } from "@/components/ui/label";

export function Home() {
  return (
    <div className="w-full h-full flex px-4 sm:px-8 md:px-16 lg:px-20 xl:px-52 mt-4 gap-6">
      <div className="flex flex-col w-full">
        <h1 className="text-zinc-700 text-2xl">Olá <span className="text-blue-500">Vinicius</span> o que vamos estudar hoje?</h1>

        <div className="w-full h-full flex gap-6 justify-between py-2">
          <div className="w-[60%] flex flex-col pr-4">
            <div className="flex justify-between items-center">
              <h1 className="text-blue-600 text-xl font-light">Turmas</h1>
              <span className="text-zinc-600 text-sm underline cursor-pointer">Todas as turmas</span>
            </div>
            
            <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-5">
              <div className="col-span-1">
                <img src={Artes} className="w-full h-full rounded-md"/>
              </div>
              <div className="col-span-1">
                <img src={Matematica} className="w-full h-full rounded-md"/>
              </div>
              <div className="col-span-1">
                <img src={Portugues} className="w-full h-full rounded-md"/>
              </div>
              <div className="col-span-1">
                <img src={Ingles} className="w-full h-full rounded-md"/>
              </div>
              <div className="col-span-1">
                <img src={Geografia} className="w-full h-full rounded-md"/>
              </div>
              <div className="col-span-1">
                <img src={Fisica} className="w-full h-full rounded-md"/>
              </div>

            </div>

          </div>

          <div className="w-[40%] flex flex-col bg-white border rounded-xl py-4 px-3 shadow-md shadow-[#4264eb86]">
            <div className="w-full flex justify-between mt-0 items-center">
              <h1 className="text-lg text-[#00B7B7]">Meu progresso</h1>
              <span className="text-zinc-600 text-sm underline cursor-pointer">Todas as turmas</span>
            </div>
            <div className="w-full h-full flex flex-col mt-6 gap-6">
              <div className="flex justify-between items-center gap-5">
                <Label className="text-md w-28 font-extralight">Artes</Label>
                <Progress value={30} />
              </div>
              <div className="flex justify-between items-center gap-5">
                <Label className="text-md w-28 font-extralight" >Biologia</Label>
                <Progress value={50} />
              </div>
              <div className="flex justify-between items-center gap-5">
                <Label className="text-md w-28 font-extralight">Física</Label>
                <Progress value={90} />
              </div>
              <div className="flex justify-between items-center gap-5">
                <Label className="text-md w-28 font-extralight">Geografia</Label>
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
            <h1 className="text-blue-600 font-light">Últimas aulas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-5">
              <div className="col-span-1">
                <img src={Fisica} />
              </div>
              <div className="col-span-1">
                <img src={Fisica} />
              </div>
              <div className="col-span-1">
                <img src={Fisica} />
              </div>
              <div className="col-span-1">
                <img src={Fisica} />
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white w-full sm:w-1/2 md:w-3/5 lg:w-3/5 rounded-xl p-4 shadow-md shadow-[#4264eb86]">
            <div className="flex justify-between items-center">
              <h1 className="text-[#00B7B7] font-light text-lg">Chat</h1>
              <span className="text-zinc-600 text-sm underline cursor-pointer">Chat completo</span>
            </div>
            <div className="flex gap-4 mt-4 border-b border-slate-200">
              <img src={Fisica} className="w-12 h-12 rounded-full"/>
              <div className="flex flex-col">
                <h1 className="text-blue-600 text-lg font-light">Nário</h1>
                <p className="text-sm font-light text-zinc-800 mb-2">Professor, como se escreve o seu nome, é Nário ou Mário?</p>
              </div>
            </div>
            <div className="flex gap-4 mt-4 border-b border-slate-200">
              <img src={Fisica} className="w-12 h-12 rounded-full"/>
              <div className="flex flex-col">
                <h1 className="text-blue-600 text-lg font-light">Nário</h1>
                <p className="text-sm font-light text-zinc-800 mb-2">Professor, como se escreve o seu nome, é Nário ou Mário?</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className="w-[25%] flex flex-col bg-white p-4 rounded-xl">
        <h1>Calendario</h1>
      </div>

    </div>
  )
}