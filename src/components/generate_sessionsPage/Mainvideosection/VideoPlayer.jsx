import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import PlaybackControls from "./PlaybackControls";
import VideoCropper from "./VideoCropper";
import Vid from "../../../assets/vid.mp4";

const VideoPlayer = ({ onCropComplete }) => {
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [volume, setVolume] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const playerRef = useRef(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleSeek = (time) => {
    playerRef.current.seekTo(time);
  };

  const handleAspectRatioChange = (ratio) => {
    setAspectRatio(ratio);
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    // Pass cropped area information to parent component
    onCropComplete(croppedAreaPixels);
    // Store cropped area pixels for local use
    setCroppedAreaPixels(croppedAreaPixels);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentPosition(playerRef.current.getCurrentTime());
        setDuration(playerRef.current.getDuration());
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative rounded-lg overflow-hidden" onClick={handlePlayPause}>
        <ReactPlayer
          ref={playerRef}
          url={Vid}
          playing={playing}
          playbackRate={playbackRate}
          volume={volume}
          width="100%"
          height="auto"
          onEnded={() => {
            setPlaying(false);
            setCurrentPosition(0);
            playerRef.current.seekTo(0);
          }}
        />
        <VideoCropper
          videoRef={playerRef}
          aspectRatio={aspectRatio}
          onCropChange={(crop) => console.log(crop)}
          onCropComplete={handleCropComplete}
        />
      </div>
      <PlaybackControls
        playing={playing}
        onPlayPause={handlePlayPause}
        playbackRate={playbackRate}
        onPlaybackRateChange={handlePlaybackRateChange}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        currentPosition={currentPosition}
        duration={duration}
        onSeek={handleSeek}
        aspectRatio={aspectRatio}
        onAspectRatioChange={handleAspectRatioChange}
      />
    </div>
  );
};

export default VideoPlayer;
