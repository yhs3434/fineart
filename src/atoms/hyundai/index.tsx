import { CloseOutlined } from '@mui/icons-material';
import { Typography, IconButton, Box } from '@mui/material';
import {atomWithStorage, atomFamily} from 'jotai/utils'
import { ReactNode } from 'react';

interface Info {
    key: string;
    label: string;
    value: string;
}

interface Spec {
    key: string;
    title: string;
    content: string;
}

interface Package {
    key: string;
    title: string;
    price: string;
}

interface Accesory {
    key: string;
    title: string;
    price: string;
}

const defaultValueOfInfosAtom = [
    {
        key: "g1",
        label: "구분1",
        value: "",
    },
    {
        key: "g2",
        label: "구분2",
        value: "",
    },
    {
        key: "p1",
        label: "판매가격1",
        value: "",
    },
    {
        key: "p2",
        label: "판매가격2",
        value: "",
    },
]
const infosAtom = (tabId: string) => atomWithStorage<Info[]>(`infosAtom-${tabId}`, defaultValueOfInfosAtom)
export const infosAtomFamily = atomFamily((tabId: string) => infosAtom(tabId))

const defaultValueOfSpecsAtom = [
    {
        key: "s0",
        title: "",
        content: "",
    },
    {
        key: "s1",
        title: "",
        content: "",
    },
    {
        key: "s2",
        title: "",
        content: "",
    },
    {
        key: "s3",
        title: "",
        content: "",
    },
    {
        key: "s4",
        title: "",
        content: "",
    },
]
const specsAtom = (tabId: string) => atomWithStorage<Spec[]>(`specsAtom-${tabId}`, defaultValueOfSpecsAtom)
export const specsAtomFamily = atomFamily((tabId: string) => specsAtom(tabId))

const defaultValueOfPackagesAtom = [
    {
        key: "p0",
        title: "",
        price: "",
    },
    {
        key: "p1",
        title: "",
        price: "",
    },
    {
        key: "p2",
        title: "",
        price: "",
    },
]
const packagesAtom = (tabId: string) => atomWithStorage<Package[]>(`packagesAtom-${tabId}`, defaultValueOfPackagesAtom)
export const packagesAtomFamily = atomFamily((tabId: string) => packagesAtom(tabId));

const defaultValueOfAccesoriesAtom = [
    {
        key: "a0",
        title: "",
        price: "",
    },
    {
        key: "a1",
        title: "",
        price: "",
    },
    {
        key: "a2",
        title: "",
        price: "",
    },
]
const accesoriesAtom = (tabId: string) => atomWithStorage<Accesory[]>(`accesoriesAtom-${tabId}`, defaultValueOfAccesoriesAtom)
export const accesoriesAtomFamily = atomFamily((tabId: string) => accesoriesAtom(tabId))

interface UploadTab {
    key: string;
    title: string;
    value: string
}

const defaultValueOfUploadTabsAtom = [
    {
        key: "trim00",
        title: '트림1',
        value: "/hyundai/upload/trim/0",
    },
    {
        key: "trim01",
        title: '트림2'
        ,
        value: "/hyundai/upload/trim/1",
    },
    {
        key: "trim02",
        title:  '트림3'
        ,
        value: "/hyundai/upload/trim/2",
    },
]
export const uploadTabsAtom = atomWithStorage<UploadTab[]>(`uploadTabsAtom`, defaultValueOfUploadTabsAtom);