import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { HiVolumeUp } from "react-icons/hi";

const PlaybackControls = ({
  playing,
  onPlayPause,
  playbackRate,
  onPlaybackRateChange,
  volume,
  onVolumeChange,
  currentPosition,
  duration,
  onSeek,
}) => {
  const handleSeekChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    onSeek(newTime);
  };
  function formatTime(seconds) {
    const pad = (num) => (num < 10 ? "0" + num : num);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = Math.floor(seconds % 60);

    return `${pad(hours)}:${pad(minutes)}:${pad(secondsLeft)}` ;
  }

  return (
    <div className="flex-col items-center justify-between w-full mt-4">
      <div className="flex w-full mb-4">
        <button onClick={onPlayPause} className="text-white mr-3">
          {playing ? <FaPause /> : <FaPlay />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={(currentPosition / duration) * 100 || 0}
          onChange={handleSeekChange}
          className="w-full text-black font-thin"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex text-gray-400">
          <div className="text-white">{formatTime(currentPosition)}</div>
          <span>&nbsp;|&nbsp;</span>
          {formatTime(duration)}
        </div>

        <div className="flex items-center text-white gap-2">
          {/* <label className="text-white mr-2"></label> */}
          <HiVolumeUp className="" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={onVolumeChange}
            className="bg-gray-600 rounded-lg w-24"
          />
        </div>
      </div>
      <div className="flex items-center my-4 ml-3">
        <div className="rounded-md border border-gray-500 p-1">
          <label className="text-white mr-2">Playback Speed</label>
          <select
            value={playbackRate}
            onChange={(e) => onPlaybackRateChange(parseFloat(e.target.value))}
            className="text-gray-400 bg-transparent"
          >
            <option value={0.5}>0.5x</option>
            <option value={1.0}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2.0}>2x</option>
          </select>
        </div>
<div className="rounded-md border border-gray-600 p-1 px-2 flex items-center my-4 ml-3">
          <label className="text-white text-sm">Cropper Aspect Ratio</label>
          <select
            className="text-gray-400 bg-transparent"
          >
            <option value={0.5}>9:18</option>
            <option value={9 / 16}>9:16</option>
            <option value={4 / 3}>4:3</option>
            <option value={3 / 4}>3:4</option>
            <option value={1}>1:1</option>
            <option value={4 / 5}>4:5</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PlaybackControls;