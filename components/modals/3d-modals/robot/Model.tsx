import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";

import useMediaQuery from "@/hooks/useMediaQuery";

useGLTF.preload("/threeD-models/robot_playground.glb");

export default function Model() {
  const group = useRef<Group>(null);

  const { animations, scene } = useGLTF("/threeD-models/robot_playground.glb");
  const { actions } = useAnimations(animations, scene);
  const [animationProgress, setAnimationProgress] = useState(0);
  const { isMobile } = useMediaQuery();

  useEffect(() => {
    //@ts-ignore
    actions["Experiment"].play().paused = true;
  }, [actions]);

  useFrame((state, delta) => {
    setAnimationProgress((prevProgress) => {
      const newProgress = prevProgress + delta * 1.5;
      //@ts-ignore
      const duration = actions["Experiment"].getClip().duration;
      //@ts-ignore
      actions["Experiment"].time = newProgress % duration;

      return newProgress;
    });
  });

  return (
    <group ref={group} scale={1.5} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  );
}
