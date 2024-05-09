import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback, useState, useEffect } from "react";

import * as THREE from "three";

export const Jupiter = React.memo(
  ({ rotationSpeed, distance, angleMultiplier }) => {
    const jupiterRef = useRef();
    const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock

    const [hovered, setHover] = useState(false);

    const jupiterTexture = useTexture("/textures/jupiter.jpeg");

    const updateJupiterPosition = useCallback(() => {
      // Calculate the Jupiter's position based on its angle from the Sun
      const angle = clockRef.current.getElapsedTime() * angleMultiplier;

      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;

      jupiterRef.current.position.set(x, 0, z);
      jupiterRef.current.rotation.y += rotationSpeed;
    }, [angleMultiplier, distance, rotationSpeed]);

    useEffect(() => {
      document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    useFrame(() => {
      updateJupiterPosition();
    });

    return (
      <group ref={jupiterRef}>
        <mesh
          castShadow
          receiveShadow
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          {/* Radius , X-axis , Y-axis */}
          <sphereGeometry args={[5, 32, 32]} />
          <meshPhongMaterial
            map={jupiterTexture}
            emissiveMap={jupiterTexture}
            emissive={0xffffff}
            emissiveIntensity={hovered ? 0.5 : 0.04}
          />
        </mesh>
      </group>
    );
  }
);

Jupiter.displayName = "Jupiter";
