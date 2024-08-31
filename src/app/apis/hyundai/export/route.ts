import { NextRequest, NextResponse } from 'next/server';

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

export interface ResponseData {
  type: RequestQueries['type'];
}

const exportToExcel = (params: RequestParam[]): ResponseData => {
  console.log('d params', params);

  const data: ResponseData = {
    type: 'excel',
  };

  return data;
};

const exportToHTML = (params: RequestParam[]): ResponseData => {
  const data: ResponseData = {
    type: 'html',
  };

  return data;
};

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') as RequestQueries['type'];

  const body: RequestParam[] = await request.json();

  let data: ResponseData;
  switch (type) {
    case 'excel':
      data = exportToExcel(body);
      break;
    case 'html':
      data = exportToHTML(body);
      break;
  }

  return NextResponse.json<ResponseData>(data);
}
