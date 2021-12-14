import { Asset } from "../types";
import AssetList from "./AssetList";
import AssetViewer from "./AssetViewer";
import styles from "../styles/AssetBrowser.module.css";
import { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import useSTLManager from "../hooks/useSTLManager";
import { sizeInMB } from "../utils";
import { useS3Upload } from "next-s3-upload";

type Props = {
  assets: Asset[];
  pendingUpload?: File;
  setAssets: Dispatch<SetStateAction<Asset[]>>;
  setPendingUpload: Dispatch<SetStateAction<File | undefined>>;
};

const AssetBrowser: React.FC<Props> = ({
  assets,
  setAssets,
  pendingUpload,
  setPendingUpload,
}) => {
  const [selectedAsset, setSelectedAsset] = useState<string>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [assetsToLoad, setAssetsToLoad] = useState<Asset[]>([]);
  const [pendingUploadURI, setPendingUploadURI] = useState<string>();
  const { loadedGeometries, hasLoaded } = useSTLManager(
    assetsToLoad,
    pendingUploadURI
  );
  const { uploadToS3 } = useS3Upload();

  useEffect(() => {
    if (pendingUpload) {
      setPendingUploadURI(URL.createObjectURL(pendingUpload));
    }
  }, [pendingUpload]);

  const selectAsset = (assetName: string, overrideAsset?: Asset) => {
    const loadedGeometry = loadedGeometries[assetName];
    const asset = overrideAsset || assets.find((a) => a.name == assetName);

    if (!asset) {
      return;
    }

    if (!loadedGeometry) {
      setAssetsToLoad((prev) => [...prev, asset]);
    }
    setSelectedAsset(assetName);
  };

  const upload = async (name: string) => {
    if (!pendingUpload || assets.find((a) => a.name == name)) {
      return;
    }

    const renamedFile = new File([pendingUpload], name + ".stl", {
      type: pendingUpload.type,
    });
    setUploading(true);
    const result = await uploadToS3(renamedFile);
    const asset = {
      uri: result.url,
      name: name,
      size: sizeInMB(renamedFile.size),
    };
    setAssets((prev) =>
      [...prev, asset].sort((a, b) => (a.name > b.name ? 1 : -1))
    );
    selectAsset(name, asset);
    setPendingUpload(undefined);
    setUploading(false);
  };

  return (
    <div className={styles.container}>
      {pendingUpload ? (
        <div className={styles.confirmUpload}>
          <h3>Upload details</h3>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              //@ts-ignore
              upload(e.target.filename.value);
            }}
          >
            <p>
              <b>Size: </b>
              {`${sizeInMB(pendingUpload.size)} MB`}
            </p>
            <label htmlFor="upload-name">Asset Name</label>
            <input
              id="upload-name"
              type="text"
              name="filename"
              required
            ></input>
            <button type="submit" disabled={uploading}>
              Confirm
            </button>
          </form>
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
