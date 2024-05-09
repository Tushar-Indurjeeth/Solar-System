import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback, useState, useEffect } from "react";
import { Moon } from "./Moon";

import * as THREE from "three";

export const Mars = React.memo(
  ({ rotationSpeed, distance, angleMultiplier }) => {
    const marsRef = useRef();
    const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock

    const [hovered, setHover] = useState(false);

    const marsTexture = useTexture("/textures/mars.jpeg");

    const updateMarsPosition = useCallback(() => {
      // Calculate the Mars' position based on its angle from the Sun
      const angle = clockRef.current.getElapsedTime() * angleMultiplier;

      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;

      marsRef.current.position.set(x, 0, z);
      marsRef.current.rotation.y += rotationSpeed;
    }, [angleMultiplier, distance, rotationSpeed]);

    useEffect(() => {
      document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    useFrame(() => {
      updateMarsPosition();
    });

    return (
      <group ref={marsRef}>
        <mesh
          castShadow
          receiveShadow
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          {/* Radius , X-axis , Y-axis */}
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial
            map={marsTexture}
            emissiveMap={marsTexture}
            emissive={0xffffff}
            emissiveIntensity={hovered ? 0.5 : 0.05}
          />
        </mesh>
        <Moon xAxis={4} angleMultiplier={0.4} />
        <Moon xAxis={6} angleMultiplier={0.2} />
      </group>
    );
  }
);

Mars.displayName = "Mars";
