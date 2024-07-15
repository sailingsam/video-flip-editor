import React, { useState, useRef, useEffect } from "react";
import VideoPlayer from "./Mainvideosection/VideoPlayer";
import ReactPlayer from "react-player";
import Vid from "../../assets/vid.mp4";
import PlaybackControls from "./Mainvideosection/PlaybackControls"; // Import the PlaybackControls

export default function GenerateSessions() {
  const [cropperActive, setCropperActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [volume, setVolume] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const previewPlayerRef = useRef(null);

  // Sync the state between both players
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
  };

  const handleVolumeChange = (e) => {
    const volume = parseFloat(e.target.value);
    setVolume(volume);
  };

  const handleSeek = (time) => {
    previewPlayerRef.current.seekTo(time);
    setCurrentPosition(time);
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
            <ReactPlayer
              ref={previewPlayerRef}
              url={Vid}
              playing={playing}
              playbackRate={playbackRate}
              volume={volume}
              width="90%"
              height="290px"
              onProgress={({ playedSeconds }) => setCurrentPosition(playedSeconds)}
            />
          </div>
        )}
      </div>
      <div className="h-20 border-t-[1px] border-t-slate-600 p-6 flex justify-between">
        <div className="flex gap-3">
          <button
            className="h-full text-center bg-purple-800 px-2 rounded-lg"
            onClick={() => setCropperActive(true)}
          >
            <span className="text-white font-semibold">Start Cropper</span>
          </button>
          <button
            className="h-full text-center bg-purple-800 px-2 rounded-lg"
            onClick={() => setCropperActive(false)}
          >
            <span className="text-white font-semibold">Remove Cropper</span>
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
