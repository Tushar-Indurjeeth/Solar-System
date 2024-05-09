import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

export const Sun = React.memo(() => {
  const sunRef = useRef();

  const sunTexture = useTexture("/textures/sun.jpg");

  useFrame(() => {
    // Axis Rotation
    sunRef.current.rotation.y -= 0.002;
  });

  return (
    <group>
      <mesh ref={sunRef} position={[0, 0, 0]}>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[12, 32, 32]} />
        <meshPhongMaterial
          map={sunTexture}
          emissiveMap={sunTexture}
          emissiveIntensity={1}
          emissive={0xffffff}
        />
        <pointLight position={[0, 0, 0]} intensity={1000} />
      </mesh>
    </group>
  );
});

Sun.displayName = "Sun";
