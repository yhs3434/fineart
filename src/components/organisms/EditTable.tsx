'use client';

import React from 'react';
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

export function EditTable() {
  const [windowLocalStorage, setWindowLocalStorage] =
    React.useState<Storage | null>(null);

  React.useEffect(() => {
    setWindowLocalStorage(window.localStorage);
  }, []);

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
      windowLocalStorage?.getItem('uploadTabsAtom') ?? '[]',
    );

    const tabKeys = tabs.map((x) => x.key?.slice(5) ?? '');
    return tabKeys.map((tabKey: string) => {
      const currentInfos: any[] = JSON.parse(
        windowLocalStorage?.getItem(`infosAtom-${tabKey}`) ?? '[]',
      );
      const currentSpecs: any[] = JSON.parse(
        windowLocalStorage?.getItem(`specsAtom-${tabKey}`) ?? '[]',
      );
      const currentPackages: any[] = JSON.parse(
        windowLocalStorage?.getItem(`packagesAtom-${tabKey}`) ?? '[]',
      );
      const currentAccesories: any[] = JSON.parse(
        windowLocalStorage?.getItem(`accesoriesAtom-${tabKey}`) ?? '[]',
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
  }, [windowLocalStorage]);

  return (
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
  );
}
