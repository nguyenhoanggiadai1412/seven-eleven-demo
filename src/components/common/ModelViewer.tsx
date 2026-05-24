import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import * as THREE from "three";

type ModelViewerProps = {
  modelUrl: string;
};

// Component model có auto-scale + center
function Model({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    clone.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 1.5 / maxDim;

    clone.scale.setScalar(scale);

    return clone;
  }, [scene])

   return <primitive object={clonedScene} />;
}

export default function ModelViewer({ modelUrl }: ModelViewerProps) {
  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
      {/* Ánh sáng */}
      <ambientLight intensity={2} />
      <directionalLight position={[2, 4, 5]} intensity={1} />

      {/* Suspense để chờ model load */}
      <Suspense fallback={null}>
        <Model modelUrl={modelUrl} />
      </Suspense>

      {/* Điều khiển xoay camera */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={8}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
