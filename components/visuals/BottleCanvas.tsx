"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Text } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import type { FlavorId } from "@/components/visuals/flavor";
import { flavors } from "@/components/visuals/flavor";

gsap.registerPlugin(ScrollTrigger);

type BottleCanvasProps = {
  flavor: FlavorId;
};

type BottleRigProps = {
  flavor: FlavorId;
};

export function BottleCanvas({ flavor }: BottleCanvasProps) {
  return (
    <div className="pointer-events-none fixed inset-y-0 right-0 z-20 h-screen w-full md:w-[72vw]">
      <Canvas
        camera={{ position: [0, 0.25, 6.3], fov: 34 }}
        dpr={[1, 1.75]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.46} />
        <pointLight
          position={[-3.8, 1.9, 3.2]}
          intensity={22}
          color="#ff4faf"
          distance={8}
        />
        <pointLight
          position={[4.4, 1.1, 3.4]}
          intensity={19}
          color="#8a45ff"
          distance={8}
        />
        <spotLight
          position={[0, 4.8, 4.2]}
          intensity={2.7}
          angle={0.32}
          penumbra={0.78}
          color="#fff3fb"
        />
        <BottleRig flavor={flavor} />
        <ContactShadows
          position={[0, -2.35, 0]}
          opacity={0.26}
          scale={6}
          blur={2.8}
          far={2.2}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}

function BottleRig({ flavor }: BottleRigProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const liquidMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;

      document.documentElement.style.setProperty(
        "--spot-x",
        `${event.clientX}px`,
      );
      document.documentElement.style.setProperty(
        "--spot-y",
        `${event.clientY}px`,
      );
    };

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        scroll.current.target = self.progress;
      },
    });

    window.addEventListener("pointermove", handlePointerMove);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    const material = liquidMaterialRef.current;
    if (!material) {
      return;
    }

    const targetColor = new THREE.Color(flavors[flavor].liquid);
    gsap.to(material.color, {
      r: targetColor.r,
      g: targetColor.g,
      b: targetColor.b,
      duration: 0.85,
      ease: "power3.out",
    });
    gsap.to(material.emissive, {
      r: targetColor.r * 0.22,
      g: targetColor.g * 0.1,
      b: targetColor.b * 0.24,
      duration: 0.85,
      ease: "power3.out",
    });
  }, [flavor]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const damping = 1 - Math.exp(-delta * 4.2);
    scroll.current.current = THREE.MathUtils.lerp(
      scroll.current.current,
      scroll.current.target,
      damping,
    );

    const floatY = Math.sin(state.clock.elapsedTime * 0.92) * 0.09;
    const cursorX = pointer.current.x;
    const cursorY = pointer.current.y;
    const scrollProgress = scroll.current.current;

    group.position.y = THREE.MathUtils.lerp(
      group.position.y,
      floatY - scrollProgress * 0.72,
      damping,
    );
    group.position.x = THREE.MathUtils.lerp(
      group.position.x,
      cursorX * 0.16 + scrollProgress * 0.22,
      damping,
    );
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      -cursorY * 0.15,
      damping,
    );
    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      cursorX * 0.23 + scrollProgress * Math.PI * 1.15,
      damping,
    );
    group.rotation.z = THREE.MathUtils.lerp(
      group.rotation.z,
      -cursorX * 0.055,
      damping,
    );
  });

  return (
    <group ref={groupRef} position={[0.62, -0.06, 0]} scale={0.92}>
      <BottleBody liquidMaterialRef={liquidMaterialRef} flavor={flavor} />
    </group>
  );
}

