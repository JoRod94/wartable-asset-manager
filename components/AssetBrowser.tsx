import { S3Asset } from "../types";
import AssetList from "./AssetList";
import AssetViewer from "./AssetViewer";

type Props = {
  assets: S3Asset[];
};

const AssetBrowser: React.FC<Props> = ({ assets }) => (
  <div className="asset-browser">
    <AssetList assets={assets} />
    <AssetViewer />
  </div>
);

export default AssetBrowser;
