"use client";

import React from "react";
import { Container, Box, TextField, Typography, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {useAtom} from 'jotai'
import {infosAtomFamily, specsAtomFamily, packagesAtomFamily, accesoriesAtomFamily} from '@/atoms/hyundai/index'

export default function UploadTrimPage({
    params,
}: {
    params: { index: string };
}) {
    const [infos, setInfos] = useAtom(infosAtomFamily(params.index))
    const [specs, setSpecs] = useAtom(specsAtomFamily(params.index));
    const [packages, setPackages] = useAtom(packagesAtomFamily(params.index));
    const [accesories, setAccesories] = useAtom(accesoriesAtomFamily(params.index));

    const handleSpecAddButtonPress = React.useCallback(() => {
        setSpecs((prev) => {
            const lastItem = prev?.[prev.length - 1];
            const lastItemKey = lastItem.key;
            const nextKeyNumber = parseInt(lastItemKey.slice(1)) + 1;
            const nextKey = `s${nextKeyNumber}`;

            return [
                ...prev,
                {
                    key: nextKey,
                    title: "",
                    content: "",
                },
            ];
        });
    }, []);

    const handlePackageAddButtonPress = React.useCallback(() => {
        setPackages((prev) => {
            const lastItem = prev?.[prev.length - 1];
            const lastItemKey = lastItem.key;
            const nextKeyNumber = parseInt(lastItemKey.slice(1)) + 1;
            const nextKey = `s${nextKeyNumber}`;

            return [
                ...prev,
                {
                    key: nextKey,
                    title: "",
                    price: "",
                },
            ];
        });
    }, []);



    const handleAccesoryAddButtonPress = React.useCallback(() => {
        setAccesories((prev) => {
            const lastItem = prev?.[prev.length - 1];
            const lastItemKey = lastItem.key;
            const nextKeyNumber = parseInt(lastItemKey.slice(1)) + 1;
            const nextKey = `s${nextKeyNumber}`;

            return [
                ...prev,
                {
                    key: nextKey,
                    title: "",
                    price: "",
                },
            ];
        });
    }, []);

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "60px",
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {infos.map((info) => {
                    return (
                        <Box
                            key={info.key}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "20px",
                                alignItems: "center",
                            }}
                        >
                            <Typography width={80} fontWeight={600}>
                                {info.label}
                            </Typography>
                            <TextField
                                sx={{ flex: 1 }}
                                size="small"
                                value={info.value}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    const targetValue = event.target.value;

                                    setInfos((prev) => {
                                        const currentIdx = prev.findIndex(
                                            (item) => item.key === info.key
                                        );

                                        return [
                                            ...prev.slice(0, currentIdx),
                                            {
                                                key: info.key,
                                                label: info.label,
                                                value: targetValue
                                            },
                                            ...prev.slice(currentIdx + 1, prev.length)
                                        ]
                                    });
                                }}
                            />
                        </Box>
                    );
                })}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 4,
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 20,
                            fontWeight: "600",
                        }}
                    >
                        SPEC
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                        }}
                    >
                        {specs.map((spec) => {
                            return (
                                <Box
                                    key={spec.key}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                    }}
                                >
                                    <TextField
                                        placeholder="텍스트를 입력 해주세요"
                                        size="small"
                                        value={spec.title}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            const targetValue =
                                                event.target.value;

                                            setSpecs(prev =>{
                                                const currentIdx = prev.findIndex(x => 
                                                    x.key === spec.key
                                                )

                                                return [
                                                    ...prev.slice(0, currentIdx),
                                                    {
                                                        ...prev[currentIdx],
                                                        title: targetValue
                                                    },
                                                    ...prev.slice(currentIdx + 1, prev.length)
                                                ]
                                            })
                                        }}
                                    />
                                    <TextField
                                        placeholder="텍스트를 입력 해주세요"
                                        size="small"
                                        multiline
                                        value={spec.content}
                                        rows={4}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            const targetValue =
                                                event.target.value;

                                            setSpecs(prev =>{
                                                const currentIdx = prev.findIndex(x => 
                                                    x.key === spec.key
                                                )

                                                return [
                                                    ...prev.slice(0, currentIdx),
                                                    {
                                                        ...prev[currentIdx],
                                                        content: targetValue
                                                    },
                                                    ...prev.slice(currentIdx + 1, prev.length)
                                                ]
                                            })
                                        }}
                                    />
                                </Box>
                            );
                        })}
                    </Box>
                    <Button onClick={handleSpecAddButtonPress}>
                        <AddCircleOutlineIcon color="action" />
                    </Button>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 20,
                                fontWeight: "600",
                            }}
                        >
                            PACKAGE
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                            }}
                        >
                            {packages.map((_package) => {
                                return (
                                    <Box
                                        key={_package.key}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1,
                                        }}
                                    >
                                        <TextField
                                            placeholder="패키지명"
                                            size="small"
                                            value={_package.title}
                                            onChange={(
                                                event: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                const targetValue =
                                                    event.target.value;

                                                    setPackages(prev =>{
                                                        const currentIdx = prev.findIndex(x => 
                                                            x.key === _package.key
                                                        )
        
                                                        return [
                                                            ...prev.slice(0, currentIdx),
                                                            {
                                                                ...prev[currentIdx],
                                                                title: targetValue
                                                            },
                                                            ...prev.slice(currentIdx + 1, prev.length)
                                                        ]
                                                    })
                                            }}
                                        />
                                        <TextField
                                            placeholder="가격"
                                            size="small"
                                            value={_package.price}
                                            onChange={(
                                                event: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                const targetValue =
                                                    event.target.value;

                                                    setPackages(prev =>{
                                                        const currentIdx = prev.findIndex(x => 
                                                            x.key === _package.key
                                                        )
        
                                                        return [
                                                            ...prev.slice(0, currentIdx),
                                                            {
                                                                ...prev[currentIdx],
                                                                price: targetValue
                                                            },
                                                            ...prev.slice(currentIdx + 1, prev.length)
                                                        ]
                                                    })
                                            }}
                                        />
                                    </Box>
                                );
                            })}
                        </Box>
                        <Button onClick={handlePackageAddButtonPress}>
                            <AddCircleOutlineIcon color="action" />
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 20,
                                fontWeight: "600",
                            }}
                        >
                            H GENUINE ACCESORIES
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                            }}
                        >
                            {accesories.map((accesory) => {
                                return (
                                    <Box
                                        key={accesory.key}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 1,
                                        }}
                                    >
                                        <TextField
                                            placeholder="패키지명"
                                            size="small"
                                            value={accesory.title}
                                            onChange={(
                                                event: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                const targetValue =
                                                    event.target.value;

                                                    setAccesories(prev =>{
                                                        const currentIdx = prev.findIndex(x => 
                                                            x.key === accesory.key
                                                        )
        
                                                        return [
                                                            ...prev.slice(0, currentIdx),
                                                            {
                                                                ...prev[currentIdx],
                                                                title: targetValue
                                                            },
                                                            ...prev.slice(currentIdx + 1, prev.length)
                                                        ]
                                                    })
                                            }}
                                        />
                                        <TextField
                                            placeholder="가격"
                                            size="small"
                                            value={accesory.price}
                                            onChange={(
                                                event: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                const targetValue =
                                                    event.target.value;

                                                    setAccesories(prev =>{
                                                        const currentIdx = prev.findIndex(x => 
                                                            x.key === accesory.key
                                                        )
        
                                                        return [
                                                            ...prev.slice(0, currentIdx),
                                                            {
                                                                ...prev[currentIdx],
                                                                price: targetValue
                                                            },
                                                            ...prev.slice(currentIdx + 1, prev.length)
                                                        ]
                                                    })
                                            }}
                                        />
                                    </Box>
                                );
                            })}
                        </Box>
                        <Button onClick={handleAccesoryAddButtonPress}>
                            <AddCircleOutlineIcon color="action" />
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
