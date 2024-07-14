import VideoPlayer from "./Mainvideosection/VideoPlayer";
import React from "react";

export default function generate_sessions() {
  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div className="justify-between flex p-5">
        <div className="flex-1">
          <VideoPlayer />
        </div>
        {/* generate preview section */}
        <div className="flex-1">
          <h2 className="text-white">Dynamic Preview</h2>
        </div>
      </div>
      <div className="h-20 border-t-[1px] border-t-slate-600 p-6 flex justify-between">
        <div className="flex gap-3">
          <button className="h-full text-center bg-purple-800 px-2 rounded-lg">
            <span className="text-white font-semibold">Start Cropper</span>
          </button>
          <button className="h-full text-center bg-purple-800 px-2 rounded-lg">
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
