import Image from "next/image";
import styles from "./page.module.css";
import { Typography, Container, Button } from "@mui/material";

export default function Home() {
    return (
        <main className={styles.main}>
            <Typography>
                Which car brand you want to make price list?
            </Typography>
            <Container>
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
            </Container>
        </main>
    );
}
