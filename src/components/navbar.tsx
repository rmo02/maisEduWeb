import Logo  from "../assets/logo/Logo.png";
import Perfil from "../assets/perfil.jpg"

import { UserRound, Bolt, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"

export function Navbar() {
  return(
    <div className="w-full h-14 py-3 px-52 bg-blue-600 flex justify-between items-center mb-2">
      <div>
        <a href="/home"><img className="w-15 h-6" src={Logo} alt="" /></a>
      </div>
      <div>
        <ul className="flex text-slate-100 ">
          <li className="w-full h-full px-1"><a href="/dashboard">Dashboard</a></li>
          <li className="w-full h-full px-1"><a href="/disciplinas">Turmas</a></li>
          <li className="w-full h-full px-1"><a href="/progresso">Progresso</a></li>
          <li className="w-full h-full px-1"><a href="/chat">Chat</a></li>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-zinc-100">Vinicius</p>
        <Popover>
          <PopoverTrigger><img src={Perfil} alt="" className="w-8 h-8 rounded-full object-cover"/> </PopoverTrigger>
          <PopoverContent className="w-52 pt-2 pb-0">
            <div className="flex flex-col">
              <div className="flex justify-start items-center gap-2 mb-2">
                <UserRound className="w-5 h-5 text-slate-600" />
                <a href="/perfil"><p className="text-sm text-slate-600 font-semibold">Perfil</p></a>
              </div>
              <div className="flex justify-start items-center gap-2 mb-2">
                <Bolt className="w-5 h-5 text-slate-600" />
                <a href="/config"><p className="text-sm text-slate-600 font-semibold">Configurações</p></a>
              </div>
              <div className="flex justify-start items-center gap-2 mb-2">
                <LogOut className="w-5 h-5 text-slate-600" />
                <a href="/sair"><p className="text-sm text-slate-600 font-semibold">Sair</p></a>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}