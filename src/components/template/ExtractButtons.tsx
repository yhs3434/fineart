'use client'

import React from 'react'
import {Box, Button} from '@mui/material'

export function ExtractButtons() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '60%',
            justifyContent: 'space-between'
        }}>
            <Button variant='contained'>EXPORT TO EXCEL</Button>
            <Button variant="contained">EXPORT TO HTML</Button>
        </Box>
    )
}