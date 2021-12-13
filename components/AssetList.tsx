import { S3Asset } from "../types";

type Props = {
  assets: S3Asset[];
};

const AssetList: React.FC<Props> = ({ assets }) => (
  <div>
    <p>{JSON.stringify(assets)}</p>
  </div>
);

export default AssetList;
