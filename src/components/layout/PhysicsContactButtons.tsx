"use client";

import Matter from "matter-js";
import { useEffect, useRef } from "react";

export default function PhysicsContactButtons({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  useEffect(() => {
    if (!containerRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite } = Matter;

    // Get container dimensions
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    // Create an engine
    const engine = Engine.create();

    // Create a renderer that uses the containerRef element
    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width: containerWidth,
        height: containerHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    // Create two boxes - positioned relative to container dimensions
    const boxA = Bodies.rectangle(
      containerWidth / 2 - 50,
      containerHeight / 3,
      80,
      80,
      {
        render: { fillStyle: "#4285F4" },
        restitution: 0.5,
      }
    );
    const boxB = Bodies.rectangle(
      containerWidth / 2 + 50,
      containerHeight / 4,
      80,
      80,
      {
        render: { fillStyle: "#EA4335" },
        restitution: 0.5,
      }
    );

    // Create bounds (walls, ceiling, ground)
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

    // Ceiling (top)
    const ceiling = Bodies.rectangle(
      containerWidth / 2,
      wallThickness / 2,
      containerWidth,
      wallThickness,
      { isStatic: true, render: { fillStyle: "transparent" } }
    );

    // Add all bodies to the world
    Composite.add(engine.world, [
      boxA,
      boxB,
      ground,
      leftWall,
      rightWall,
      ceiling,
    ]);

    // Render the scene
    Render.run(render);

    // Create runner
    const runner = Runner.create();

    // Run the engine
    Runner.run(runner, engine);

    // Cleanup function for useEffect
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [containerRef]);

  return <div></div>;
}
