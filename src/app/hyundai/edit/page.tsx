import React from 'react';
import styles from './page.module.scss';
import Link from 'next/link';
import {
  Button,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';
import { EditTable } from '@/components/organisms/EditTable';

export default function HyundaiEditLayout() {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2em',
        gap: '2em',
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
      <p>Check the errors.</p>
      <EditTable />
    </Box>
  );
}
