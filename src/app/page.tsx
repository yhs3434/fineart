import Image from "next/image";
import styles from "./page.module.css";
import { Typography, Container, Button, Box } from "@mui/material";

export default function Home() {
    return (
        <section className={styles.container}>
            <p className={styles.message}>
                Which car brand you want to make price list?
            </p>
            <div>
                <Button
                    startIcon={
                        <Image
                            src="/assets/images/hyundai_logo.png"
                            alt="hyundai"
                            width={240}
                            height={153}
                        />
                    }
                />
                <Button
                    startIcon={
                        <Image
                            src="/assets/images/kia_logo.png"
                            alt="kia"
                            width={240}
                            height={153}
                        />
                    }
                />
            </div>
        </section>
    );
}
