import React from 'react'
import styles from './layout.module.scss'
import Link from "next/link";
import { Button, Box } from "@mui/material";
import { EditTabNavigator } from "@/components/organisms/EditTabNavigator";

export default function HyundaiEditLayout(
    {
    children
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
                <Link href="/hyundai/upload/trim/0">
                    <Button>PREV</Button>
                </Link>
                <Link href="/hyundai/extract">
                    <Button>NEXT</Button>
                </Link>
            </nav>
            <p>Choose what you want to extract.</p>
            <EditTabNavigator />
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
    )    
}