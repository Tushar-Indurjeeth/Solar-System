import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback, useState, useEffect } from "react";

import * as THREE from "three";

export const Saturn = React.memo(
  ({ rotationSpeed, distance, angleMultiplier }) => {
    const saturnRef = useRef();
    const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock

    const [hovered, setHover] = useState(false);

    const saturnTexture = useTexture("/textures/saturn.png");

    const updateSaturnPosition = useCallback(() => {
      // Calculate the Saturn's position based on its angle from the Sun
      const angle = clockRef.current.getElapsedTime() * angleMultiplier;

      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;

      saturnRef.current.position.set(x, 0, z);
      saturnRef.current.rotation.y += rotationSpeed;
    }, [angleMultiplier, distance, rotationSpeed]);

    useEffect(() => {
      document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    useFrame(() => {
      updateSaturnPosition();
    });

    return (
      <group ref={saturnRef}>
        <mesh
          castShadow
          receiveShadow
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          {/* Radius , X-axis , Y-axis */}
          <sphereGeometry args={[3, 32, 32]} />
          <meshPhongMaterial
            map={saturnTexture}
            emissiveMap={saturnTexture}
            emissive={0xffffff}
            emissiveIntensity={hovered ? 0.5 : 0.05}
          />
        </mesh>
      </group>
    );
  }
);

Saturn.displayName = "Saturn";
