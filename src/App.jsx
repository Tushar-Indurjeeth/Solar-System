import { useState } from "react";
import { MainContainer } from "./MainContainer";
import { Canvas } from "@react-three/fiber";

export const App = () => {
  const [speed, setSpeed] = useState(1);
  const [currSpeed, setCurrSpeed] = useState(1);
  const [pause, setPause] = useState(true);

  const increaseSpeed = () => {
    setSpeed(speed + 1);
  };

  const resetSpeed = () => {
    setSpeed(1);
  };

  const pauseResume = () => {
    if (pause) {
      setCurrSpeed(speed);
      setSpeed(0);
    }
    if (!pause) setSpeed(currSpeed);

    setPause(!pause);
  };

  return (
    <>
      <Canvas
        shadows
        camera={{ fov: 100, near: 0.1, far: 1000, position: [16, 8.5, 19.5] }}
      >
        <MainContainer speed={speed} />
      </Canvas>

      <div>
        <button
          onClick={increaseSpeed}
          className="absolute bottom-4 right-4 px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
        >
          {`Increase Speed: ${speed}x`}
        </button>

        <button
          onClick={resetSpeed}
          className="absolute bottom-4 right-48 px-5 py-2 bg-green-500 text-white rounded-md cursor-pointer"
        >
          Reset Speed
        </button>
        <button
          onClick={pauseResume}
          className="absolute bottom-4 right-[20.3rem] px-5 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        >
          {`${pause ? "Pause" : "Resume"} Planets`}
        </button>
      </div>
    </>
  );
};

export default App;
