import React from "react";
import Generate_sessions from "./components/generate_sessionsPage/Generate_sessions";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#18191B]">
      <div className="bg-[#37393F] border border-gray-600 rounded-lg w-[1082px] h-[700px] flex flex-col">
        <div className="flex p-6 w-full">
          <h1 className="text-white text-lg font-bold absolute">Cropper</h1>
          <div className="m-auto bg-[#45474E] rounded-lg p-1">
            <button className="text-white text-sm font-semibold p-1 px-2">
              <span>Preview Session</span>
            </button>
            <button className="text-white text-sm font-semibold bg-[#37393F] p-1 px-3 rounded-lg h-full">
              <span>Generate Session</span>
            </button>
          </div>
        </div>
        <div className="h-full ">
          <Generate_sessions />
        </div>
      </div>
    </div>
  );
};

export default App;
