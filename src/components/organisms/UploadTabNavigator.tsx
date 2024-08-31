'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Tabs, Tab, Box, IconButton, Typography } from '@mui/material';
import {
  uploadTabsAtom,
  infosAtomFamily,
  specsAtomFamily,
  packagesAtomFamily,
  accesoriesAtomFamily,
} from '@/atoms/hyundai';
import { useAtom, useSetAtom } from 'jotai';
import styles from './UploadTabNavigator.module.scss';
import {
  AddCircleOutline,
  AddOutlined,
  CloseOutlined,
  InsertEmoticon,
  PlusOne,
} from '@mui/icons-material';
import { v4 } from 'uuid';

export const UploadTabNavigator = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [tabs, setTabs] = useAtom(uploadTabsAtom);

  const handleChange = React.useCallback(
    (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
      if (newValue === 'add') {
        setTabs((prev) => {
          const newKey = v4();

          const newItem = {
            key: `trim_${newKey}`,
            title: `트림 ${newKey.slice(0, 4)}`,
          };

          return [...prev, newItem];
        });
      } else {
        router.push(newValue);
      }
    },
    [router],
  );

  const handleRemove = React.useCallback((key: string) => {
    setTabs((prev) => {
      const removeIdx = prev.findIndex((tab) => tab.key === key);

      const infoKey = `infosAtom-${key}`;
      const specKey = `specsAtom-${key}`;
      const packageKey = `packagesAtom-${key}`;
      const accesoryKey = `accesoriesAtom-${key}`;

      localStorage.removeItem(infoKey);
      localStorage.removeItem(specKey);
      localStorage.removeItem(packageKey);
      localStorage.removeItem(accesoryKey);

      return [
        ...prev.slice(0, removeIdx),
        ...prev.slice(removeIdx + 1, prev.length),
      ];
    });
  }, []);

  return (
    <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={pathname} onChange={handleChange} centered>
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            className={styles.tab}
            label={
              <span>
                {tab.title}
                <IconButton
                  className={styles['close-btn']}
                  sx={{
                    marginLeft: '10px',
                    width: '16px',
                    height: '16px',
                  }}
                  onClick={() => handleRemove(tab.key)}
                >
                  <CloseOutlined
                    sx={{
                      width: '16px',
                      height: '16px',
                    }}
                  />
                </IconButton>
              </span>
            }
            value={`/hyundai/upload/trim/${tab?.key?.slice(5)}`}
          />
        ))}
        <Tab
          key={'add'}
          label={
            <IconButton>
              <AddOutlined
                sx={{
                  width: '16px',
                  height: '16px',
                }}
              />
            </IconButton>
          }
          value="add"
        />
      </Tabs>
    </Box>
  );
};
