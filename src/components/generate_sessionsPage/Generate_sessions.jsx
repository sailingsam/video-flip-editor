import VideoPlayer from "./Mainvideosection/VideoPlayer";
import React from "react";

export default function generate_sessions() {
  return (
    <div className="h-full w-full">
      <div className="justify-between flex">
        <div className="flex-1">
          <VideoPlayer />
        </div>
        {/* generate preview section */}
        <div className="flex-1">
          
        </div>
      </div>
    </div>
  );
}
