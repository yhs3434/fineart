'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Tabs, Tab, Box, IconButton, Typography } from '@mui/material';
import { uploadTabsAtom } from '@/atoms/hyundai';
import { useAtom } from 'jotai';
import styles from './UploadTabNavigator.module.scss';
import {
  AddCircleOutline,
  AddOutlined,
  CloseOutlined,
  InsertEmoticon,
  PlusOne,
} from '@mui/icons-material';

export const UploadTabNavigator = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [tabs, setTabs] = useAtom(uploadTabsAtom);

  const handleChange = React.useCallback(
    (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
      if (newValue === 'add') {
        setTabs((prev) => {
          const lastKey = prev[prev.length - 1].key;
          const lastNumber = parseInt(lastKey.replace('trim', ''), 10);

          const newItem = {
            key: `trim${String(lastNumber + 1).padStart(2, '0')}`,
            title: `트림 ${lastNumber + 2}`,
            value: `/hyundai/upload/trim/${lastNumber + 1}`,
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
            value={tab.value}
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
