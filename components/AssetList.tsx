import { S3Asset } from "../types";
import styles from "../styles/AssetList.module.css";

type Props = {
  assets: S3Asset[];
};

const AssetList: React.FC<Props> = ({ assets }) => (
  <div className={styles.container}>
    <ul>
      {assets.map((item) => (
        <li>
          <div className={styles.assetListItem} onClick={() => {}}>
            <b>{item.name}</b>
            {item.size} MB
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default AssetList;
