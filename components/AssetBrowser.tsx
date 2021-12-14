import { Asset } from "../types";
import AssetList from "./AssetList";
import AssetViewer from "./AssetViewer";
import styles from "../styles/AssetBrowser.module.css";
import { memo, useEffect, useState } from "react";
import useSTLManager from "../hooks/useSTLManager";
import { sizeInMB } from "../utils";

type Props = {
  assets: Asset[];
  pendingUpload?: File;
};

const AssetBrowser: React.FC<Props> = ({ assets, pendingUpload }) => {
  const [selectedAsset, setSelectedAsset] = useState<string>();
  const [assetsToLoad, setAssetsToLoad] = useState<Asset[]>([]);
  const [pendingUploadURI, setPendingUploadURI] = useState<string>();
  const { loadedGeometries, hasLoaded } = useSTLManager(
    assetsToLoad,
    pendingUploadURI
  );

  useEffect(() => {
    if (pendingUpload) {
      setPendingUploadURI(URL.createObjectURL(pendingUpload));
    }
  }, [pendingUpload]);

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
      {pendingUpload ? (
        <div className={styles.confirmUpload}>
          <h3>Upload details</h3>
          <form onSubmit={() => {}} />
          <p>
            <b>Size: </b>
            {`${sizeInMB(pendingUpload.size)} MB`}
          </p>
          <label htmlFor="upload-name">Asset Name</label>
          <input id="upload-name" type="text" required></input>
          <button type="submit">Confirm</button>
        </div>
      ) : (
        <AssetList
          assets={assets}
          selectAsset={selectAsset}
          selectedAsset={selectedAsset}
        />
      )}
      {hasLoaded && (
        <AssetViewer
          isLoading={!hasLoaded}
          geometry={
            pendingUpload
              ? loadedGeometries["pendingUpload"]
              : selectedAsset
              ? loadedGeometries[selectedAsset]
              : undefined
          }
        />
      )}
    </div>
  );
};

export default memo(AssetBrowser);
