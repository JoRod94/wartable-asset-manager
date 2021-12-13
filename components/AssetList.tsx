import { Asset } from "../types";
import styles from "../styles/AssetList.module.css";
import { Dispatch, memo, SetStateAction } from "react";

type Props = {
  assets: Asset[];
  selectAsset: (assetName: string) => void;
};

const AssetList: React.FC<Props> = ({ assets, selectAsset }) => (
  <div className={styles.container}>
    <ul>
      {assets.map((item) => (
        <li key={item.uri}>
          <div
            className={styles.assetListItem}
            onClick={() => selectAsset(item.name)}
          >
            <b>{item.name}</b>
            {item.size} MB
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default memo(AssetList);
