import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoPlayer from "./Mainvideosection/VideoPlayer";
import ReactPlayer from "react-player";
import Vid from "../../assets/vid.mp4";
import {
  toggleCropper,
  setPlaying,
  setPlaybackRate,
  setVolume,
  setCurrentPosition,
  setCropperDimensions,
} from "../../redux/videoSlice";

export default function GenerateSessions() {
  const {
    cropperActive,
    playing,
    playbackRate,
    volume,
    currentPosition,
    cropperDimensions,
  } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const previewPlayerRef = useRef(null);
  const { setCropperDimensions } = useSelector((state) => state.video);

  const handlePlayPause = () => {
    dispatch(setPlaying(!playing));
  };

  const handlePlaybackRateChange = (rate) => {
    dispatch(setPlaybackRate(rate));
  };

  const handleVolumeChange = (e) => {
    dispatch(setVolume(parseFloat(e.target.value)));
  };

  const handleSeek = (time) => {
    dispatch(setCurrentPosition(time));
  };

  useEffect(() => {
    if (cropperActive && previewPlayerRef.current) {
      previewPlayerRef.current.seekTo(currentPosition);
    }
  }, [currentPosition, cropperActive]);

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div className="justify-between flex p-5">
        <div className="flex-1 max-w-fit">
          <VideoPlayer
            cropperActive={cropperActive}
            playing={playing}
            playbackRate={playbackRate}
            volume={volume}
            currentPosition={currentPosition}
            onPlayPause={handlePlayPause}
            onPlaybackRateChange={handlePlaybackRateChange}
            onVolumeChange={handleVolumeChange}
            onSeek={handleSeek}
          />
        </div>
        {cropperActive && (
          <div className="flex-1 flex justify-center">
            <div
              style={{
                width: `${cropperDimensions.width}px`,
                height: "290px", // Replace 'constant-height-px' with your desired height
                // overflow: "hidden",
              }}
              className="overflow-hidden"
            >
              <ReactPlayer
                ref={previewPlayerRef}
                url={Vid}
                playing={playing}
                playbackRate={playbackRate}
                volume={volume}
                // width="100%"
                height="100%" // Adjust this if you need to control the height differently
                onProgress={({ playedSeconds }) =>
                  dispatch(setCurrentPosition(playedSeconds))
                }
              />
            </div>
          </div>
        )}
      </div>
      <div className="h-20 border-t-[1px] border-t-slate-600 p-6 flex justify-between">
        <div className="flex gap-3">
          <button
            className="h-full text-center bg-purple-800 px-2 rounded-lg"
            onClick={() => dispatch(toggleCropper())}
          >
            <span className="text-white font-semibold">
              {cropperActive ? "Remove Cropper" : "Start Cropper"}
            </span>
          </button>
          <button className="h-full text-center bg-purple-800 px-2 rounded-lg">
            <span className="text-white font-semibold">Generate Preview</span>
          </button>
        </div>
        <div>
          <button className="h-full text-center bg-[#45474E] px-4 rounded-lg">
            <span className="text-white font-semibold">Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
