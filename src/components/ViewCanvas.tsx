"use client"; // Indicates the component runs on the client side (for Next.js with React)

import { Canvas } from "@react-three/fiber"; // React Three Fiber: A React renderer for Three.js
import React from "react";
import { Environment, View } from "@react-three/drei";
import FloatingCan from "@/components/FloatingCan";

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
      <View.Port />
    </Canvas>
  );
}
