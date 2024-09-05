import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Html, useProgress } from "@react-three/drei";
import Model from "./Model";

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-black bg-white p-4 rounded-lg shadow-lg border border-gray-300">
        <p className="text-lg font-bold mb-2">Loading 3D Model...</p>
        <p className="text-sm">{progress.toFixed(1)}% loaded</p>
      </div>
    </Html>
  );
}

const Scene = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
      className="w-full h-full absolute top-0 left-0"
      camera={{ position: [0, 1, 5], fov: 50 }}
      style={{ backgroundColor: "white" }}
    >
      <directionalLight position={[-5, -5, -5]} intensity={4} />
      <Suspense fallback={<Loader />}>
        <Model />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
