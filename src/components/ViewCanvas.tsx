"use client"; // Indicates the component runs on the client side (for Next.js with React)

import { Canvas } from "@react-three/fiber"; // React Three Fiber: A React renderer for Three.js
import React from "react";

type Props = {};

export default function ViewCanvas({}: Props) {
  return (
    <Canvas
      // Canvas container styling for positioning on the screen
      style={{
        position: "fixed", // Fix the canvas to the viewport
        top: 0, // Align to the top of the viewport
        left: "50%", // Align to the center horizontally
        transform: "translateX(-50%)", // Center it using translation
        overflow: "hidden", // Hide overflowing content
        pointerEvents: "none", // Disable mouse interactions with the canvas
        zIndex: 30, // Ensures it appears above most other content
      }}
      shadows // Enables shadows in the scene
      gl={{ antialias: true }} // Enable antialiasing for smoother edges
      // Device pixel ratio: Controls rendering quality on different screen resolutions
      dpr={[1, 1.5]} // Lower range for standard displays, higher range for retina displays
      // Camera settings for the 3D scene
      camera={{
        fov: 30, // Field of view: Controls the zoom of the camera
      }}
    >
      {/* 
        3D Object: A mesh is a visible 3D object that combines geometry (shape) and material (appearance).
        Here, we use a simple cube as an example.
      */}
      <mesh
        rotation={[0.5, 0.5, 0]} // Set the rotation of the cube (x, y, z axes in radians)
        position={[1, 0, 0]} // Set the position of the cube in 3D space (x, y, z)
      >
        <boxGeometry />{" "}
        {/* Geometry: Defines the shape of the object (a cube here) */}
        <meshStandardMaterial color={"hotpink"} />{" "}
        {/* Material: Sets the color of the cube */}
      </mesh>

      {/* Ambient light: Provides general lighting to the scene */}
      <ambientLight intensity={2} />

      {/* SpotLight: Adds a spotlight to simulate directional light */}
      <spotLight intensity={3} position={[1, 1, 1]} />
    </Canvas>
  );
}
