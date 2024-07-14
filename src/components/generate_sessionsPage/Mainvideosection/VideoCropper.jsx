import React, { useState } from "react";
import Cropper from "react-easy-crop";

const VideoCropper = ({
  videoRef,
  aspectRatio,
  onCropChange,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const aspect = aspectRatio.split(":").map(Number);
  const aspectValue = aspect[0] / aspect[1];

  return (
    <div className="h-full">
      <Cropper
        video={videoRef}
        crop={crop}
        aspect={aspectValue}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        cropShape="rect"
        showGrid={true}
        zoomWithScroll={false} // Disable zoom with scroll
        interactionMode="onCropChange" // Move grid instead of media
        classes={{
          containerClassName: "h-full",
        }}
        style={{
          containerStyle: { height: "100%", width: "100%" },
          mediaStyle: { height: "100%", width: "100%" },
        }}
      />
    </div>
  );
};

export default VideoCropper;
