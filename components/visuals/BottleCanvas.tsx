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

type ScrollTarget = {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  sx: number;
  sy: number;
  sz: number;
  opacity: number;
  motion: number;
};

const mobileStartTarget: ScrollTarget = {
  x: 0.66,
  y: -0.04,
  z: 0,
  rx: 0,
  ry: 0.08,
  rz: 0,
  sx: 0.46,
  sy: 0.46,
  sz: 0.46,
  opacity: 1,
  motion: 0,
};

const desktopStartTarget: ScrollTarget = {
  x: 0,
  y: -0.04,
  z: 0,
  rx: 0,
  ry: 0,
  rz: 0,
  sx: 1.04,
  sy: 1.04,
  sz: 1.04,
  opacity: 1,
  motion: 1,
};

export function BottleCanvas({ flavor }: BottleCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const trigger = ScrollTrigger.create({
      trigger: isMobile ? "[data-section='manifesto']" : "[data-section='products']",
      start: isMobile ? "top 48%" : "top 92%",
      end: isMobile ? "top 24%" : "top 68%",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(wrapper, { autoAlpha: 1 - self.progress });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none fixed inset-0 z-[48] h-screen w-full"
    >
      <Canvas
        camera={{ position: [0, 0.25, 6.3], fov: 34 }}
        dpr={[1, 1.75]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.86} />
        <pointLight
          position={[-3.3, 3.2, 4.4]}
          intensity={8.5}
          color="#ffffff"
          distance={9}
        />
        <pointLight
          position={[3.4, 2.4, 4.6]}
          intensity={6.2}
          color="#fff8fb"
          distance={9}
        />
        <pointLight
          position={[0, -2.3, 2.8]}
          intensity={5.4}
          color="#ffc0cb"
          distance={6}
        />
        <spotLight
          position={[0, 5.2, 4.8]}
          intensity={2.1}
          angle={0.36}
          penumbra={0.86}
          color="#ffffff"
        />
        <BottleRig flavor={flavor} />
        <ContactShadows
          position={[0, -2.35, 0]}
          opacity={0.14}
          scale={6}
          blur={3.6}
          far={2.2}
          color="#d65793"
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

function BottleRig({ flavor }: BottleRigProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const liquidMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const isMobileRef = useRef(false);
  const scrollTarget = useRef<ScrollTarget>({ ...desktopStartTarget });
  const materialOpacities = useRef<
    Array<{ material: THREE.Material; baseOpacity: number }>
  >([]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    isMobileRef.current = isMobile;

    if (isMobile) {
      Object.assign(scrollTarget.current, mobileStartTarget);
      return;
    }

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

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    materialOpacities.current = [];
    group.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material) => {
        material.transparent = true;
        materialOpacities.current.push({
          material,
          baseOpacity: material.opacity,
        });
      });
    });

    const target = scrollTarget.current;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    isMobileRef.current = isMobile;

    const startTarget = isMobile ? mobileStartTarget : desktopStartTarget;
    Object.assign(target, startTarget);

    if (isMobile) {
      group.position.set(startTarget.x, startTarget.y, startTarget.z);
      group.rotation.set(startTarget.rx, startTarget.ry, startTarget.rz);
      group.scale.set(startTarget.sx, startTarget.sy, startTarget.sz);
      ScrollTrigger.refresh();
      return;
    }

    const manifestoX = 1.18;

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: "[data-scroll-story]",
        start: "top top",
        endTrigger: "[data-section='manifesto']",
        end: "top top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(target, {
        x: manifestoX,
        y: -0.36,
        rx: 0.05,
        ry: 0.48,
        rz: -0.045,
        sx: 0.92,
        sy: 0.92,
        sz: 0.92,
        opacity: 1,
        motion: 0,
        duration: 1,
      });

    ScrollTrigger.refresh();

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
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

    const damping = 1 - Math.exp(-delta * 4.8);

    const floatY = Math.sin(state.clock.elapsedTime * 0.92) * 0.09;
    const cursorX = pointer.current.x;
    const cursorY = pointer.current.y;
    const target = scrollTarget.current;
    const motion = target.motion;
    const pointerMotion = isMobileRef.current ? 0 : motion;

    group.position.y = THREE.MathUtils.lerp(
      group.position.y,
      target.y + floatY * motion * (isMobileRef.current ? 0.55 : 1),
      damping,
    );
    group.position.x = THREE.MathUtils.lerp(
      group.position.x,
      target.x + cursorX * 0.12 * pointerMotion,
      damping,
    );
    group.position.z = THREE.MathUtils.lerp(group.position.z, target.z, damping);
    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      target.rx - cursorY * 0.1 * pointerMotion,
      damping,
    );
    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      target.ry + cursorX * 0.16 * pointerMotion,
      damping,
    );
    group.rotation.z = THREE.MathUtils.lerp(
      group.rotation.z,
      target.rz - cursorX * 0.035 * pointerMotion,
      damping,
    );
    group.scale.x = THREE.MathUtils.lerp(group.scale.x, target.sx, damping);
    group.scale.y = THREE.MathUtils.lerp(group.scale.y, target.sy, damping);
    group.scale.z = THREE.MathUtils.lerp(group.scale.z, target.sz, damping);

    materialOpacities.current.forEach(({ material, baseOpacity }) => {
      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        baseOpacity * target.opacity,
        damping,
      );
    });
  });

  return (
    <group ref={groupRef} position={[0, -0.04, 0]} scale={1.04}>
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
      color="#ffd9e8"
      metalness={0}
      roughness={0.15}
      transmission={0.9}
      thickness={1.5}
      ior={1.48}
      clearcoat={1}
      clearcoatRoughness={0.12}
      transparent
      opacity={0.42}
      envMapIntensity={0.72}
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
          emissiveIntensity={0.045}
          roughness={0.16}
          transmission={0.34}
          thickness={0.62}
          transparent
          opacity={0.68}
          clearcoat={0.86}
        />
      </mesh>

      <mesh position={[0, -0.39, 0]}>{/* pared amplia de vidrio */}
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
          color="#e9c8ad"
          roughness={0.38}
          metalness={0.12}
          envMapIntensity={0.55}
        />
      </mesh>

      <mesh position={[0, 3.31, 0]}>
        <torusGeometry args={[0.38, 0.025, 14, 96]} />
        <meshStandardMaterial color="#f5d9c2" metalness={0.12} roughness={0.26} />
      </mesh>

      <mesh position={[0, -2.13, 0]}>
        <cylinderGeometry args={[0.84, 0.88, 0.16, 128]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.14}
          transmission={0.72}
          thickness={0.6}
          transparent
          opacity={0.46}
        />
      </mesh>

      <BottleLabel />
      <BottleHighlights />
    </group>
  );
}

