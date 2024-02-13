import styles from "../styles/Home.module.css";
import Link from "next/link";

//COMPONENTS
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Weather from "@/components/Weather";

export default function WeatherPage() {
  return (
    <>
      <Header />
      <Link style={{ marginLeft: "2em", marginTop: "1.5em", fontWeight: 200, textDecoration: "none", color:"#000", }} href={"/"}>&#x2039;back</Link>
      <main className={styles.main}>
        <div>
          <Weather />
        </div>
      </main>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
}
