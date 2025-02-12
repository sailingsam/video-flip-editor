import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { setCropperDimensions } from "../../../redux/videoSlice";

const Cropper = ({ aspectRatio, videoHeight }) => {
  const dispatch = useDispatch();
  const [cropperState, setCropperState] = useState({
    x: 0,
    y: 0,
    width: videoHeight * aspectRatio,
    height: 290,
  });

  useEffect(() => {
    setCropperState((prevState) => ({
      ...prevState,
      width: videoHeight * aspectRatio,
      height: videoHeight,
    }));
    dispatch(
      setCropperDimensions({
        width: cropperState.width,
        height: cropperState.height,
      })
    );
  }, [aspectRatio, videoHeight, dispatch]);

  const handleDrag = (e, data) => {
    setCropperState({
      ...cropperState,
      x: data.x,
      y: data.y,
    });
  };

  return (
    <Draggable
      bounds="parent"
      position={{ x: cropperState.x, y: cropperState.y }}
      onStop={handleDrag}
    >
      <div
        style={{
          width: cropperState.width,
          height: cropperState.height,
          border: "2px solid #fff",
          position: "absolute",
        }}
        className="grid grid-cols-3 grid-rows-3"
      >
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="border border-dashed"></div>
          ))}
      </div>
    </Draggable>
  );
};

export default Cropper;
