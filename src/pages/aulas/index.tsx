import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../api/app";
import ReactPlayer from "react-player";
import ctl from "@netlify/classnames-template-literals";
import { Controls } from "./controlls";

export function Aulas() {
  const [aula, setAula] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(
        `/conteudo/da06838a-f8af-4bbd-b9c4-5ad4de6d5be2/370cfa26-fd05-4c90-92c1-e06cfeda3669`
      );
      // const response = await api.get(`/conteudo/${idSerie}/${idDisc}`);
      // console.log("/conteudo/idSerie/idDisc: ", response.data)
      setAula(response.data[0].items[0]);
    };
    getData();
  }, []);

  console.log(aula);

  const player = ctl(`
  border: 2px solid #7b2cbf;
  object-fit: cover;
  padding: 0;
  margin: 5;
  `);

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
      <div className="w-full flex items-center justify-center">
        <div className="border-2 border-solid border-blue-600 object-cover p-0 m-0">
          <ReactPlayer
            controls={true}
            playing
            loop
            url="https://cdn.jmvstream.com/vod/vod_11696/f/i1ufkp132v5a501/h/4/playlist.m3u8"
          />
          {/* <Controls/> */}
        </div>
      </div>

      {/* Calendario */}
      <div className="w-[25%] bg-white rounded-xl">
        <h1>Calendario</h1>
      </div>
    </div>
  );
}
