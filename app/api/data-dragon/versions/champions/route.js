import fetch from 'node-fetch';
import { NextResponse } from 'next/server';
import { DATA_DRAGON_URL } from '@/config';

export async function GET() {
  try {
    const [latest] = await fetch(`${DATA_DRAGON_URL}/api/versions.json`).then(r => r.json());
    const { data } = await fetch(`${DATA_DRAGON_URL}/cdn/${latest}/data/en_US/champion.json`).then(r => r.json());
    return NextResponse.json(data);
  } catch (err) {
    return new Response(err, {
      status: 500,
    });
  }
}
