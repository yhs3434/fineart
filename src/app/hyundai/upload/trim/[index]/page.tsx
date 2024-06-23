import React from "react";
import { Box, TextField } from "@mui/material";
import { GoomTextField } from "@/components/molecules/GoomTextField";

export default function UploadTrimPage({
    params,
}: {
    params: { index: string };
}) {
    return (
        <Box
            sx={{
                flex: 1,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <GoomTextField label="구분1" />
            <GoomTextField label="구분2" />
            <GoomTextField label="판매가격1" />
            <GoomTextField label="판매가격2" />
        </Box>
    );
}
