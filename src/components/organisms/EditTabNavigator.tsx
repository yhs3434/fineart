'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Tabs, Tab, Box } from '@mui/material';
import { uploadTabsAtom } from '@/atoms/hyundai';
import { useAtom } from 'jotai';

export const EditTabNavigator = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [tabs, setTabs] = useAtom(uploadTabsAtom);

  const handleChange = React.useCallback(
    (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
      router.push(newValue);
    },
    [router],
  );

  const handleRemove = React.useCallback(() => {
    //
  }, []);

  return (
    <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={pathname} onChange={handleChange} centered>
        {tabs.map((tab) => (
          <Tab key={tab.key} label={tab.title} value={tab.value} />
        ))}
      </Tabs>
    </Box>
  );
};
