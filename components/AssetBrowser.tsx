import { Asset, GeometryRecord } from "../types";
import AssetList from "./AssetList";
import AssetViewer from "./AssetViewer";
import styles from "../styles/AssetBrowser.module.css";
import { memo, useState } from "react";
import useSTLManager from "../hooks/useSTLManager";

type Props = {
  assets: Asset[];
};

const AssetBrowser: React.FC<Props> = ({ assets }) => {
  const [selectedAsset, setSelectedAsset] = useState<string>();
  const [assetsToLoad, setAssetsToLoad] = useState<Asset[]>([]);
  const { loadedGeometries, hasLoaded } = useSTLManager(assetsToLoad);

  const selectAsset = (assetName: string) => {
    const loadedGeometry = loadedGeometries[assetName];
    const asset = assets.find((a) => a.name == assetName);

    if (!asset) {
      return;
    }

    if (!loadedGeometry) {
      setAssetsToLoad((prev) => [...prev, asset]);
    }
    setSelectedAsset(assetName);
  };

  return (
    <div className={styles.container}>
      <AssetList assets={assets} selectAsset={selectAsset} />
      {hasLoaded && (
        <AssetViewer
          isLoading={!hasLoaded}
          geometry={selectedAsset ? loadedGeometries[selectedAsset] : undefined}
        />
      )}
    </div>
  );
};

export default memo(AssetBrowser);
