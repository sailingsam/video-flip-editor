import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import PlaybackControls from "./PlaybackControls";
import Vid from "../../../assets/vid.mp4";

const VideoPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [volume, setVolume] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentPosition(playerRef.current.getCurrentTime());
        setDuration(playerRef.current.getDuration());
      }
    }, 20); // Update every 200 milliseconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [setCurrentPosition]);

  return (
    <div className="flex flex-col items-center">
      <div className="rounded-md overflow-hidden" onClick={handlePlayPause}>
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
          // controls
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
      />
    </div>
  );
};

export default VideoPlayer;
