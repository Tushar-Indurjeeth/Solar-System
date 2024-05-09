import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useCallback, useState, useEffect } from "react";

import * as THREE from "three";

export const Venus = React.memo(
  ({ rotationSpeed, distance, angleMultiplier }) => {
    const venusRef = useRef();
    const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock

    const [hovered, setHover] = useState(false);

    const venusTexture = useTexture("/textures/venus.jpeg");

    const updateVenusPosition = useCallback(() => {
      // Calculate the Venus's position based on its angle from the Sun
      const angle = clockRef.current.getElapsedTime() * angleMultiplier;

      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;

      venusRef.current.position.set(x, 0, z);
      venusRef.current.rotation.y += rotationSpeed;
    }, [angleMultiplier, distance, rotationSpeed]);

    useEffect(() => {
      document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    useFrame(() => {
      updateVenusPosition();
    });

    return (
      <group ref={venusRef}>
        <mesh
          castShadow
          receiveShadow
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          {/* Radius , X-axis , Y-axis */}
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial
            map={venusTexture}
            emissiveMap={venusTexture}
            emissive={0xffffff}
            emissiveIntensity={hovered ? 0.5 : 0.05}
          />
        </mesh>
      </group>
    );
  }
);

Venus.displayName = "Venus";
