"use client";

import { asText, Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  // The `useGSAP` hook initializes GSAP animations when the component mounts.
  useGSAP(() => {
    // Timeline for intro animations.
    const introTimeline = gsap.timeline();

    introTimeline
      // Set the initial opacity of the `.hero` section to 1 (it was `0` in CSS).
      .set(".hero", { opacity: 1 })

      // Animate each `.hero-header-word`:
      .from(".hero-header-word", {
        scale: 3, // Start with a scale of 3 (words are 3x larger).
        opacity: 0, // Start with opacity set to 0 (completely transparent).
        ease: "power4.in", // Easing function for smooth animation-in effect.
        delay: 0.3, // Delay animation start by 0.3 seconds.
        stagger: 1, // Staggered animation: each word animates 1 second apart.
      })

      // Animate `.hero-subheading`:
      .from(
        ".hero-subheading", // Target `.hero-subheading` class.
        {
          opacity: 0, // Start with opacity 0 (invisible).
          y: 30, // Move the subheading 30px down (y-axis).
        },
        "+=.8", // Start this animation 0.8 seconds after the previous one finishes.
      )

      // Animate `.hero-body` text:
      .from(".hero-body", {
        opacity: 0, // Start with opacity 0 (invisible).
        y: 10, // Move the text 10px down (y-axis).
      })

      // Animate the `.hero-button`:
      .from(".hero-button", {
        opacity: 0, // Start with opacity 0 (invisible).
        y: 10, // Move the button 10px down (y-axis).
      });

    // Create a new timeline for animations triggered by scroll.
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero", // The `.hero` section triggers the scroll animation.
        start: "top top", // Animation starts when `.hero` top hits the viewport top.
        end: "bottom bottom", // Animation ends when `.hero` bottom hits the viewport bottom.
        scrub: 1.5, // Smooth animation tied to scroll position (1.5 = smooth delay).
        // markers: true, // Add visual markers for debugging (start/end points).
      },
    });

    scrollTl
      // Animate the background color of the `<body>`:
      .fromTo(
        "body", // Target the entire `<body>` element.
        {
          backgroundColor: "#FDE047", // Start background color: yellow.
        },
        {
          backgroundColor: "#D9F99D", // End background color: light green.
          overwrite: "auto", // Prevent conflicts with other animations.
        },
        1, // Position: This happens 1 second after timeline starts.
      )

      // Animate each `.split-char` in `.text-side-heading`:
      .from(".text-side-heading .split-char", {
        scale: 1.3, // Start with 1.3x scale (slightly bigger).
        y: 40, // Move each character 40px down.
        rotate: -25, // Start with -25 degrees rotation.
        opacity: 0, // Start with opacity 0 (invisible).
        ease: "back.out(3)", // "Back out" easing for a springy effect.
        stagger: 0.1, // Each character animates 0.1 seconds apart.
        duration: 0.5, // Each character animation lasts 0.5 seconds.
      })

      // Animate the `.text-side-body`:
      .from(".text-side-body", {
        opacity: 0, // Start with opacity 0 (invisible).
        y: 20, // Move the text 20px down (y-axis).
      });
  });

  // Return the JSX for the Hero component
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0" // Set initial opacity to 0 for GSAP animation.
    >
      <div className="grid">
        {/* Centered content inside the hero section */}
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            {/* Hero Heading */}
            <h1 className="hero-header text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[13rem]">
              <TextSplitter
                text={asText(slice.primary.heading)}
                wordDisplayStyle="block"
                className="hero-header-word" // Each word is targeted individually.
              />
            </h1>

            {/* Hero Subheading */}
            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>

            {/* Hero Body Text */}
            <div className="hero-body text-2xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>

            {/* Hero Button */}
            <Button
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
              className="hero-button mt-12"
            />
          </div>
        </div>

        {/* Secondary Content Section */}
        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          {/* Optional Image */}
          <PrismicNextImage
            className="w-full md:hidden"
            field={slice.primary.cans_image}
          />

          {/* Text Content */}
          <div className="text-side">
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
              <TextSplitter text={asText(slice.primary.second_heading)} />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.second_body} />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
