import styles from "../styles/AssetViewer.module.css";
import { Asset } from "../types";

type Props = {
  assetToShow?: Asset;
};

const AssetViewer: React.FC<Props> = ({ assetToShow }) => {
  return <div className={styles.container}>{JSON.stringify(assetToShow)}</div>;
};

export default AssetViewer;
