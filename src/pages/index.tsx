import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

//COMPONENTS
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>CastSeven</title>
        <meta name="description" content="OpenWeatherAPI Weather Buddy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/cloud-icon.svg" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.content_container}>
        <div className={styles.header_text}>
          <h1 className={styles.header}>CastSeven</h1>
          <Image className={styles.cloud_icon} src={"/icons/cloud-icon.svg"} alt={"cloud-icon"} width={60} height={60} />
        </div>
        <div className={styles.caption_text}>
          <p className={styles.caption}>Search a city to see a weather breakdown</p>
          <Link href="/WeatherPage">
            <button className={styles.button}>Begin</button>
          </Link>
        </div>
        </div>
      </main>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
}
