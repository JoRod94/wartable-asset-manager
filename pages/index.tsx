import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { getAssets, newS3Client } from "../api/s3";
import AssetBrowser from "../components/AssetBrowser";
import FileUploader from "../components/FileUploader";
import styles from "../styles/Home.module.css";
import { Asset } from "../types";

type Props = {
  fetchedAssets: Asset[];
};

const Home: NextPage<Props> = ({ fetchedAssets }) => {
  const [pendingUpload, setPendingUpload] = useState<File | undefined>();
  const [assets, setAssets] = useState<Asset[]>(fetchedAssets);
  return (
    <div className={styles.container}>
      <Head>
        <title>Wartable Asset Manager</title>
        <meta name="description" content="Manage Wartable STL assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.topInfo}>
          <h1>Wartable</h1>
          <div className={styles.subRow}>
            {" "}
            <h2>Asset Manager</h2>
            <FileUploader
              setPendingUpload={setPendingUpload}
              pendingUpload={pendingUpload}
            />
          </div>
        </div>
        <AssetBrowser
          assets={assets}
          setAssets={setAssets}
          pendingUpload={pendingUpload}
          setPendingUpload={setPendingUpload}
        />
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const client = newS3Client();

  const fetchedAssets = await getAssets(client);

  return {
    props: {
      fetchedAssets,
    },
  };
};
