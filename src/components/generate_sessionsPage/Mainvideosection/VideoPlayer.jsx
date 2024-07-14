import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import PlaybackControls from "./PlaybackControls";
import Cropper from "./VideoCropper";
import Vid from "../../../assets/vid.mp4";

const VideoPlayer = ({ cropperActive }) => {
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [volume, setVolume] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [videoHeight, setVideoHeight] = useState(290);
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

  const handleAspectRatioChange = (aspectRatio) => {
    setAspectRatio(aspectRatio);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentPosition(playerRef.current.getCurrentTime());
        setDuration(playerRef.current.getDuration());
      }
      const height = playerRef.current.wrapper.clientHeight;
      setVideoHeight(height);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center relative">
      <div className="rounded-md overflow-hidden" onClick={handlePlayPause}>
        <ReactPlayer
          ref={playerRef}
          url={Vid}
          playing={playing}
          playbackRate={playbackRate}
          volume={volume}
          width="100%"
          height="290px"
          onEnded={() => {
            setPlaying(false);
            setCurrentPosition(0);
            playerRef.current.seekTo(0);
          }}
        />
        {cropperActive && (
          <Cropper aspectRatio={aspectRatio} videoHeight={videoHeight} />
        )}
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
        onAspectRatioChange={handleAspectRatioChange}
      />
    </div>
  );
};

export default VideoPlayer;
