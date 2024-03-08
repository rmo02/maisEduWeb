import ctl from "@netlify/classnames-template-literals";
import { useRef, useState } from "react";

// const playVideo = ({}) => {
export function VideoPlayer() {
  const videoOverlayStyle = ctl(`
  relative
  `);

  const progressBarStyle = ctl(`
    bg-white
    h-[4px]
    w-[98%]
    mx-auto
    mb-[18px]
  `);

  const progressBarInnerStyle = ctl(`
    bg-black
    w-[50%]
    h-full
  `);

  const videoStyle = ctl(`
  w-full
  max-w-[967px]
  mx-auto
  my-8
  `);

  const [isLoadind, setIsLoadind] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const playVideo = () => {
    if (isPlaying) {
      // videoRef.current.pause();
    } else {
      // videoRef.current.play();
    }

    setIsPlaying((currentPlayStatus) => !currentPlayStatus);
  };

  return (
    <div className={videoOverlayStyle}>
      <video
        className={videoStyle}
        ref={videoRef}
        onCanPlayThrough={() => {
          // alert(videoRef.current.duration);
          setIsLoadind(false);
        }}
        controls
        autoPlay
      >
        <source
          src="https://docs.material-tailwind.com/demo.mp4"
          type="video/mp4"
        />
      </video>

      {/* Video Overlay */}
      <div className="absolute left-0 right-0 top-0 b-black w-full h-full flex flex-col justify-end">
        {/* Progress bar */}
        <div>{isLoadind ? "calm down and grab a cup of coffee" : ""}</div>
        <div className={progressBarStyle}>
          <div className={progressBarInnerStyle}></div>
        </div>

        {/* Video  controls */}
        <div>
          <button onClick={playVideo}>{isPlaying ? "Pause" : "Play"}</button>
        </div>
      </div>
    </div>
  );
}
