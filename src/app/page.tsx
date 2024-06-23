import Image from "next/image";
import styles from "./page.module.css";
import { Typography, Container, Button, Box } from "@mui/material";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Home() {
    return (
        <section className={styles.container}>
            <p className={styles.message}>
                Which car brand you want to make price list?
            </p>
            <div>
                <Link href="/hyundai/upload/trim/0">
                    <Image
                        src="/assets/images/hyundai_logo.png"
                        alt="hyundai"
                        width={240}
                        height={153}
                    />
                </Link>

                <Link href="/kia/upload/trim1">
                    <Image
                        src="/assets/images/kia_logo.png"
                        alt="kia"
                        width={240}
                        height={153}
                    />
                </Link>
            </div>
        </section>
    );
}