function BottleLabel() {
  return (
    <group position={[0, -0.45, 0]}>
      <mesh>
        <cylinderGeometry args={[0.914, 0.914, 1.67, 96, 1, true, -0.72, 1.44]} />
        <meshBasicMaterial
          color="#ffe0ee"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.918, 0.918, 1.51, 96, 1, true, -0.62, 1.24]} />
        <meshBasicMaterial
          color="#fff4f9"
          transparent
          opacity={0.58}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.47, 0.922]}>
        <torusGeometry args={[0.24, 0.014, 12, 72]} />
        <meshBasicMaterial color="#4f2a44" />
      </mesh>
      <mesh position={[0, 0.47, 0.93]}>
        <torusGeometry args={[0.16, 0.018, 12, 72]} />
        <meshBasicMaterial color="#b99cff" />
      </mesh>
      <mesh position={[0, 0.47, 0.938]}>
        <circleGeometry args={[0.09, 48]} />
        <meshBasicMaterial color="#ff008f" />
      </mesh>
      <Text
        position={[0, 0.04, 0.944]}
        fontSize={0.18}
        letterSpacing={0.045}
        color="#4f2a44"
        anchorX="center"
        anchorY="middle"
      >
        TSUKERKY
      </Text>
      <Text
        position={[0, -0.23, 0.944]}
        fontSize={0.055}
        letterSpacing={0.08}
        color="#45303f"
        anchorX="center"
        anchorY="middle"
      >
        HECHO CON VODKA
      </Text>
      <Text
        position={[0, -0.45, 0.944]}
        fontSize={0.115}
        letterSpacing={0.02}
        color="#c60072"
        anchorX="center"
        anchorY="middle"
      >
        Chicle Rosa
      </Text>
      <Text
        position={[0, -0.66, 0.944]}
        fontSize={0.05}
        letterSpacing={0.08}
        color="#72546a"
        anchorX="center"
        anchorY="middle"
      >
        10 VECES FILTRADO / 30% ALC. VOL
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
