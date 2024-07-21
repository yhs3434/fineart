import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { AppLayout } from "@/components/template/AppLayout";
import {Provider} from 'jotai'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Fineart Compare Program",
    description: "Kim Jaewon",
};

function RootLayout({
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
                        <AppLayout>
                            <Box
                                sx={{
                                    flex: 1,
                                    flexDirection: "column",
                                    paddingTop: "64px",
                                }}
                            >
                                {children}
                            </Box>
                        </AppLayout>
                    </>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}

export default function App({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <Provider>
            <RootLayout>
                {children}
            </RootLayout>
        </Provider>
    )
}