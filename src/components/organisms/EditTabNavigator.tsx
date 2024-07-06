"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Tabs, Tab, Box } from "@mui/material";

export const EditTabNavigator = () => {
    const router = useRouter();
    const pathname = usePathname();

    const TAB_LIST = React.useMemo(() => {
        return [
            {
                key: "trim00",
                title: "트림 1",
                value: "/hyundai/edit/tabs/0",
            },
            {
                key: "trim01",
                title: "트림 2",
                value: "/hyundai/edit/tabs/1",
            },
            {
                key: "trim02",
                title: "트림 3",
                value: "/hyundai/edit/tabs/2",
            },
        ];
    }, []);

    const handleChange = React.useCallback(
        (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
            router.push(newValue);
        },
        [router]
    );

    return (
        <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={pathname} onChange={handleChange} centered>
                {TAB_LIST.map((tab) => (
                    <Tab key={tab.key} label={tab.title} value={tab.value} />
                ))}
            </Tabs>
        </Box>
    );
};
