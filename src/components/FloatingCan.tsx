"use client"; // Enables React's client-side rendering mode

// Import necessary dependencies
import { Float } from "@react-three/drei"; // Float component for floating animations
import React, { forwardRef, ReactNode } from "react"; // React utilities for creating components and refs
import { SodaCan, SodaCanProps } from "@/components/SodaCan"; // Custom SodaCan component and its props
import { Group } from "three"; // Group from Three.js to group objects in 3D space

// Define the props type for FloatingCan component
type FloatignCanProps = {
  flavor?: SodaCanProps["flavor"]; // Optional flavor prop, derived from SodaCanProps
  floatSpeed?: number; // Speed of floating animation (default: 1.5)
  rotationIntensity?: number; // Intensity of rotation while floating (default: 1)
  floatIntensity?: number; // Intensity of up-and-down movement (default: 1)
  floatingRange?: [number, number]; // Range for vertical floating motion (default: [-0.1, 0.1])
  children?: ReactNode; // Optional children to render inside the Float component
};

// Create the FloatingCan component using forwardRef to pass refs to the Group element
const FloatingCan = forwardRef<Group, FloatignCanProps>(
  (
    {
      flavor = "blackCherry", // Default flavor is 'blackCherry'
      floatSpeed = 1.5, // Default floating animation speed
      rotationIntensity = 1, // Default rotation intensity
      floatIntensity = 1, // Default up-and-down floating intensity
      floatingRange = [-0.1, 0.1], // Default range for floating on the y-axis
      children, // Optional children nodes
      ...props // Spread any additional props passed to the component
    },
    ref, // Ref passed from the parent component
  ) => {
    return (
      // Group component from Three.js to group objects together in 3D space
      <group ref={ref} {...props}>
        {/* Float component from @react-three/drei for floating animations */}
        <Float
          speed={floatSpeed} // Speed of the floating animation
          rotationIntensity={rotationIntensity} // Intensity of XYZ axis rotation
          floatIntensity={floatIntensity} // Up-and-down float intensity (affects floatingRange)
          floatingRange={floatingRange} // Specifies the range of floating along the y-axis
        >
          {/* Optional children nodes (if provided) will be rendered here */}
          {children}
          {/* Render the SodaCan component with the specified flavor */}
          <SodaCan flavor={flavor} />
        </Float>
      </group>
    );
  },
);

// Add a display name for better debugging and developer experience
FloatingCan.displayName = "FloatignCan";

// Export the FloatingCan component for use in other parts of the application
export default FloatingCan;
