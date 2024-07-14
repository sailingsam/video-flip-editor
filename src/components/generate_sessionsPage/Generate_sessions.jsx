import React, { useState } from "react";
import VideoPlayer from "./Mainvideosection/VideoPlayer";
import Vid from "../../assets/vid.mp4";

export default function generate_sessions() {
  const [previewCroppedAreaPixels, setPreviewCroppedAreaPixels] =
    useState(null);

  const handleCropComplete = (croppedAreaPixels) => {
    // Update state with cropped area pixels information
    setPreviewCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <div className="h-full w-full">
      <div className="justify-between flex">
        <div className="flex-1">
          <VideoPlayer
            onCropComplete={handleCropComplete}
            previewCroppedAreaPixels={previewCroppedAreaPixels}
          />
        </div>
        {/* generate preview section */}
        <div className="flex-1">
        {previewCroppedAreaPixels && (
            <div>
              <h2>Preview Area</h2>
              <video
                src={Vid}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover", // Ensure video fills its container
                }}
                className="overflow-hidden"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
