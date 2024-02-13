import Image from "next/image";
import styles from './style.module.css'
import { CardProps } from "../../../typings";

const Card: React.FC<CardProps> = ({
    date,
    temperature,
    description,
    iconSrc,
    windSpeed,
}) => {
    return(
        <div className={styles.card}>
            <p className={styles.date}>{date}</p>
            <p className={styles.temperature}>{temperature.toFixed(1)}°C</p>
            <Image src={iconSrc} alt="weather-icon" height={50} width={60} />
            <p className={styles.description}>{description}</p>
            <p style={{ fontSize:"12px" }}>Wind Speed: {windSpeed}</p>
        </div>
    )
}

export default Card;