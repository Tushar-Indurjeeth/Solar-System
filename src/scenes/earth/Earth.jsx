import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback, useState, useEffect } from "react";
import { Moon } from "./Moon";

import * as THREE from "three";

export const Earth = React.memo(
  ({ rotationSpeed, distance, angleMultiplier }) => {
    const earthRef = useRef();
    const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock

    const [hovered, setHover] = useState(false);

    const earthTexture = useTexture("/textures/earth.jpeg");

    const updateEarthPosition = useCallback(() => {
      // Calculate the Earth's position based on its angle from the Sun
      const angle = clockRef.current.getElapsedTime() * angleMultiplier;

      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;

      earthRef.current.position.set(x, 0, z);
      earthRef.current.rotation.y += rotationSpeed;
    }, [angleMultiplier, distance, rotationSpeed]);

    useEffect(() => {
      document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    useFrame(() => {
      updateEarthPosition();
    });

    return (
      <group ref={earthRef}>
        <mesh
          castShadow
          receiveShadow
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          {/* Radius , X-axis , Y-axis */}
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial
            map={earthTexture}
            emissiveMap={earthTexture}
            emissive={0xffffff}
            emissiveIntensity={hovered ? 0.5 : 0.05}
          />
        </mesh>
        <Moon />
      </group>
    );
  }
);

Earth.displayName = "Earth";
