import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback } from "react";
import * as THREE from "three";

export const Moon = React.memo(({ xAxis, angleMultiplier }) => {
  const moonRef = useRef();
  const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock

  const [moonTexture] = useTexture(["/textures/moon.jpeg"]);

  const updateMoonPosition = useCallback(() => {
    // Orbit Rotation
    moonRef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * angleMultiplier) * xAxis;
    moonRef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * angleMultiplier) * xAxis;
    // Axis Rotation
    moonRef.current.rotation.y += 0.002;
  }, []);

  useFrame(() => {
    updateMoonPosition();
  });

  return (
    <mesh castShadow receiveShadow ref={moonRef} position={[xAxis, 0, 0]}>
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhongMaterial
        map={moonTexture}
        emissiveMap={moonTexture}
        emissive={0xffffff}
        emissiveIntensity={0.05}
      />
    </mesh>
  );
});

Moon.displayName = "Moon";
