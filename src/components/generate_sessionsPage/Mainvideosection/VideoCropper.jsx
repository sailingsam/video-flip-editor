import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

const VideoCropper = ({ videoRef, aspectRatio, onCropChange, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropSizeChange = useCallback(
    (cropSize) => {
      const { width, height } = cropSize;
      const aspect = aspectRatio.split(":").map(Number);
      const aspectWidth = aspect[0];
      const aspectHeight = aspect[1];
      const newHeight = (width / aspectWidth) * aspectHeight;
      setCrop({ width, height: newHeight });
    },
    [aspectRatio]
  );

  return (
    <Cropper
      video={videoRef.current && videoRef.current.getInternalPlayer().getVideoSrc()}
      crop={crop}
      zoom={zoom}
      aspect={parseFloat(aspectRatio)}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      cropShape="rect"
      showGrid={false}
    />
  );
};

export default VideoCropper;
