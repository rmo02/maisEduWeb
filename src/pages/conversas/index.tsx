import { Calendario } from "@/components/calendario";

export function Conversas() {
  return (
    <div className="flex flex-row w-full px-5 mt-4 pt-10 justify-between space-x-2">
      <div className="bg-white p-2 rounded-md shadow-2xl w-[20%]">
        <div className="overflow-y-auto space-y-1">
          {/* mensagens */}
          <div className="message flex border-b justify-between">
            <div className="flex items-center space-x-2">
              <img src="https://i.pravatar.cc/" alt="avatar" className="rounded-full w-10 h-10" />
              <div>
                <p className="font-bold text-[#4264EB]">Aula 2 - Vinicius</p>
                <p>Amanha teremos rev...</p>
              </div>
            </div>
            <div className="bg-[#4264EB] p-1 rounded-full h-1 " />
          </div>

          <div className="message flex border-b justify-between">
            <div className="flex items-center space-x-2">
              <img src="https://i.pravatar.cc/" alt="avatar" className="rounded-full w-10 h-10" />
              <div>
                <p className="font-bold text-[#4264EB]">Aula 2 - Ramon</p>
                <p>Hoje tem teste surpre...</p>
              </div>
            </div>
            <div className="bg-[#4264EB] p-1 rounded-full h-1 " />
          </div>

          <div className="message flex space-x-3 border-b">
            <img src="https://i.pravatar.cc/" alt="avatar" className="rounded-full w-10 h-10" />
            <div>
              <p className="font-medium text-[#4264EB]">Aula 1 - Victor</p>
              <p>Bons estudos</p>
            </div>
          </div>

        </div>
      </div>

      {/* Container das mensagens e barra de digitação */}
      <div className="bg-white rounded-md shadow-2xl w-[60%] flex flex-col">
        {/* container das mensagens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {/* mensagens */}
          <div className="message flex space-x-3 border-b">
            <img src="https://i.pravatar.cc/" alt="avatar" className="rounded-full w-10 h-10" />
            <div>
              <p className="font-medium">Eu:</p>
              <p>Onde consigo o material da prova?</p>
            </div>
          </div>

          <div className="message flex space-x-3 border-b">
            <img src="https://i.pravatar.cc/" alt="avatar" className="rounded-full w-10 h-10" />
            <div>
              <p className="font-medium">Professor:</p>
              <p>Ja esta disponivel na matéria</p>
            </div>
          </div>

          <div className="message flex space-x-3 border-b">
            <img src="https://i.pravatar.cc/" alt="avatar" className="rounded-full w-10 h-10" />
            <div>
              <p className="font-medium">Professor:</p>
              <p>Bons estudos</p>
            </div>
          </div>

        </div>

        {/* Barra de digitação */}
        <div className="border-t p-4">
          <form className="flex justify-between">
            <input
              type="text"
              className=" border rounded-xl p-2 w-[83%] focus:outline-none bg-[#E8E8E8] focus:ring focus:border-blue-300"
              placeholder="Digite sua mensagem..."
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 w-[15%] rounded-2xl text-white p-2 font-semibold ">
              Enviar
            </button>
          </form>
        </div>
      </div>

      <div >
        <Calendario />
      </div>
    </div>
  )
}