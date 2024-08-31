import { CloseOutlined } from '@mui/icons-material';
import { Typography, IconButton, Box } from '@mui/material';
import { atomWithStorage, atomFamily } from 'jotai/utils';
import { ReactNode } from 'react';
import { v4 } from 'uuid';

export interface Info {
  key: string;
  label: string;
  value: string;
}

export interface Spec {
  key: string;
  title: string;
  content: string;
}

export interface Package {
  key: string;
  title: string;
  price: string;
}

export interface Accesory {
  key: string;
  title: string;
  price: string;
}

const defaultValueOfInfosAtom = [
  {
    key: 'g1',
    label: '구분1',
    value: '',
  },
  {
    key: 'g2',
    label: '구분2',
    value: '',
  },
  {
    key: 'p1',
    label: '판매가격1',
    value: '',
  },
  {
    key: 'p2',
    label: '판매가격2',
    value: '',
  },
];
const infosAtom = (tabId: string) =>
  atomWithStorage<Info[]>(`infosAtom-${tabId}`, defaultValueOfInfosAtom);
export const infosAtomFamily = atomFamily((tabId: string) => infosAtom(tabId));

const defaultValueOfSpecsAtom = [
  {
    key: `spec_${v4()}`,
    title: '',
    content: '',
  },
];
const specsAtom = (tabId: string) =>
  atomWithStorage<Spec[]>(`specsAtom-${tabId}`, defaultValueOfSpecsAtom);
export const specsAtomFamily = atomFamily((tabId: string) => specsAtom(tabId));

const defaultValueOfPackagesAtom = [
  {
    key: `package_${v4()}`,
    title: '',
    price: '',
  },
];
const packagesAtom = (tabId: string) =>
  atomWithStorage<Package[]>(
    `packagesAtom-${tabId}`,
    defaultValueOfPackagesAtom,
  );
export const packagesAtomFamily = atomFamily((tabId: string) =>
  packagesAtom(tabId),
);

const defaultValueOfAccesoriesAtom = [
  {
    key: `accesory_${v4()}`,
    title: '',
    price: '',
  },
];
const accesoriesAtom = (tabId: string) =>
  atomWithStorage<Accesory[]>(
    `accesoriesAtom-${tabId}`,
    defaultValueOfAccesoriesAtom,
  );
export const accesoriesAtomFamily = atomFamily((tabId: string) =>
  accesoriesAtom(tabId),
);

interface UploadTab {
  key: string;
  title: string;
}

const defaultValueOfUploadTabsAtom = (function () {
  const newKey = v4();

  return [
    {
      key: `trim_${newKey}`,
      title: `트림 ${newKey.slice(0, 4)}`,
    },
  ];
})();

export const uploadTabsAtom = atomWithStorage<UploadTab[]>(
  `uploadTabsAtom`,
  defaultValueOfUploadTabsAtom,
);
