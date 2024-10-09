import { NextRequest, NextResponse } from 'next/server';
import { splitSpec } from '@/utils/string';
import Handlebars from 'handlebars';

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

export type ResponseData = string[][] | string;

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
  let pcSource =
    "<div class='table-wrap'>" +
    '<!-- 가격표 테이블 -->' +
    "<table id='price-table' class='table'>" +
    '<caption>__NAME__ 가격표 - 각 모델별 트림, 기본품목, 선택품목/H Genuine Accessories 설명과 가격정보 제공</caption>' +
    "<colgroup><col width='19%'><col width='53%'><col width='28%'></colgroup>" +
    '<thead><tr>' +
    "<th scope='row' align='center'>트림 / 가격</th>" +
    "<th scope='row' align='center'>기본품목</th>" +
    "<th scope='row' align='center'>선택품목<span class='pop-hide'>/ H Genuine Accessories</span></th>" +
    '</tr></thead>' +
    '<tbody>' +
    '{{#trims}}' +
    "<!-- {{trim_title}} Trim(data-trim='트림명') -->" +
    "<tr data-trim='{{trim_title}}'>" +
    "<th scope='col' align='center'>" +
    "<div class='table-price-title'>" +
    "<p class='title'>" +
    "<span class='price'>" +
    '{{price}}' +
    '</span>' +
    '</p>' +
    '</div>' +
    '</th>' +
    "<td scope='col' style='vertical-align: top;'>" +
    "<div class='table-between-default'>" +
    "<span class='default-name'>" +
    'dummy 함께 제공됩니다' +
    '</span>' +
    "<div class='view-default'>" +
    "<label for='check-{{trim_title}}' class='chk'>" +
    "<input id='check-{{trim_title}}' type='checkbox' name='check-{{trim_title}}'>" +
    '<span>' +
    '{{trim_title}} dummy 전체품목 보기' +
    '</span>' +
    "<i class='iChk'>" +
    '</i>' +
    '</label>' +
    '</div>' +
    '</div>' +
    "<ul data-opts='basic' class='table-list-contents basic'>" +
    '{{#basic_items}}' +
    '<li>' +
    "<p class='name'>" +
    '{{name}}' +
    '</p>' +
    "<p class='content'>" +
    '{{#contents}}' +
    "<span class='spec_opts'>" +
    '{{content_name}}' +
    '</span>' +
    '{{#if @last}}{{else}}, {{/if}}' +
    '{{/contents}}' +
    '</p>' +
    '</li>' +
    '{{/basic_items}}' +
    '</ul>' +
    '</td>' +
    "<td style='vertical-align: top;'>" +
    '<!-- dummy 선택품목 accordion option -->' +
    "<div class='table-acodian-list list-wrap listType'>" +
    "<div class='list-item active'>" +
    "<button class='list-title' data-target='{{trim_title}}-opts1'>" +
    "<span class='title'>" +
    '<label>' +
    '선택품목' +
    '</label>' +
    '</span>' +
    '</button>' +
    "<div data-id='{{trim_title}}-opts1' class='conts'>" +
    "<ul data-opts='select'>" +
    '{{#optional_items}}' +
    '<li>' +
    "<p class='item-name'>" +
    "<span class='spec-opts'>" +
    '{{name}}' +
    '</span>' +
    '</p>' +
    "<span class='item-price'>" +
    '{{price}}' +
    '</span>' +
    '</li>' +
    '{{/optional_items}}' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</td>' +
    '</tr>' +
    '{{/trims}}' +
    '</tbody>' +
    '</table>' +
    '</div>';

  const pcTemplate = Handlebars.compile(pcSource);

  let pcData2 = {
    trims: [
      {
        trim_title: 'test',
        price: '500000',
        basic_items: [
          {
            name: 'tt',
            contents: [
              {
                content_name: 'hello',
              },
              {
                content_name: 'bye',
              },
            ],
          },
          { name: 'gg', contents: [] },
        ],
        optional_items: [
          {
            name: 'o1',
            price: '1000',
          },
          {
            name: '02',
            price: '2000',
          },
        ],
      },
      {
        trim_title: 'good',
        price: '1200',
        basic_items: [
          { name: 'rr', contents: [] },
          { name: 'ee', contents: [] },
        ],
        optional_items: [
          {
            option_name: 'gdgfd',
            option_price: '1234',
          },
        ],
      },
    ],
  };

  let mobileSource = ``;
  const mobileTemplate = Handlebars.compile(mobileSource);
  let mobileData = {};

  let pcData: { trims: any[] } = {
    trims: [],
  };
  params?.forEach((param) => {
    let data: any = {};

    const category = param?.category ?? {};
    data.trim_title = category.name0?.toLowerCase();
    data.price = category.price0;
    data.category = category;

    const basic_items = param?.basic_items ?? [];
    const optional_items = param?.optional_items ?? [];

    data.basic_items = [];
    basic_items.forEach((item) => {
      const title = item?.title ?? '';
      const contents = splitSpec(item?.content ?? '') ?? [];

      data.basic_items.push({
        name: title,
        contents: contents?.map((x) => ({ content_name: x })) ?? [],
      });
    });

    data.optional_items = [];
    optional_items.forEach((item) => {
      const title = item?.title ?? '';
      const price = item?.price ?? '';

      data.optional_items.push({
        name: title,
        price,
      });
    });

    pcData.trims.push(data);
  });

  const pcResult = pcTemplate(pcData);
  const mobileResult = mobileTemplate(mobileData);

  return pcResult;
};

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') as RequestQueries['type'];

  const body: RequestParam[] = await request.json();

  let data: ResponseData;
  switch (type) {
    case 'excel':
      data = exportToExcel(body);
      return NextResponse.json<ResponseData>(data);
    case 'html':
      data = exportToHTML(body);
      return NextResponse.json<ResponseData>(data);
  }
}
