import { ChevronRight } from "lucide-react"

export function Conteudos() {
  return (
    <div className="w-full h-full flex px-4 sm:px-8 md:px-16 lg:px-20 xl:px-52 mt-4 gap-6">
      <div className="flex flex-col w-full">
        <h1 className="text-blue-600 text-xl font-medium mb-2">Matemática</h1>
        <div className="flex flex-col bg-white p-6 rounded-xl gap-2">
          <a href="/">
            <div className="w-full flex justify-between items-center bg-azul_azul_select rounded-lg h-10 cursor-pointer">
              <h1 className="ml-4 text-azul_claro-foreground font-medium text-lg">
                Geometria
              </h1>
              <ChevronRight className="w-6 h-6 text-azul_claro mr-2" />
            </div>
          </a>
          <a href="/">
            <div className="w-full flex justify-between items-center bg-azul_azul_select rounded-lg h-10 cursor-pointer">
              <h1 className="ml-4 text-azul_claro-foreground font-medium text-lg">
                Quadrados
              </h1>
              <ChevronRight className="w-6 h-6 text-azul_claro mr-2" />
            </div>
          </a>
          <a href="/">
            <div className="w-full flex justify-between items-center bg-azul_azul_select rounded-lg h-10 cursor-pointer">
              <h1 className="ml-4 text-azul_claro-foreground font-medium text-lg">
                Triângulos
              </h1>
              <ChevronRight className="w-6 h-6 text-azul_claro mr-2" />
            </div>
          </a>
        </div>
      </div>
      <div className="w-[25%] flex flex-col bg-white p-4 rounded-xl">
        <h1>Calendario</h1>
      </div>
    </div>
  )
}