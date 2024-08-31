import { NextRequest, NextResponse } from 'next/server';
import { splitSpec } from '@/utils/string';
import XLSX from 'xlsx';

export interface RequestQueries {
  type: 'excel' | 'html';
}

export interface RequestParam {
  category: {
    name0: string;
    name1: string | undefined;
    price0: string;
    price1: string | undefined;
  };
  basic_items: {
    title: string;
    content: string;
  }[];
  optional_items: {
    title: string;
    price: string;
  }[];
}

export type ResponseData = string[][];

const exportToExcel = (params: RequestParam[]): ResponseData => {
  const data: ResponseData = [['트림', '대분류', '사양']];

  params?.forEach((param) => {
    const category = param?.category ?? {};
    const basic_items = param?.basic_items ?? [];
    const optional_items = param?.optional_items ?? [];

    basic_items.forEach((item) => {
      const title = item?.title ?? '';
      const contents = splitSpec(item?.content ?? '') ?? [];

      contents.forEach((content) => {
        data.push([category.name0, title, content]);
      });
    });

    optional_items.forEach((item) => {
      const title = item?.title ?? '';
      const price = item?.price ?? '';
    });
  });

  return data;
};

const exportToHTML = (params: RequestParam[]) => {
  params?.forEach((param) => {
    const category = param?.category ?? {};
    const basic_items = param?.basic_items ?? [];
    const optional_items = param?.optional_items ?? [];

    basic_items.forEach((item) => {
      const title = item?.title ?? '';
      const contents = splitSpec(item?.content ?? '') ?? [];

      contents.forEach((content) => {
        //
      });
    });

    optional_items.forEach((item) => {
      const title = item?.title ?? '';
      const price = item?.price ?? '';
    });
  });
};

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') as RequestQueries['type'];

  const body: RequestParam[] = await request.json();

  switch (type) {
    case 'excel':
      const data = exportToExcel(body);
      return NextResponse.json<ResponseData>(data);
    case 'html':
      // data = exportToHTML(body);
      break;
  }
}
