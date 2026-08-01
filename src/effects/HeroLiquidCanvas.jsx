import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform vec2 uCenter;
  uniform vec2 uShift;
  uniform float uTime;
  uniform float uProgress;

  varying vec2 vUv;

  vec2 coverUv(vec2 uv, vec2 resolution, vec2 imageResolution) {
    float screenRatio = resolution.x / resolution.y;
    float imageRatio = imageResolution.x / imageResolution.y;

    vec2 result = uv;

    if (screenRatio < imageRatio) {
      float scale = screenRatio / imageRatio;
      result.x = uv.x * scale + (1.0 - scale) * 0.5;
    } else {
      float scale = imageRatio / screenRatio;
      result.y = uv.y * scale + (1.0 - scale) * 0.5;
    }

    return result;
  }

  float grain(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 screenUv = vUv;
    vec2 imageUv = coverUv(vUv, uResolution, uImageResolution);

    imageUv += uShift;

    vec2 fromCenter = screenUv - uCenter;
    float dist = length(fromCenter);
    vec2 dir = normalize(fromCenter + 0.0001);

    float intro = 1.0 - uProgress;

    /*
      水面そのものの歪み。
      線を描くのではなく、画像のサンプリング位置だけを揺らす。
      この構造が一番滑らかなので、ここは触らない。
    */
    float softArea = smoothstep(0.98, 0.08, dist);
    float waveA = sin(dist * 34.0 - uTime * 5.6);
    float waveB = sin((screenUv.x * 18.0 + screenUv.y * 11.0) + uTime * 2.2);
    float waveC = cos((screenUv.y * 28.0 - screenUv.x * 9.0) - uTime * 2.7);

    float wave = waveA * 0.58 + waveB * 0.26 + waveC * 0.16;
    float amp = intro * intro * 0.032 * softArea;

    vec2 offset = dir * wave * amp;
    offset.x += sin(screenUv.y * 42.0 + uTime * 2.1) * amp * 0.22;
    offset.y += cos(screenUv.x * 36.0 - uTime * 1.8) * amp * 0.16;

    vec2 uv = clamp(imageUv + offset, vec2(0.001), vec2(0.999));

    vec4 tex = texture2D(uTexture, uv);

    /*
      MIZATO用の暗さ・琥珀寄せ。
      写真をそのまま出さず、黒に沈める。
    */
    tex.rgb *= 0.68;

    float luma = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    tex.rgb = mix(vec3(luma), tex.rgb, 0.84);

    /*
      琥珀の波紋発光。
      動きの滑らかさは残しつつ、ぼわぼわ見える光だけ弱める。
      0.025だと少し見えすぎるので、0.012に抑える。
    */
    vec3 amber = vec3(0.95, 0.58, 0.24);
    tex.rgb += amber * intro * softArea * max(waveA, 0.0) * 0.012;

    float vignette = smoothstep(0.96, 0.18, length(screenUv - vec2(0.5)));
    tex.rgb *= mix(0.58, 1.0, vignette);

    float g = grain(screenUv * uResolution + uTime);
    tex.rgb += (g - 0.5) * 0.018;

    float fade = smoothstep(0.0, 0.72, uProgress);
    float alpha = 0.76 * fade;

    gl_FragColor = vec4(tex.rgb, alpha);
  }
`;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function HeroLiquidCanvas({ image, className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let frameId = null;
    let renderer = null;
    let scene = null;
    let camera = null;
    let texture = null;
    let geometry = null;
    let material = null;
    let mesh = null;
    let startedAt = 0;
    let stopped = false;

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setClearColor(0x050403, 0);

    if ("outputColorSpace" in renderer) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }

    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTexture: { value: null },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uImageResolution: { value: new THREE.Vector2(1, 1) },
      uCenter: { value: new THREE.Vector2(0.58, 0.45) },
      uShift: { value: new THREE.Vector2(0.07, -0.005) },
      uTime: { value: 0 },
      uProgress: { value: 0 },
    };

    const setSize = () => {
      if (!mount || !renderer) return;

      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);

      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);

      if (width <= 640) {
        uniforms.uCenter.value.set(0.5, 0.46);
        uniforms.uShift.value.set(0.02, -0.005);
      } else if (width <= 900) {
        uniforms.uCenter.value.set(0.5, 0.45);
        uniforms.uShift.value.set(0.045, -0.005);
      } else {
        uniforms.uCenter.value.set(0.58, 0.45);
        uniforms.uShift.value.set(0.07, -0.005);
      }

      if (mesh && stopped) {
        renderer.render(scene, camera);
      }
    };

    const render = () => {
      if (!renderer || !scene || !camera) return;
      renderer.render(scene, camera);
    };

    const animate = (now) => {
      if (disposed || !mesh) return;

      const elapsed = (now - startedAt) / 1000;
      const rawProgress = Math.min(elapsed / 2.25, 1);

      uniforms.uTime.value = elapsed;
      uniforms.uProgress.value = easeOutCubic(rawProgress);

      render();

      if (rawProgress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        stopped = true;
        uniforms.uProgress.value = 1;
        render();
      }
    };

    const loader = new THREE.TextureLoader();

    loader.load(image, (loadedTexture) => {
      if (disposed) {
        loadedTexture.dispose();
        return;
      }

      texture = loadedTexture;

      if ("colorSpace" in texture) {
        texture.colorSpace = THREE.SRGBColorSpace;
      }

      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      const img = texture.image;

      uniforms.uTexture.value = texture;
      uniforms.uImageResolution.value.set(
        img?.naturalWidth || img?.width || 1,
        img?.naturalHeight || img?.height || 1
      );

      geometry = new THREE.PlaneGeometry(2, 2);

      material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      setSize();

      if (reduceMotion) {
        uniforms.uProgress.value = 1;
        uniforms.uTime.value = 0;
        stopped = true;
        render();
        return;
      }

      startedAt = performance.now();
      frameId = requestAnimationFrame(animate);
    });

    window.addEventListener("resize", setSize);

    return () => {
      disposed = true;

      window.removeEventListener("resize", setSize);

      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      if (mesh && scene) {
        scene.remove(mesh);
      }

      geometry?.dispose();
      material?.dispose();
      texture?.dispose();

      if (renderer) {
        renderer.dispose();

        if (renderer.domElement?.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, [image]);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}