import { Canvas } from "@react-three/fiber";
import { memo } from "react";
import { BufferGeometry, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils";
import styles from "../styles/AssetViewer.module.css";
import { Asset } from "../types";
import CameraControls from "./CameraControls";

type Props = {
  geometry?: BufferGeometry;
  isLoading: boolean;
};

const AssetViewer: React.FC<Props> = ({ isLoading, geometry }) => {
  if (!geometry) {
    return (
      <div className={styles.container}>
        <h2 className={styles.loading}>
          {isLoading ? "Loading..." : "Select an asset"}
        </h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Canvas
        camera={{
          position: [0, 30, 100],
          far: 5000,
        }}
        id="three-canvas"
      >
        <directionalLight args={["#ffffff", 1]} position={[100, 100, 100]} />
        <CameraControls />
        <mesh visible rotation={[-Math.PI * 0.5, 0, 0]}>
          <primitive attach="geometry" object={geometry} />
          <meshPhongMaterial attach="material" color="#ffffff" />
        </mesh>
      </Canvas>
    </div>
  );
};

export default memo(AssetViewer);
