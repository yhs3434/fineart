import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    Container,
    Box,
    CssBaseline,
} from "@mui/material";
import { Css, Menu as MenuIcon } from "@mui/icons-material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Fineart Compare Program",
    description: "Kim Jaewon",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <AppRouterCacheProvider>
                    <>
                        <CssBaseline />
                        <AppBar
                            position="absolute"
                            sx={{
                                zIndex: 10000,
                            }}
                        >
                            <Toolbar>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ flexGrow: 1 }}
                                >
                                    Typography
                                </Typography>
                                <Button color="inherit">Login</Button>
                            </Toolbar>
                        </AppBar>
                        <Drawer open={false} anchor="left">
                            <div>test</div>
                        </Drawer>
                        <main>{children}</main>
                    </>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
