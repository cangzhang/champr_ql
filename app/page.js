import { headers } from 'next/headers';

import { Analytics } from '@vercel/analytics/react';
import React from "react";
import Home from './components/Home';

export async function getVersionAndItemList(context) {
  let host = headers().get(`referer`) ?? 'http://localhost:3000/';
  if (process.env.NODE_ENV === `production`) {
    host = process.env.HOST;
  }

  const { latest } = await fetch(`${host}api/data-dragon/versions`).then(r => r.json());
  const resp = await fetch(`${host}api/data-dragon/${latest}/items`).then(r => r.json());

  return {
    version: latest,
    itemList: resp.data,
  }
}

export default async function IndexPage() {
  const { version, itemList } = await getVersionAndItemList();


  return (
    <>
      <Home latestVer={version} itemList={itemList} />
      <Analytics/>
    </>
  )
}
