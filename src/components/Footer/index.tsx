import { useState, useEffect } from "react";
import styles from "./style.module.css";

export default function Footer() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.left}>
          <p className={styles.creator}>Created By: Jimmy Lam</p>
        </div>
        <div className={styles.right}>
          <p className={styles.current_time}>{currentTime}</p>
        </div>
      </footer>
    </>
  );
}