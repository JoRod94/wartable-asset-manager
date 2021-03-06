import { BufferGeometry } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

export const asyncLoad = (loader: STLLoader, name: string) => {
  return new Promise((resolve, reject) => {
    loader.load(
      name,
      (object: BufferGeometry) => {
        resolve(object);
      },
      (loadingInfo: any) => {
        console.log(
          `Loading ${name}: ${(loadingInfo.loaded / loadingInfo.total) * 100} %`
        );
      },
      (error: any) => {
        console.log(`Error loading ${name}:`, error);
        reject(error);
      }
    );
  });
};

export const sizeInMB = (size?: number) => {
  const mbSize = size ? size / 1000000 : 0;
  return Math.round(mbSize * 100) / 100;
};
