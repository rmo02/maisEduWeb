// DOCUMENTAÇÃO
// https://code.pieces.app/blog/react-player-customized-controls
import ctl from "@netlify/classnames-template-literals";
import { FastForward, Pause } from "lucide-react";
import {
  MdFastForward,
  MdFastRewind,
  MdOutlinePause,
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdVolumeUp,
} from "react-icons/md";

const control_container = ctl(`
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    flex-direction: column;
    z-index: 1;
    display: flex;
    justify-content: space-between;
`);

const top_container = ctl(`
display: flex;
align-items: center;
justify-content: space-between;
margin: 5px 20px;
`);

const mid_container = ctl(`
    display: flex;
    justify-content: center;
    align-items: center;
`)

const icon_btn = ctl(`
    padding: 0 10px;
    color: #7b2cbf;
`)

// width: 100%;
const slider_container = ctl(`
   display: flex;
   align-items: center;
   padding: 0 16px;
`)

const control_box = ctl(`
display: flex;
align-items: center;
justify-content: space-between;
`)

const inner_controls = ctl(`
display: flex;
padding: 10px 0;
align-items: center;
width: 50%;
`)

const span = ctl(`
    color: #9556cc;
    font-size: 0.8rem;
    margin-left: 10px;
`)

const second_control = ctl(`
    display: flex;
    align-items: center;
`)


export function Controls() {
  return (
    <div className={control_container}>
      {/* <div className="bg-black bg-opacity-60 absolute top-0 bottom-0 right-0 left-0 flex flex-col justify-between z-10"> */}
      <div className="flex items-center justify-between m-5">
        <h2>Video Player</h2>
      </div>
      <div className={mid_container}>
        <div className={icon_btn}>
          <MdFastRewind fontSize="medium" />
        </div>

        <div className={icon_btn}>
          <Pause fontSize="medium" />
        </div>

        <div className={icon_btn}>
          <FastForward fontSize="medium" />
        </div>
      </div>

      <div className="bottom_container">
        <div className={slider_container}>
          PrettoSlider
          {/* <PrettoSlider /> */}
        </div>
        <div className={control_box}>
          <div className={inner_controls}>
            <div className={icon_btn}>
              <MdPlayArrow fontSize="medium" />
            </div>
            <div className={icon_btn}>
              <MdSkipNext fontSize="medium" />
            </div>
            <div className={icon_btn}>
              <MdVolumeUp fontSize="medium" />
            </div>
            Slider
            {/* <Slider className={`${classes.volumeSlider}`} /> */}
            <span className={span}>5/20</span>
          </div>
        </div>
      </div>
    </div>
  );
}
