"use client";

import Matter from "matter-js";
import { useEffect } from "react";
import { useContactModalStore } from "@/lib/zustand/stores";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhysicsContactButtons({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const open = useContactModalStore((state) => state.open);

  useEffect(() => {
    if (!containerRef.current) return;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
    } = Matter;

    // Get container dimensions
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    // Create an engine
    const engine = Engine.create({
      gravity: {
        y: 1.5,
        scale: 0.001,
      },
    });

    // Create a renderer that uses the containerRef element
    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width: containerWidth,
        height: containerHeight,
        background: "transparent",
        wireframes: false,
        pixelRatio: window.devicePixelRatio || 1,
      },
    });

    // Create the CTAs (not added initially)
    const ctaA = Bodies.rectangle(containerWidth * 0.2, -330, 407, 170, {
      friction: 0.3,
      frictionAir: 0.00001,
      restitution: 0.3,
      render: {
        sprite: {
          texture: "/images/other/cta-say-hiii.png",
          xScale: 0.5,
          yScale: 0.5,
        },
      },
      chamfer: { radius: 85 },
    });

    const ctaB = Bodies.rectangle(containerWidth * 0.4, -400, 549, 170, {
      friction: 0.3,
      frictionAir: 0.00001,
      restitution: 0.3,
      render: {
        sprite: {
          texture: "/images/other/cta-reach-out.png",
          xScale: 0.5,
          yScale: 0.5,
        },
      },
      chamfer: { radius: 85 },
    });

    const ctaC = Bodies.rectangle(containerWidth * 0.6, -200, 957, 170, {
      friction: 0.3,
      frictionAir: 0.00001,
      restitution: 0.3,
      render: {
        sprite: {
          texture: "/images/other/cta-send-a-message.png",
          xScale: 0.5,
          yScale: 0.5,
        },
      },
      chamfer: { radius: 85 },
    });

    const ctaD = Bodies.rectangle(containerWidth * 0.5, -250, 507, 170, {
      friction: 0.3,
      frictionAir: 0.00001,
      restitution: 0.3,
      render: {
        sprite: {
          texture: "/images/other/cta-lets-chat.png",
          xScale: 0.5,
          yScale: 0.5,
        },
      },
      chamfer: { radius: 85 },
    });

    const ctaE = Bodies.circle(containerWidth * 0.85, -260, 115, {
      friction: 0.3,
      frictionAir: 0.00001,
      restitution: 0.3,
      render: {
        sprite: {
          texture: "/images/other/cta-mail.png",
          xScale: 0.5,
          yScale: 0.5,
        },
      },
    });

    const ctaF = Bodies.circle(containerWidth * 0.1, -150, 115, {
      friction: 0.3,
      frictionAir: 0.00001,
      restitution: 0.3,
      render: {
        sprite: {
          texture: "/images/other/cta-message.png",
          xScale: 0.5,
          yScale: 0.5,
        },
      },
    });

    // Creates a mouse
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    // Create an array of all interactive bodies
    const interactiveBodies = [ctaA, ctaB, ctaC, ctaD, ctaE, ctaF];

    // Track click state
    let clickStartBody: Matter.Body | null = null;
    let clickStartTime = 0;
    let isDragging = false;

    // On mouse down, record the starting body and time
    Events.on(mouseConstraint, "mousedown", (event) => {
      const mousePosition = event.mouse.position;
      clickStartBody = Matter.Query.point(interactiveBodies, mousePosition)[0];
      clickStartTime = Date.now();
      isDragging = false;
    });

    // On mouse move while pressed, check if we're dragging
    Events.on(mouseConstraint, "mousemove", (event) => {
      const mousePosition = event.mouse.position;
      const hoveredBody = Matter.Query.point(
        interactiveBodies,
        mousePosition
      )[0];

      // Update cursor style
      if (hoveredBody) {
        render.canvas.style.cursor = "pointer";
      } else {
        render.canvas.style.cursor = "default";
      }

      // If mouse is down and has moved significantly, consider it a drag
      if (mouseConstraint.mouse.button === 0 && mouseConstraint.body) {
        isDragging = true;
      }
    });

    // On mouse up, check if it was a click or a drag
    Events.on(mouseConstraint, "mouseup", (event) => {
      const mousePosition = event.mouse.position;
      const releasedBody = Matter.Query.point(
        interactiveBodies,
        mousePosition
      )[0];
      const clickDuration = Date.now() - clickStartTime;

      // If it's the same body, wasn't dragging, and click was short, consider it a click
      if (
        releasedBody &&
        releasedBody === clickStartBody &&
        !isDragging &&
        clickDuration < 300
      ) {
        open();
      }

      // Reset tracking variables
      clickStartBody = null;
    });

    // Create bounds (walls, ceiling, ground) (not added initially)
    const wallThickness = 1;

    // Ground (bottom)
    const ground = Bodies.rectangle(
      containerWidth / 2,
      containerHeight - wallThickness / 2,
      containerWidth,
      wallThickness,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    // Left wall
    const leftWall = Bodies.rectangle(
      wallThickness / 2,
      containerHeight / 2,
      wallThickness,
      containerHeight,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    // Right wall
    const rightWall = Bodies.rectangle(
      containerWidth - wallThickness / 2,
      containerHeight / 2,
      wallThickness,
      containerHeight,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    // Ceiling (not added initially)
    const ceiling = Bodies.rectangle(
      containerWidth / 2,
      wallThickness / 2,
      containerWidth,
      wallThickness,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    // Create a flag to track if bodies have been added
    let bodiesAdded = false;

    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 35%",
      onEnter: () => {
        // Only add bodies if they haven't been added yet
        if (!bodiesAdded) {
          // Add all bodies to the world
          Composite.add(engine.world, [
            ctaA,
            ctaB,
            ctaC,
            ctaD,
            ctaE,
            ctaF,
            mouseConstraint,
            ground,
            leftWall,
            rightWall,
          ]);

          setTimeout(() => {
            Composite.add(engine.world, ceiling);
          }, 2000);

          // Set flag to true so this only happens once
          bodiesAdded = true;

          // Optionally, kill the ScrollTrigger since we don't need it anymore
          scrollTrigger.kill();
        }
      },
    });

    // Render the scene
    Render.run(render);

    // Create runner
    const runner = Runner.create();

    // Run the engine
    Runner.run(runner, engine);

    // Handle Resize
    function handleResize(containerRef: React.RefObject<HTMLDivElement>) {
      // Set canvas size to new values
      render.canvas.width = containerRef.current.clientWidth;
      render.canvas.height = containerRef.current.clientHeight;

      // Reposition right wall
      Matter.Body.setPosition(
        rightWall,
        Matter.Vector.create(
          containerRef.current.clientWidth + wallThickness / 2,
          containerRef.current.clientHeight / 2
        )
      );
    }

    window.addEventListener("resize", () => handleResize(containerRef));

    // Cleanup function for useEffect
    return () => {
      // Remove all event listeners
      Events.off(mouseConstraint, "mousedown");
      Events.off(mouseConstraint, "mousemove");
      Events.off(mouseConstraint, "mouseup");

      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};

      scrollTrigger.kill();
    };
  }, [containerRef, open]);

  return <div></div>;
}
