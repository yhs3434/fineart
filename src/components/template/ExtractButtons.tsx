'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import qs from 'qs';
import { type RequestParam } from '@/app/apis/hyundai/export/route';
import type { Info, Spec, Package, Accesory } from '@/atoms/hyundai';

export function ExtractButtons() {
  const getRequestParams: () => RequestParam[] = React.useCallback(() => {
    const tabs: { key: string; title: string }[] = JSON.parse(
      window.localStorage.getItem('uploadTabsAtom') ?? '[]',
    );

    const tabKeys = tabs.map((x) => x.key?.slice(5) ?? '');

    return (
      tabKeys.map((tabKey: string) => {
        const currentInfos: Info[] = JSON.parse(
          window.localStorage.getItem(`infosAtom-${tabKey}`) ?? '[]',
        );
        const currentSpecs: Omit<Spec, 'key'>[] = JSON.parse(
          window.localStorage.getItem(`specsAtom-${tabKey}`) ?? '[]',
        );
        const currentPackages: Omit<Package, 'key'>[] = JSON.parse(
          window.localStorage.getItem(`packagesAtom-${tabKey}`) ?? '[]',
        );
        const currentAccesories: Omit<Accesory, 'key'>[] = JSON.parse(
          window.localStorage.getItem(`accesoriesAtom-${tabKey}`) ?? '[]',
        );

        return {
          category: {
            name0: currentInfos.find((x) => x.key === 'g1')?.value ?? '',
            name1: currentInfos.find((x) => x.key === 'g2')?.value,
            price0: currentInfos.find((x) => x.key === 'p1')?.value ?? '0',
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
            ...(currentAccesories.map((x) => ({
              title: x.title,
              price: x.price,
            })) ?? []),
          ],
        };
      }) ?? []
    );
  }, []);

  const handleExcelButtonPress = React.useCallback(async () => {
    const requestParams = getRequestParams();

    const response = await axios(
      `/apis/hyundai/export?${qs.stringify({
        type: 'excel',
      })}`,
      {
        method: 'post',
        data: JSON.stringify(requestParams),
      },
    );

    console.log('d response', response);
  }, [getRequestParams]);

  const handleHTMLButtonPress = React.useCallback(async () => {
    const requestParams = getRequestParams();

    const response = await axios(
      `/apis/hyundai/export?${qs.stringify({
        type: 'html',
      })}`,
      {
        method: 'post',
        data: JSON.stringify(requestParams),
      },
    );
  }, [getRequestParams]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
      }}
    >
      <Button variant="contained" onClick={handleExcelButtonPress}>
        EXPORT TO EXCEL
      </Button>
      <Button variant="contained" onClick={handleHTMLButtonPress}>
        EXPORT TO HTML
      </Button>
    </Box>
  );
}
