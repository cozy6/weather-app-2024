import Head from "next/head";
import styles from "./style.module.css";

export default function Header() {
  return (
    <>
      <Head>
        <title>CastSeven</title>
        <meta name="description" content="OpenWeatherAPI Weather Buddy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/cloud-icon.svg" />
      </Head>
      <div className={styles.animated_header}>
        <h2 className={styles.text}>Don't let the weather surpise you! Check with CastSeven</h2>
      </div>
    </>
  );
}
