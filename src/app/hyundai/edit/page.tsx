'use client';

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

interface Column {
  key: 'category' | 'basic_items' | 'optional_items';
  label: string;
}

interface Row {
  category: {
    name0: string;
    name1: string;
    price0: number;
    price1: number;
  };
  basic_items: {
    title: string;
    content: string;
  }[];
  optional_items: {
    title: string;
    price: number;
  }[];
}

export default function HyundaiEditLayout() {
  const columns: readonly Column[] = [
    {
      key: 'category',
      label: '구분',
    },
    {
      key: 'basic_items',
      label: '기본 품목',
    },
    {
      key: 'optional_items',
      label: '선택 품목',
    },
  ];

  const rows = React.useMemo(() => {
    const tabs: { key: string; title: string }[] = JSON.parse(
      window.localStorage.getItem('uploadTabsAtom') ?? '[]',
    );
    const tabKeys = tabs.map((x) => x.key?.slice(5) ?? '');
    return tabKeys.map((tabKey: string) => {
      const currentInfos: any[] = JSON.parse(
        window.localStorage.getItem(`infosAtom-${tabKey}`) ?? '[]',
      );
      const currentSpecs: any[] = JSON.parse(
        window.localStorage.getItem(`specsAtom-${tabKey}`) ?? '[]',
      );
      const currentPackages: any[] = JSON.parse(
        window.localStorage.getItem(`packagesAtom-${tabKey}`) ?? '[]',
      );
      const currentAccesories: any[] = JSON.parse(
        window.localStorage.getItem(`accesoriesAtom-${tabKey}`) ?? '[]',
      );

      return {
        category: {
          name0: currentInfos.find((x) => x.key === 'g1')?.value,
          name1: currentInfos.find((x) => x.key === 'g2')?.value,
          price0: currentInfos.find((x) => x.key === 'p1')?.value,
          price1: currentInfos.find((x) => x.key === 'p2')?.value,
        },
        basic_items:
          currentSpecs.map((x) => ({
            title: x.title,
            content: x.content,
          })) ?? [],
        optional_items: [
          ...(currentPackages.map((x) => ({
            title: x.title,
            price: x.price,
          })) ?? []),
          ...currentAccesories.map((x) => ({
            title: x.title,
            price: x.price,
          })),
        ],
      };
    });
  }, []);

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
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell
                    key={column.key}
                    align="left"
                    sx={{
                      backgroundColor: '#D9D9D9',
                    }}
                  >
                    {column.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => {
              return (
                <TableRow key={`${row.category.name0}_${row.category.name1}`}>
                  <TableCell width="20%">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1em',
                      }}
                    >
                      <Typography>{row.category.name0}</Typography>
                      <Typography>{row.category.name1}</Typography>
                      <Typography>{row.category.price0}</Typography>
                      <Typography>{row.category.price1}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1em',
                      }}
                    >
                      {row.basic_items.map((basic_item) => (
                        <Box
                          key={basic_item.title}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5em',
                          }}
                        >
                          <Typography>{`- ${basic_item.title}:`}</Typography>
                          <Typography>{`${basic_item.content}`}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell width="25%">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1em',
                      }}
                    >
                      {row.optional_items.map((optional_item) => (
                        <Box
                          key={optional_item.title}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5em',
                          }}
                        >
                          <Typography>{`▶ ${optional_item.title}`}</Typography>
                          <Typography>{`[${optional_item.price}]`}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
