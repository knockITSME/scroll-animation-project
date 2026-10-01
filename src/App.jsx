import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const carRef = useRef(null);
  const statsRef = useRef(null);

  // Second section refs
  const afterSectionRef = useRef(null);
  const afterTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* =================================
         INTRO ANIMATION
      ================================= */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Eyebrow
      intro.from(".eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.6,
      });

      // Main headline letters
      intro.from(
        ".hero-letter",
        {
          opacity: 0,
          y: 60,
          rotateX: -70,
          duration: 0.8,
          stagger: 0.045,
        },
        "-=0.25"
      );

      // Description
      intro.from(
        ".hero-description",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        "-=0.45"
      );

      // Statistics cards
      intro.from(
        ".stat-card",
        {
          opacity: 0,
          y: 35,
          duration: 0.6,
          stagger: 0.15,
        },
        "-=0.35"
      );

      // Car entrance
      intro.from(
        ".car",
        {
          opacity: 0,
          x: 180,
          scale: 0.8,
          duration: 1.1,
          ease: "power3.out",
        },
        "-=0.8"
      );

      /* =================================
         STATISTICS COUNT-UP
      ================================= */

      const statNumbers =
        document.querySelectorAll(".stat-number");

      statNumbers.forEach((numberElement) => {
        const targetValue = Number(
          numberElement.getAttribute("data-value")
        );

        const counter = {
          value: 0,
        };

        gsap.to(counter, {
          value: targetValue,
          duration: 1.5,
          delay: 1.4,
          ease: "power2.out",

          onUpdate: () => {
            numberElement.textContent =
              `${Math.round(counter.value)}%`;
          },
        });
      });

      /* =================================
         SCROLL-DRIVEN CAR ANIMATION
      ================================= */

      const carTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          markers: false,
        },
      });

      /*
        The car starts on the right.

        As the user scrolls:
        1. It moves slightly left and down.
        2. It continues moving down.
        3. It becomes smaller and fades slightly.

        The movement is connected directly
        to scroll progress.
      */

      carTimeline
        .to(carRef.current, {
          x: -40,
          y: 60,
          rotation: -2,
          scale: 0.97,
          duration: 0.3,
          ease: "none",
        })

        .to(carRef.current, {
          x: -100,
          y: 150,
          rotation: 3,
          scale: 0.9,
          duration: 0.35,
          ease: "none",
        })

        .to(carRef.current, {
          x: -170,
          y: 250,
          rotation: 7,
          scale: 0.78,
          opacity: 0.2,
          duration: 0.35,
          ease: "none",
        });

      /* =================================
         HEADLINE PARALLAX
      ================================= */

      gsap.to(".headline-wrapper", {
        y: -120,
        opacity: 0.75,
        ease: "none",

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =================================
         STATISTICS PARALLAX
      ================================= */

      gsap.to(statsRef.current, {
        y: 130,
        opacity: 0.25,
        ease: "none",

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      /* =================================
         BACKGROUND PARALLAX
      ================================= */

      gsap.to(".glow-one", {
        x: -180,
        y: 120,
        scale: 1.4,
        ease: "none",

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".glow-two", {
        x: 180,
        y: -100,
        scale: 1.25,
        ease: "none",

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /* =================================
         SECOND SECTION REVEAL
      ================================= */

      gsap.fromTo(
        afterTextRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",

          scrollTrigger: {
            trigger: afterSectionRef.current,
            start: "top 80%",
            end: "top 35%",
            scrub: 1,
          },
        }
      );

      /* =================================
         SCROLL PROGRESS
      ================================= */

      gsap.to(".scroll-progress", {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      /* =================================
         REFRESH SCROLLTRIGGER
      ================================= */

      ScrollTrigger.refresh();
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main>

      {/* =================================
          HERO SECTION
      ================================= */}

      <section
        className="hero"
        ref={heroRef}
      >

        {/* BACKGROUND */}

        <div className="hero-background">

          <div className="glow glow-one"></div>

          <div className="glow glow-two"></div>

        </div>


        {/* =================================
            NAVIGATION
        ================================= */}

        <nav className="navbar">

          <div className="logo">
            ITZ<span>FIZZ</span>
          </div>

          <div className="nav-label">
            SCROLL EXPERIENCE
          </div>

        </nav>


        {/* =================================
            HERO CONTENT
        ================================= */}

        <div className="hero-content">

          {/* =================================
              HEADLINE
          ================================= */}

          <div className="headline-wrapper">

            <p className="eyebrow">
              CREATIVE DIGITAL EXPERIENCE
            </p>

            <h1>

              {/* WELCOME */}

              <span className="headline-line">

                {"WELCOME".split("").map(
                  (letter, index) => (
                    <span
                      className="hero-letter"
                      key={`welcome-${index}`}
                    >
                      {letter}
                    </span>
                  )
                )}

              </span>


              {/* ITZ FIZZ */}

              <span className="headline-line">

                {"ITZ FIZZ".split("").map(
                  (letter, index) => (
                    <span
                      className="hero-letter"
                      key={`fizz-${index}`}
                    >
                      {letter === " "
                        ? "\u00A0"
                        : letter}
                    </span>
                  )
                )}

              </span>

            </h1>


            <p className="hero-description">
              Scroll to explore a smooth interactive
              experience built with modern web animation.
            </p>

          </div>


          {/* =================================
              CAR VISUAL
          ================================= */}

          <div className="visual-area">

            <div className="visual-shadow"></div>

            <div
              className="car"
              ref={carRef}
            >

              {/* CAR ROOF */}

              <div className="car-roof"></div>


              {/* CAR WINDOW */}

              <div className="car-window"></div>


              {/* CAR BODY */}

              <div className="car-body">

                {/* HEADLIGHT */}

                <div className="car-light"></div>


                {/* DOOR */}

                <div className="car-door"></div>


                {/* DOOR HANDLE */}

                <div className="car-handle"></div>

              </div>


              {/* LEFT WHEEL */}

              <div className="wheel wheel-left">

                <div className="wheel-inner"></div>

              </div>


              {/* RIGHT WHEEL */}

              <div className="wheel wheel-right">

                <div className="wheel-inner"></div>

              </div>

            </div>

          </div>


          {/* =================================
              STATISTICS
          ================================= */}

          <div
            className="stats"
            ref={statsRef}
          >

            {/* STAT 1 */}

            <div className="stat-card">

              <strong
                className="stat-number"
                data-value="85"
              >
                0%
              </strong>

              <span>
                Performance
              </span>

            </div>


            {/* STAT 2 */}

            <div className="stat-card">

              <strong
                className="stat-number"
                data-value="92"
              >
                0%
              </strong>

              <span>
                User Experience
              </span>

            </div>


            {/* STAT 3 */}

            <div className="stat-card">

              <strong
                className="stat-number"
                data-value="78"
              >
                0%
              </strong>

              <span>
                Engagement
              </span>

            </div>

          </div>

        </div>


        {/* =================================
            SCROLL INDICATOR
        ================================= */}

        <div className="scroll-indicator">

          <span>
            SCROLL
          </span>

          <div className="scroll-line">

            <div className="scroll-progress"></div>

          </div>

        </div>

      </section>


      {/* =================================
          SECOND SECTION
      ================================= */}

      <section
        className="after-section"
        ref={afterSectionRef}
      >

        <div
          className="after-section-content"
          ref={afterTextRef}
        >

          <p>
            THE EXPERIENCE CONTINUES
          </p>

          <h2>
            BUILT FOR MOTION.
          </h2>

          <span>
            Designed to move with every scroll.
          </span>

        </div>

      </section>

    </main>
  );
}

export default App;