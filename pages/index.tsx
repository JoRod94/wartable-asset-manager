import type { NextPage } from "next";
import Head from "next/head";
import { getAssets, newS3Client } from "../api/s3";
import AssetBrowser from "../components/AssetBrowser";
import styles from "../styles/Home.module.css";
import { S3Asset } from "../types";

type Props = {
  assets: S3Asset[];
};

const Home: NextPage<Props> = ({ assets }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Wartable</h1>
        <h2>Asset Manager</h2>
        <button
          onClick={() => {
            window.alert("New Asset");
          }}
        >
          New Asset
        </button>
        <AssetBrowser assets={assets} />
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const client = newS3Client();

  const assets = await getAssets(client);

  return {
    props: {
      assets,
    },
  };
};
