import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback, useState, useEffect } from "react";

import * as THREE from "three";

export const Uranus = React.memo(
  ({ rotationSpeed, distance, angleMultiplier }) => {
    const uranusRef = useRef();
    const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock

    const [hovered, setHover] = useState(false);

    const uranusTexture = useTexture("/textures/uranus.jpeg");

    const updateUranusPosition = useCallback(() => {
      // Calculate the Uranus' position based on its angle from the Sun
      const angle = clockRef.current.getElapsedTime() * angleMultiplier;

      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;

      uranusRef.current.position.set(x, 0, z);
      uranusRef.current.rotation.y += rotationSpeed;
    }, [angleMultiplier, distance, rotationSpeed]);

    useEffect(() => {
      document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    useFrame(() => {
      updateUranusPosition();
    });

    return (
      <group ref={uranusRef}>
        <mesh
          castShadow
          receiveShadow
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          {/* Radius , X-axis , Y-axis */}
          <sphereGeometry args={[2, 32, 32]} />
          <meshPhongMaterial
            map={uranusTexture}
            emissiveMap={uranusTexture}
            emissive={0xffffff}
            emissiveIntensity={hovered ? 0.5 : 0.05}
          />
        </mesh>
      </group>
    );
  }
);

Uranus.displayName = "Uranus";
