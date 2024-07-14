import React from "react";
// import VideoPlayer from "./components/generate_sessions/VideoPlayer";
import Generate_sessions from "./components/generate_sessionsPage/Generate_sessions";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#18191B]">
      <div className="bg-[#37393F] border border-gray-600 rounded-lg w-[1082px] h-[700px] flex flex-col">
        <div className="flex pb-8">
          <h1 className="text-white text-lg font-bold">Cropper</h1>
          <h1>fr</h1>
        </div>
        <div className="h-full ">
          <Generate_sessions />
        </div>
      </div>
    </div>
  );
};

export default App;
