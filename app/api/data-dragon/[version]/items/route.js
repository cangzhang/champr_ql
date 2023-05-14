import fetch from 'node-fetch';
import { NextResponse } from 'next/server';

export default async function GET(req) {
  const { searchParams } = new URL(request.url);
  const version = searchParams.get('version');

  let resp = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`).then(r => r.json());
  let data = Object.entries(resp.data)
    .map(([id, val]) => {
      return {
        id,
        ...val
      }
    }).filter(i => i.inStore !== false)
  return NextResponse.json({ data, version })
}
