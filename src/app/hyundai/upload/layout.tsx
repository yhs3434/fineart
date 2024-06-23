import React from "react";
import styles from "./layout.module.scss";
import Link from "next/link";
import { Button, Box } from "@mui/material";
import { TabNavigator } from "@/components/organisms/TabNavigator";

export default function HyundaiUploadLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "2em",
                gap: "2em",
            }}
        >
            <nav className={styles.navigation}>
                <Link href="/">
                    <Button>PREV</Button>
                </Link>
                <Link href="/hyundai/edit">
                    <Button>NEXT</Button>
                </Link>
            </nav>
            <p>Paste PDF text following guides.</p>
            <TabNavigator />
            <Box
                sx={{
                    flex: 1,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
