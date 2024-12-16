"use client";
import FloatingCan from "@/components/FloatingCan";
import { Environment, OrbitControls } from "@react-three/drei";
import React, { useRef } from "react";
import { Group } from "three";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

export default function Scene({}: Props) {
  // Refs for each can and groups
  const can1Ref = useRef<Group>(null);
  const can2Ref = useRef<Group>(null);
  const can3Ref = useRef<Group>(null);
  const can4Ref = useRef<Group>(null);
  const can5Ref = useRef<Group>(null);

  const can1GroupRef = useRef<Group>(null);
  const can2GroupRef = useRef<Group>(null);

  const groupRef = useRef<Group>(null);

  // Floating speed for the cans
  const FLOAT_SPEED = 1.5;

  // GSAP Animation Logic
  useGSAP(() => {
    // Safety check to ensure all refs are assigned
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !groupRef.current
    )
      return;

    // --- Initial Setup ---
    // Set the starting position and rotation for cans
    gsap.set(can1Ref.current.position, { x: -1.5 });
    gsap.set(can1Ref.current.rotation, { z: -0.5 });

    gsap.set(can2Ref.current.position, { x: 1.5 });
    gsap.set(can2Ref.current.rotation, { z: 0.5 });

    gsap.set(can3Ref.current.position, { y: 5, z: 2 });
    gsap.set(can4Ref.current.position, { x: 2, y: 4, z: 2 });
    gsap.set(can5Ref.current.position, { y: -5 });

    // --- Intro Animation ---
    // Timeline for the initial animation when page loads
    const introTl = gsap.timeline({
      defaults: {
        duration: 3, // Default duration for all `from()` or `to()` animations in this timeline
        ease: "back.out(1.4)", // Default easing function
      },
    });

    // Run intro animations if the scroll position is near the top
    if (window.scrollY < 20) {
      introTl
        .from(can1GroupRef.current.position, { y: -5, x: 1 }, 0)
        .from(can1GroupRef.current.rotation, { z: 3 }, 0)
        .from(can2GroupRef.current.position, { y: 5, x: 1 }, 0)
        .from(can2GroupRef.current.rotation, { z: 3 }, 0);
    }

    // --- Scroll Animation ---
    // Timeline for scroll-based animations
    const scrollTl = gsap.timeline({
      defaults: {
        duration: 2, // Default duration for each `to()` animation inside this timeline
      },

      scrollTrigger: {
        trigger: ".hero", // Element that triggers the scroll animation
        start: "top top", // Animation starts when top of trigger meets the top of the viewport
        end: "bottom bottom", // Animation ends when bottom of trigger meets the bottom of viewport
        scrub: 1.5, // Smooth animation synchronization with scroll (scrub effect)
        markers: true, // Display markers to debug the scrollTrigger
      },
    });

    // Scroll animations for cans and group
    scrollTl
      // Rotate the entire group around the Y-axis
      .to(groupRef.current.rotation, { y: Math.PI * 2 })

      // Animate positions and rotations of individual cans
      .to(can1Ref.current.position, { x: -0.2, y: -0.7, z: -2 }, 0)
      .to(can1Ref.current.rotation, { z: 0.3 }, 0)

      .to(can2Ref.current.position, { x: 1, y: -0.2, z: -1 }, 0)
      .to(can2Ref.current.rotation, { z: 0 }, 0)

      .to(can3Ref.current.position, { x: -0.3, y: 0.5, z: -1 }, 0)
      .to(can3Ref.current.rotation, { z: -0.1 }, 0)

      .to(can4Ref.current.position, { x: 0, y: -0.3, z: 0.5 }, 0)
      .to(can4Ref.current.rotation, { z: 0.3 }, 0)

      .to(can5Ref.current.position, { x: 0.3, y: 0.5, z: -0.5 }, 0)
      .to(can5Ref.current.rotation, { z: -0.25 }, 0)

      // Animate the group position with a delayed duration
      .to(
        groupRef.current.position,
        { x: 1, duration: 3, ease: "sine.inOut" },
        1.3, // Start this animation at a specific point (1.3 seconds into the timeline)
      );
  });

  return (
    <group ref={groupRef}>
      {/* Floating Can Groups */}
      <group ref={can1GroupRef}>
        <FloatingCan
          ref={can1Ref}
          flavor="blackCherry"
          floatSpeed={FLOAT_SPEED}
        />
      </group>

      <group ref={can2GroupRef}>
        <FloatingCan
          ref={can2Ref}
          flavor="lemonLime"
          floatSpeed={FLOAT_SPEED}
        />
      </group>

      <FloatingCan ref={can3Ref} flavor="grape" floatSpeed={FLOAT_SPEED} />
      <FloatingCan
        ref={can4Ref}
        flavor="strawberryLemonade"
        floatSpeed={FLOAT_SPEED}
      />
      <FloatingCan ref={can5Ref} flavor="watermelon" floatSpeed={FLOAT_SPEED} />

      {/* Controls and Environment */}
      <OrbitControls />
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}
