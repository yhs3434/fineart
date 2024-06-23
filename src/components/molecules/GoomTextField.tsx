import React from "react";
import { Box, Typography, TextField } from "@mui/material";

type GoomTextFieldProps = {
    label?: string;
};

export const GoomTextField = ({ label }: GoomTextFieldProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
            }}
        >
            <Typography>{label}</Typography>
            <TextField />
        </Box>
    );
};
