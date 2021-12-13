import { Asset } from "../types";
import styles from "../styles/AssetList.module.css";
import { Dispatch, SetStateAction } from "react";

type Props = {
  assets: Asset[];
  selectAsset: Dispatch<SetStateAction<Asset | undefined>>;
};

const AssetList: React.FC<Props> = ({ assets, selectAsset }) => (
  <div className={styles.container}>
    <ul>
      {assets.map((item) => (
        <li>
          <div
            className={styles.assetListItem}
            onClick={() => selectAsset(assets.find((a) => a.name == item.name))}
          >
            <b>{item.name}</b>
            {item.size} MB
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default AssetList;
