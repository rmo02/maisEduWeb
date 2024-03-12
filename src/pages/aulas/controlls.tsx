// // DOCUMENTAÇÃO
// // https://code.pieces.app/blog/react-player-customized-controls

import {
  MdFastForward,
  MdFastRewind,
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdVolumeUp,
} from "react-icons/md";

export function Controls() {
  return (
    <div className="bg-black bg-opacity-60 absolute top-0 bottom-0 right-0 left-0 flex flex-col justify-between z-1">
      <div id="mid__container" className="flex justify-center items-center">
        <div id="icon__btn" className="text-purple-600 text-lg px-4">
          <MdFastRewind fontSize="medium" />
        </div>
        <div id="icon__btn" className="text-purple-600 text-lg px-4">
          <MdPause fontSize="medium" />
        </div>
        <div id="icon__btn" className="text-purple-600 text-lg px-4">
          <MdFastForward fontSize="medium" />
        </div>
      </div>
      <div id="bottom_container">
        <div id="slider__container" className="flex items-center px-4">{/* <PrettoSlider/> */}</div>
        <div
          id="control__box"
          className="flex items-center justify-between"
        >
          <div id="inner_controls" className="flex items-center w-1/2 p-2">
            <div id="icon__btn" className="text-purple-600 text-lg px-4">
              <MdPlayArrow fontSize="medium" />
            </div>
            <div id="icon__btn" className="text-purple-600 text-lg px-4">
              <MdSkipNext fontSize="medium" />
            </div>
            <div id="icon__btn" className="text-purple-600 text-lg px-4">
              <MdVolumeUp fontSize="medium" />
            </div>
            {/* <Slider/> */}
            <span className="text-purple-600 text-sm ml-[10px]">5/20</span>
          </div>
        </div>
      </div>
    </div>
  );
}
