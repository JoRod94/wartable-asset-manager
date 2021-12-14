import { useEffect, useState } from "react";
import { asyncLoad } from "../utils";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { BufferGeometry } from "three";
import { Asset, GeometryRecord } from "../types";

const useSTLManager = (assets: Array<Asset>, pendingUpload?: string) => {
  const [loadedGeometries, setLoadedGeometries] = useState<GeometryRecord>({});

  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      setHasLoaded(false);
      const loader = new STLLoader();
      const result: GeometryRecord = { ...loadedGeometries };

      for (let i = 0; i < assets.length; i++) {
        const placedAssetName = assets[i].name;
        if (!result[placedAssetName]) {
          try {
            const asset = assets!.find((a) => a.name == placedAssetName);

            if (!asset) throw "Could not find asset";

            result[placedAssetName] = (await asyncLoad(
              loader,
              asset.uri
            )) as BufferGeometry;
          } catch (e) {
            console.error("Failed asset load. Please check your asset list.");
          }
        }
      }

      if (pendingUpload) {
        const loadedFile = (await asyncLoad(
          loader,
          pendingUpload
        )) as BufferGeometry;

        result["pendingUpload"] = loadedFile;
      }

      setLoadedGeometries(result);
      setHasLoaded(true);
    };
    assets && load();
  }, [JSON.stringify(assets), pendingUpload]);

  return {
    loadedGeometries,
    hasLoaded,
  };
};

export default useSTLManager;
