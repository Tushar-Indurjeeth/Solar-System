import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback, useState, useEffect } from "react";

import * as THREE from "three";

export const Mercury = React.memo(
  ({ rotationSpeed, distance, angleMultiplier }) => {
    const mercuryRef = useRef();
    const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock

    const [hovered, setHover] = useState(false);

    const mercuryTexture = useTexture("/textures/mercury.jpeg");

    const updateMercuryPosition = useCallback(() => {
      // Calculate the Mercury's position based on its angle from the Sun
      const angle = clockRef.current.getElapsedTime() * angleMultiplier;

      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;

      mercuryRef.current.position.set(x, 0, z);
      mercuryRef.current.rotation.y += rotationSpeed;
    }, [angleMultiplier, distance, rotationSpeed]);

    useEffect(() => {
      document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    useFrame(() => {
      updateMercuryPosition();
    });

    return (
      <group ref={mercuryRef}>
        <mesh
          castShadow
          receiveShadow
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          {/* Radius , X-axis , Y-axis */}
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshPhongMaterial
            map={mercuryTexture}
            emissiveMap={mercuryTexture}
            emissive={0xffffff}
            emissiveIntensity={hovered ? 0.5 : 0.05}
          />
        </mesh>
      </group>
    );
  }
);

Mercury.displayName = "Mercury";
