import React from 'react';
import styles from './page.module.scss';
import Link from 'next/link';
import { Container, Box, Button } from '@mui/material';
import { ExtractButtons } from '@/components/template/ExtractButtons';

export default function HyundaiExtractPage() {
  return (
    <Container
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
        <Link href="/hyundai/edit">
          <Button>PREV</Button>
        </Link>
      </nav>
      <p>Choose what you want to extract.</p>
      <Box
        sx={{
          marginBottom: '2em',
        }}
      />
      <ExtractButtons />
    </Container>
  );
}
