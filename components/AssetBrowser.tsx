import { S3Asset } from "../types";
import AssetList from "./AssetList";
import AssetViewer from "./AssetViewer";
import styles from "../styles/AssetBrowser.module.css";

type Props = {
  assets: S3Asset[];
};

const AssetBrowser: React.FC<Props> = ({ assets }) => (
  <div className={styles.container}>
    <AssetList assets={assets} />
    <AssetViewer />
  </div>
);

export default AssetBrowser;
