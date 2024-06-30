"use client";

import React from "react";
import {
    Box,
    Drawer,
    IconButton,
    AppBar,
    Toolbar,
    Container,
    Typography,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";
import { Css, Menu as MenuIcon } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useRouter } from "next/navigation";

type AppLayoutProps = React.PropsWithChildren<{
    //
}>;

export function AppLayout({ children }: AppLayoutProps) {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

    const toggleDrawerOpen = React.useCallback(() => {
        setIsDrawerOpen((prev) => !prev);
    }, []);

    const openDrawer = React.useCallback(() => {
        setIsDrawerOpen(true);
    }, []);

    const closeDrawer = React.useCallback(() => {
        setIsDrawerOpen(false);
    }, []);

    return (
        <Container sx={{ flex: 1, flexDirection: "column" }}>
            <AppBar
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
                        onClick={() => toggleDrawerOpen()}
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
            <Drawer
                sx={{ flex: 1, flexDirection: "column" }}
                open={isDrawerOpen}
                anchor="left"
                onClose={() => closeDrawer()}
            >
                <DrawerList toggleDrawer={toggleDrawerOpen} />
            </Drawer>
            {children}
        </Container>
    );
}

const DrawerList = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
    const router = useRouter();

    const drawerItems = React.useMemo(() => {
        return [
            {
                key: "home",
                active: false,
                title: "Home",
                onPress: () => {
                    router.push("/");
                },
            },
            {
                key: "hyundai",
                active: false,
                title: "Hyundai",
                onPress: () => {
                    router.push("/hyundai/upload/trim/0");
                },
            },
            {
                key: "kia",
                active: false,
                title: "Kia",
                onPress: () => {
                    router.push("/kia/upload/trim/0");
                },
            },
            {
                key: "history",
                active: false,
                title: "History",
                onPress: () => {
                    router.push("/history");
                },
            },
        ];
    }, []);

    return (
        <Box
            sx={{ width: 250, paddingTop: "64px" }}
            role="presentation"
            onClick={() => toggleDrawer()}
        >
            <List>
                {drawerItems.map((drawerItem) => (
                    <ListItem key={drawerItem.key} disablePadding>
                        <ListItemButton onClick={drawerItem.onPress}>
                            <ListItemText primary={drawerItem.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
