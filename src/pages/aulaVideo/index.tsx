// import React, { useState, useEffect } from "react";



// import api from "../../api/app";

export function AulaVideo() {
  // const [dados, setDados] = useState("Loading");

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await api.get(`/dados`);
  //       setDados(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getData();
  //   console.log("teste");
  // }, []);

  // useEffect(() => {
  //   getFav();
  // }, []);

  return (
    <div className="px-8 mt-4 flex flex-wrap justify-between">
      <div className=" flex flex-col justify-center text-white">
        <div>AULAS</div>
        <div className="w-4 h-16 bg-[#000000]">
          <p className="text-red-800">Geometria</p>
        </div>
      </div>
      <div className="w-1/2">
        <video className="h-1/2 w-1/2 rounded-lg" controls autoPlay>
          <source
            src="https://docs.material-tailwind.com/demo.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="w-1/4">calendario</div>
    </div>
  );
}
