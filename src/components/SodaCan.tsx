"use client"; // Enables React's client-side rendering mode

// Import hooks and utilities from @react-three/drei for 3D rendering
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three"; // Import Three.js for materials and geometries

// Preload the 3D model to optimize loading performance
useGLTF.preload("/Soda-can.gltf");

// Define texture paths for different soda can flavors
const flavorTextures = {
  lemonLime: "/labels/lemon-lime.png", // Lemon-Lime texture
  grape: "/labels/grape.png", // Grape texture
  blackCherry: "/labels/cherry.png", // Black Cherry texture
  strawberryLemonade: "/labels/strawberry.png", // Strawberry Lemonade texture
  watermelon: "/labels/watermelon.png", // Watermelon texture
};

// Define a reusable metal material for the soda can parts
const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3, // Controls surface roughness (higher = duller surface)
  metalness: 1, // Makes the material fully metallic
  color: "#bbbbbb", // Light gray color for the metal surface
});

// Define the props type for the SodaCan component
export type SodaCanProps = {
  flavor?: keyof typeof flavorTextures; // Optional flavor key (maps to texture paths)
  scale?: number; // Optional scale for resizing the can (default is 2)
};

// SodaCan component definition
export function SodaCan({
  flavor = "blackCherry", // Default flavor is Black Cherry
  scale = 2, // Default scale factor is 2
  ...props // Spread any additional props passed to the component
}: SodaCanProps) {
  // Load the 3D model of the soda can
  const { nodes } = useGLTF("/Soda-can.gltf");

  // Load all textures for different flavors
  const labels = useTexture(flavorTextures);

  // Fix texture orientation by disabling vertical flipping for each flavor
  labels.strawberryLemonade.flipY = false;
  labels.blackCherry.flipY = false;
  labels.watermelon.flipY = false;
  labels.grape.flipY = false;
  labels.lemonLime.flipY = false;

  // Select the texture based on the chosen flavor
  const label = labels[flavor];

  return (
    // Group component groups all soda can parts and applies transformations
    <group
      {...props} // Pass additional props (e.g., position, rotation) to the group
      dispose={null} // Ensures proper cleanup of memory for the 3D model
      scale={scale} // Apply the scale factor to resize the can
      rotation={[0, -Math.PI, 0]} // Rotate the can 180 degrees around the y-axis
    >
      {/* Main metallic body of the can */}
      <mesh
        castShadow // Allows the mesh to cast shadows
        receiveShadow // Allows the mesh to receive shadows
        geometry={(nodes.cylinder as THREE.Mesh).geometry} // Use geometry from the 3D model
        material={metalMaterial} // Apply the metal material
      />
      {/* Label mesh (texture applied) */}
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder_1 as THREE.Mesh).geometry} // Geometry for the label part
      >
        <meshStandardMaterial
          roughness={0.15} // Slightly shiny label surface
          metalness={0.7} // Partially metallic label
          map={label} // Apply the selected flavor texture
        />
      </mesh>
      {/* Soda can tab (top metallic part) */}
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Tab as THREE.Mesh).geometry} // Geometry for the can tab
        material={metalMaterial} // Reuse the metal material
      />
    </group>
  );
}