function BottleBody({
  liquidMaterialRef,
  flavor,
}: {
  liquidMaterialRef: RefObject<THREE.MeshPhysicalMaterial | null>;
  flavor: FlavorId;
}) {
  const glassMaterial = (
    <meshPhysicalMaterial
      color="#fff8fb"
      metalness={0}
      roughness={0.025}
      transmission={0.96}
      thickness={0.72}
      ior={1.48}
      clearcoat={1}
      clearcoatRoughness={0.08}
      transparent
      opacity={0.34}
      envMapIntensity={1.15}
      side={THREE.DoubleSide}
    />
  );

  return (
    <group>
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.74, 0.88, 3.24, 112]} />
        <meshPhysicalMaterial
          ref={liquidMaterialRef}
          color={flavors[flavor].liquid}
          emissive={flavors[flavor].liquid}
          emissiveIntensity={0.08}
          roughness={0.17}
          transmission={0.36}
          thickness={0.48}
          transparent
          opacity={0.62}
          clearcoat={0.7}
        />
      </mesh>

      <mesh position={[0, -0.39, 0]}>{/* broad glass wall */}
        <cylinderGeometry args={[0.78, 0.91, 3.52, 128]} />
        {glassMaterial}
      </mesh>

      <mesh position={[0, 1.42, 0]} scale={[0.83, 0.28, 0.83]}>
        <sphereGeometry args={[1, 96, 28, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {glassMaterial}
      </mesh>

      <mesh position={[0, 2.08, 0]}>
        <cylinderGeometry args={[0.33, 0.37, 1.35, 96]} />
        {glassMaterial}
      </mesh>

      <mesh position={[0, 2.96, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.78, 96]} />
        <meshStandardMaterial
          color="#d8b99d"
          roughness={0.32}
          metalness={0.2}
          envMapIntensity={0.8}
        />
      </mesh>

      <mesh position={[0, 3.31, 0]}>
        <torusGeometry args={[0.38, 0.025, 14, 96]} />
        <meshStandardMaterial color="#f1d5bc" metalness={0.18} roughness={0.2} />
      </mesh>

      <mesh position={[0, -2.13, 0]}>
        <cylinderGeometry args={[0.84, 0.88, 0.16, 128]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.08}
          transmission={0.62}
          thickness={0.36}
          transparent
          opacity={0.52}
        />
      </mesh>

      <BottleLabel />
      <BottleHighlights />
    </group>
  );
}

function BottleLabel() {
  return (
    <group position={[0, -0.45, 0.925]}>
      <mesh>
        <planeGeometry args={[1.46, 1.67]} />
        <meshBasicMaterial color="#ffc0dc" transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[1.31, 1.51]} />
        <meshBasicMaterial color="#ffd1e7" transparent opacity={0.54} />
      </mesh>
      <mesh position={[0, 0.47, 0.026]}>
        <torusGeometry args={[0.24, 0.014, 12, 72]} />
        <meshBasicMaterial color="#121019" />
      </mesh>
      <mesh position={[0, 0.47, 0.034]}>
        <torusGeometry args={[0.16, 0.018, 12, 72]} />
        <meshBasicMaterial color="#23c9ff" />
      </mesh>
      <mesh position={[0, 0.47, 0.042]}>
        <circleGeometry args={[0.09, 48]} />
        <meshBasicMaterial color="#ff4faf" />
      </mesh>
      <Text
        position={[0, 0.04, 0.05]}
        fontSize={0.18}
        letterSpacing={0.045}
        color="#150d15"
        anchorX="center"
        anchorY="middle"
      >
        TSUKERKY
      </Text>
      <Text
        position={[0, -0.23, 0.05]}
        fontSize={0.055}
        letterSpacing={0.08}
        color="#45303f"
        anchorX="center"
        anchorY="middle"
      >
        MADE WITH VODKA
      </Text>
      <Text
        position={[0, -0.45, 0.05]}
        fontSize={0.115}
        letterSpacing={0.02}
        color="#f23399"
        anchorX="center"
        anchorY="middle"
      >
        Pink Candy
      </Text>
      <Text
        position={[0, -0.66, 0.05]}
        fontSize={0.05}
        letterSpacing={0.08}
        color="#352437"
        anchorX="center"
        anchorY="middle"
      >
        TEN TIMES FILTERED / 30% ALC. VOL
      </Text>
    </group>
  );
}

function BottleHighlights() {
  return (
    <group>
      <mesh position={[-0.46, -0.42, 0.74]} rotation={[0, -0.08, 0]}>
        <planeGeometry args={[0.09, 2.9]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.28} />
      </mesh>
      <mesh position={[0.55, -0.7, 0.68]} rotation={[0, 0.1, 0]}>
        <planeGeometry args={[0.06, 2.2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.16} />
      </mesh>
      <mesh position={[-0.16, 2.08, 0.32]}>
        <planeGeometry args={[0.06, 1.08]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}
