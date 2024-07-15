import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import Vid from '../../../assets/vid.mp4';
import PlaybackControls from './PlaybackControls';
import Cropper from './Cropper';
import { setPlaying, setPlaybackRate, setVolume, setCurrentPosition } from '../../../redux/videoSlice';

const VideoPlayer = ({ cropperActive }) => {
  const { playing, playbackRate, volume, currentPosition } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

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
    playerRef.current.seekTo(time);
    dispatch(setCurrentPosition(time));
  };

  const handleAspectRatioChange = (ratio) => {
    setAspectRatio(ratio);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        dispatch(setCurrentPosition(playerRef.current.getCurrentTime()));
      }
    }, 200);

    return () => clearInterval(interval);
  }, [dispatch]);

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
            dispatch(setPlaying(false));
            dispatch(setCurrentPosition(0));
            playerRef.current.seekTo(0);
          }}
        />
        {cropperActive && (
          <Cropper aspectRatio={aspectRatio} videoHeight={290} />
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
        duration={playerRef.current?.getDuration() || 0}
        onSeek={handleSeek}
        onAspectRatioChange={handleAspectRatioChange}
      />
    </div>
  );
};

export default VideoPlayer;
