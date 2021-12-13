import { Asset, GeometryRecord } from "../types";
import AssetList from "./AssetList";
import AssetViewer from "./AssetViewer";
import styles from "../styles/AssetBrowser.module.css";
import { memo, useState } from "react";

type Props = {
  assets: Asset[];
  loadedGeometries: GeometryRecord;
};

const AssetBrowser: React.FC<Props> = ({ assets }) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset>();

  return (
    <div className={styles.container}>
      <AssetList assets={assets} selectAsset={setSelectedAsset} />
      <AssetViewer
        assetToShow={assets.find((a) => a.name == selectedAsset?.name)}
      />
    </div>
  );
};

export default memo(AssetBrowser);
