import Artes from "../../assets/artes.png";
import Fisica from "../../assets/fisica.png";
import Geografia from "../../assets/geografia.png";
import Ingles from "../../assets/ingles.png";
import Matematica from "../../assets/matematica.png";
import Portugues from "../../assets/portugues.png";
import Biologia from "../../assets/biologia.png";
import Filosofia from "../../assets/filosofia.png";

export function Disciplinas() {
  return (
    <div className="w-full h-full flex px-4 sm:px-8 md:px-16 lg:px-20 xl:px-52 mt-4 gap-6">
      <div className="flex flex-col w-full">
        <h1 className="text-blue-600 text-xl font-medium mb-2">Turmas</h1>
        <div className="flex flex-col bg-white p-6 rounded-xl justify-center items-center">
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
            <div className="col-span-1">
              <a href="/artes">
                <img src={Artes} className="w-full h-full rounded-md" />
              </a>
            </div>
            <div className="col-span-1">
              <a href="/disciplinas/matematica">
                <img src={Matematica} className="w-full h-full rounded-md" />
              </a>
            </div>
            <div className="col-span-1">
              <a href="/portugues">
                <img src={Portugues} className="w-full h-full rounded-md" />
              </a>
            </div>
            <div className="col-span-1">
              <img src={Ingles} className="w-full h-full rounded-md" />
            </div>
            <div className="col-span-1">
              <img src={Geografia} className="w-full h-full rounded-md" />
            </div>
            <div className="col-span-1">
              <img src={Fisica} className="w-full h-full rounded-md" />
            </div>
            <div className="col-span-1">
              <img src={Biologia} className="w-full h-full rounded-md" />
            </div>
            <div className="col-span-1">
              <img src={Filosofia} className="w-full h-full rounded-md" />
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