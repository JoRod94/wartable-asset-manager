import React, { useEffect, useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";

extend({ OrbitControls });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const controls = useRef();
  // @ts-ignore
  useFrame((_) => controls.current.update());

  useEffect(() => {
    // @ts-ignore no types
    controls.current!.target.set(0, 20, 0);
  }, []);
  // this is super weird, but the ts-ignore comment can't be inside the return "()"
  const controlsComponent = (
    // @ts-ignore a lil' hack
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableDamping
      enablePan
      screenSpacePanning={false}
      maxDistance={800}
      mouseButtons={{
        MIDDLE: THREE.MOUSE.PAN,
        LEFT: THREE.MOUSE.ROTATE,
        RIGHT: THREE.MOUSE.ROTATE,
      }}
      keys={{
        LEFT: 65, //left arrow
        UP: 87, // up arrow
        RIGHT: 68, // right arrow
        BOTTOM: 83, // down arrow
      }}
    />
  );
  return controlsComponent;
};

export default CameraControls;
