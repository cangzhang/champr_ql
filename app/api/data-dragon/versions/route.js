import fetch from 'node-fetch';
import { NextResponse } from 'next/server';
import { DATA_DRAGON_URL } from '@/config';;

export async function GET() {
  let list = await fetch(`${DATA_DRAGON_URL}/api/versions.json`).then(r => r.json());
  return NextResponse.json({ latest: list[0] });
}
