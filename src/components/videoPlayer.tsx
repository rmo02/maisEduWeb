import ctl from "@netlify/classnames-template-literals";
import React, { useRef, useState, useEffect } from "react";
import { MdFullscreenExit, MdPlayArrow, MdPause } from "react-icons/md";

export function VideoPlayer() {
  const videoContainerStyle = ctl(`
    relative
    w-full
    max-w-[967px]
    mx-auto
  `);

  const videoStyle = ctl(`
    w-full
  `);

  const videoControlsStyle = ctl(`
    absolute
    bottom-0
    left-0
    right-0
    flex
    justify-between
    px-4
    pb-4
    text-white
    w-full
	h-[32px]
	bg-black
	bg-opacity-25
  `);

  const progressBarStyle = ctl(`
    bg-white
    h-[4px]
    w-full
    absolute
    bottom-2
    left-0
    mb-6
	bg-opacity-25
  `);

  const progressBarInnerStyle = ctl(`
    bg-blue-600
    h-full
    `);
  // progress-bar-inner

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const playVideo = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }

    setIsPlaying((currentPlayStatus) => !currentPlayStatus);
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
      videoRef.current.addEventListener("canplaythrough", handleCanPlayThrough);
      videoRef.current.addEventListener("ended", handleVideoEnded);

      return () => {
        videoRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
        videoRef.current?.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
        videoRef.current?.removeEventListener("ended", handleVideoEnded);
      };
    }
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current?.currentTime || 0);
  };

  const handleCanPlayThrough = () => {
    setVideoDuration(videoRef.current?.duration || 0);
    setIsLoading(false);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  return (
    <div className={videoContainerStyle}>
      <video
        className={videoStyle}
        ref={videoRef}
        onWaiting={() => setIsLoading(true)}
      >
        <source
          src="https://docs.material-tailwind.com/demo.mp4"
          type="video/mp4"
        />
      </video>

      {/* Progress bar */}

      {/* Video controls */}
      <div className={videoControlsStyle}>
        <div className={progressBarStyle}>
          <div
            className={progressBarInnerStyle}
            style={{
              // animationPlayState: isPlaying ? "running" : "paused",
              // animationDuration: isPlaying
              //   ? `${videoRef.current?.duration}s`
              //   : "0s",
              width: isLoading
                ? "0%"
                : `${(currentTime / videoDuration) * 100}%`,
            }}
          />
        </div>
        <button onClick={playVideo}>
          {isPlaying ? (
            <MdPause className="w-[25px] h-[25px]" />
          ) : (
            <MdPlayArrow className="w-[25px] h-[25px]" />
          )}
        </button>
        <p>
          {formatTime(currentTime)}/{formatTime(videoDuration)}
        </p>
        <button onClick={toggleFullScreen}>
          <MdFullscreenExit className="w-[25px] h-[25px]" />
        </button>
      </div>
    </div>
  );
}
