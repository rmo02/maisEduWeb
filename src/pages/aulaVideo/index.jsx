import React from "react";

export function AulaVideo() {
  return (
    <div className="px-8 mt-4 flex flex-wrap justify-between">
      <div className="w-1/4 h-1/2 flex flex-col justify-center text-white">
        <div>AULAS</div>
        <div className="w-4 h-4 bg-gray-900">
          <p>Geometria</p>
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
