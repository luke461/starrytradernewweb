"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { WebGLRenderer, BufferGeometry, Texture } from "three";
import { PhoneMockup } from "./PhoneMockup";
import { PhoneScreenshot } from "./PhoneScreenshot";

type Props = {
  /** Texture URL drawn onto the phone screen. If absent, a procedural watchlist placeholder is rendered. */
  screenshot?: string;
  /** Aria label used by the static fallback. The 3D wrapper itself is aria-hidden (decorative). */
  ariaLabel?: string;
  /** Static fallback node when WebGL is unavailable or three fails to load. Defaults to <PhoneMockup>. */
  fallback?: ReactNode;
  bodyColor?: number;
  scrollSpinSpeed?: number;
  floatAmplitude?: number;
  floatSpeed?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableDrag?: boolean;
  baseTilt?: { x: number; y: number; z: number };
};

/**
 * Three.js phone mockup. Floats, auto-rotates, spins as the page scrolls past
 * the hero, draggable, soft floor shadow. Lazy-loads three so the SSR bundle
 * stays slim, pauses its render loop when offscreen, and gracefully falls
 * back to the static <PhoneMockup> when WebGL is missing or the import fails.
 */
export function Phone3D({
  screenshot,
  ariaLabel = "StarryTrader app phone mockup",
  fallback,
  bodyColor = 0x1c1c22,
  scrollSpinSpeed = 0.003,
  floatAmplitude = 0.12,
  floatSpeed = 0.8,
  autoRotate = true,
  autoRotateSpeed = 0.15,
  enableDrag = true,
  baseTilt = { x: -0.08, y: -0.45, z: 0.12 },
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);

  const baseTiltX = baseTilt.x;
  const baseTiltY = baseTilt.y;
  const baseTiltZ = baseTilt.z;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let probe: HTMLCanvasElement | null = null;
    let gl: WebGLRenderingContext | null = null;
    try {
      probe = document.createElement("canvas");
      gl = (probe.getContext("webgl") || probe.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }
    if (!gl) {
      setFailed(true);
      return;
    }

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch (err) {
        console.error("[Phone3D] Failed to load three:", err);
        if (!cancelled) setFailed(true);
        return;
      }
      if (cancelled) return;

      const getSize = () => ({
        w: container.clientWidth || 1,
        h: container.clientHeight || container.clientWidth || 1,
      });
      const size = getSize();

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(28, size.w / size.h, 0.1, 100);
      camera.position.set(0, 0.4, 11);
      camera.lookAt(0, 0, 0);

      let renderer: WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch (err) {
        console.error("[Phone3D] WebGLRenderer construction failed:", err);
        if (!cancelled) setFailed(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(size.w, size.h);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.style.display = "block";
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      const key = new THREE.DirectionalLight(0xffffff, 1.1);
      key.position.set(4, 6, 5);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0x9bb8ff, 0.45);
      fill.position.set(-5, 2, 3);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0xffd9b0, 0.6);
      rim.position.set(-3, 4, -4);
      scene.add(rim);

      const makeRoundedRectShape = (w: number, h: number, r: number) => {
        const s = new THREE.Shape();
        s.moveTo(-w / 2 + r, -h / 2);
        s.lineTo(w / 2 - r, -h / 2);
        s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
        s.lineTo(w / 2, h / 2 - r);
        s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
        s.lineTo(-w / 2 + r, h / 2);
        s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
        s.lineTo(-w / 2, -h / 2 + r);
        s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
        return s;
      };

      const makePhoneBody = (w: number, h: number, depth: number, cornerR: number) => {
        const shape = makeRoundedRectShape(w, h, cornerR);
        const geo = new THREE.ExtrudeGeometry(shape, {
          depth,
          bevelEnabled: true,
          bevelThickness: 0.04,
          bevelSize: 0.04,
          bevelSegments: 6,
          curveSegments: 12,
        });
        geo.translate(0, 0, -depth / 2);
        return geo;
      };

      const makePlaceholderScreenTexture = () => {
        const c = document.createElement("canvas");
        c.width = 540;
        c.height = 1170;
        const ctx = c.getContext("2d")!;
        const g = ctx.createLinearGradient(0, 0, 0, c.height);
        g.addColorStop(0, "#0b0d22");
        g.addColorStop(1, "#1a0e3a");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = "#fff";
        ctx.font = "600 28px system-ui";
        ctx.fillText("9:41", 38, 60);
        ctx.font = "700 44px system-ui";
        ctx.fillText("StarryTrader", 38, 230);
        const tex = new THREE.CanvasTexture(c);
        tex.anisotropy = 16;
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
      };

      const disposables: { dispose: () => void }[] = [];

      let screenTex: Texture;
      if (screenshot) {
        const loader = new THREE.TextureLoader();
        screenTex = loader.load(screenshot);
        screenTex.anisotropy = 16;
        screenTex.colorSpace = THREE.SRGBColorSpace;
      } else {
        screenTex = makePlaceholderScreenTexture();
      }
      disposables.push(screenTex);

      const phone = new THREE.Group();

      const bodyMat = new THREE.MeshStandardMaterial({ color: bodyColor, metalness: 0.85, roughness: 0.3 });
      disposables.push(bodyMat);
      const bodyGeo = makePhoneBody(1.7, 3.5, 0.18, 0.22);
      disposables.push(bodyGeo);
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      phone.add(body);

      const screenMat = new THREE.MeshStandardMaterial({
        map: screenTex,
        emissive: 0xffffff,
        emissiveMap: screenTex,
        emissiveIntensity: 0.9,
        metalness: 0,
        roughness: 0.2,
      });
      disposables.push(screenMat);
      const screenW = 1.55;
      const screenH = 3.35;
      const screenGeo = new THREE.ShapeGeometry(makeRoundedRectShape(screenW, screenH, 0.18));
      // ShapeGeometry uses raw vertex coords as UVs; remap to [0,1] across the screen.
      const posAttr = screenGeo.attributes.position;
      const uvs = new Float32Array(posAttr.count * 2);
      for (let i = 0; i < posAttr.count; i++) {
        uvs[i * 2] = (posAttr.getX(i) + screenW / 2) / screenW;
        uvs[i * 2 + 1] = (posAttr.getY(i) + screenH / 2) / screenH;
      }
      screenGeo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
      disposables.push(screenGeo);
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.z = 0.135;
      phone.add(screen);

      const islandGeo: BufferGeometry = THREE.CapsuleGeometry
        ? new THREE.CapsuleGeometry(0.045, 0.18, 4, 16)
        : new THREE.CylinderGeometry(0.045, 0.045, 0.27, 16);
      disposables.push(islandGeo);
      const islandMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
      disposables.push(islandMat);
      const island = new THREE.Mesh(islandGeo, islandMat);
      island.rotation.z = Math.PI / 2;
      island.position.set(0, 1.5, 0.14);
      phone.add(island);

      const camBumpMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0e, metalness: 0.8, roughness: 0.25 });
      disposables.push(camBumpMat);
      const camBumpGeo = new THREE.ExtrudeGeometry(makeRoundedRectShape(0.55, 0.55, 0.12), {
        depth: 0.04,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.01,
        bevelSegments: 3,
      });
      camBumpGeo.translate(0, 0, -0.04);
      disposables.push(camBumpGeo);
      const camBump = new THREE.Mesh(camBumpGeo, camBumpMat);
      camBump.position.set(-0.45, 1.0, -0.13);
      camBump.rotation.y = Math.PI;
      phone.add(camBump);

      const lensMat = new THREE.MeshStandardMaterial({ color: 0x111119, metalness: 1, roughness: 0.1 });
      disposables.push(lensMat);
      const lensGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.08, 24);
      disposables.push(lensGeo);
      const lensPositions: Array<[number, number]> = [
        [-0.55, 1.1],
        [-0.35, 1.1],
        [-0.45, 0.85],
      ];
      for (const [lx, ly] of lensPositions) {
        const lens = new THREE.Mesh(lensGeo, lensMat);
        lens.rotation.x = Math.PI / 2;
        lens.position.set(lx, ly, -0.16);
        phone.add(lens);
      }

      const buttonMat = new THREE.MeshStandardMaterial({ color: 0x18181c, metalness: 0.9, roughness: 0.3 });
      disposables.push(buttonMat);
      const powerGeo = new THREE.BoxGeometry(0.025, 0.32, 0.06);
      disposables.push(powerGeo);
      const power = new THREE.Mesh(powerGeo, buttonMat);
      power.position.set(0.86, 0.5, 0);
      phone.add(power);
      const volGeo = new THREE.BoxGeometry(0.025, 0.18, 0.06);
      disposables.push(volGeo);
      const volUp = new THREE.Mesh(volGeo, buttonMat);
      volUp.position.set(-0.86, 0.7, 0);
      phone.add(volUp);
      const volDn = new THREE.Mesh(volGeo, buttonMat);
      volDn.position.set(-0.86, 0.45, 0);
      phone.add(volDn);

      phone.rotation.x = baseTiltX;
      phone.rotation.y = baseTiltY;
      phone.rotation.z = baseTiltZ;
      scene.add(phone);

      const reduceMotion =
        typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const useFloat = !reduceMotion;
      const useAuto = autoRotate && !reduceMotion;

      let baseRotY = baseTiltY;
      let baseRotX = baseTiltX;
      let dragRotY = 0;
      let dragRotX = 0;
      let dragging = false;
      let dragStartX = 0;
      let dragStartY = 0;

      const onPointerDown = (e: PointerEvent) => {
        dragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        container.style.cursor = "grabbing";
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!dragging) return;
        dragRotY = (e.clientX - dragStartX) * 0.008;
        dragRotX = (e.clientY - dragStartY) * 0.005;
      };
      const onPointerUp = () => {
        if (!dragging) return;
        baseRotY += dragRotY;
        baseRotX += dragRotX;
        dragRotY = 0;
        dragRotX = 0;
        dragging = false;
        container.style.cursor = "grab";
      };
      if (enableDrag) {
        container.style.cursor = "grab";
        container.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
      }

      let scrollSpin = 0;
      const onScroll = () => {
        const rect = container.getBoundingClientRect();
        scrollSpin = -rect.top * scrollSpinSpeed;
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) visible = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      io.observe(container);

      const ro = new ResizeObserver(() => {
        const s = getSize();
        camera.aspect = s.w / s.h;
        camera.updateProjectionMatrix();
        renderer.setSize(s.w, s.h);
      });
      ro.observe(container);

      const startTime = performance.now();
      let raf = 0;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        const t = (performance.now() - startTime) / 1000;
        const floatY = useFloat ? Math.sin(t * floatSpeed) * floatAmplitude : 0;
        phone.position.y = floatY;
        const auto = useAuto ? t * autoRotateSpeed : 0;
        phone.rotation.y =
          baseRotY + dragRotY + scrollSpin + auto + (useFloat ? Math.sin(t * 0.4) * 0.03 : 0);
        phone.rotation.x = baseRotX + dragRotX;
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("scroll", onScroll);
        if (enableDrag) {
          container.removeEventListener("pointerdown", onPointerDown);
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onPointerUp);
        }
        for (const d of disposables) d.dispose();
        renderer.dispose();
        if (renderer.domElement.parentElement === container) {
          container.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, [
    screenshot,
    bodyColor,
    scrollSpinSpeed,
    floatAmplitude,
    floatSpeed,
    autoRotate,
    autoRotateSpeed,
    enableDrag,
    baseTiltX,
    baseTiltY,
    baseTiltZ,
  ]);

  if (failed) {
    return (
      <>
        {fallback ?? (
          <PhoneMockup ariaLabel={ariaLabel} bezel="glass">
            {screenshot ? <PhoneScreenshot src={screenshot} alt={ariaLabel} priority /> : null}
          </PhoneMockup>
        )}
      </>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative mx-auto aspect-[9/22] w-[300px] sm:w-[340px] lg:w-[380px]"
    />
  );
}
