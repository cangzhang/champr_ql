import fetch from 'node-fetch';
import { NextResponse } from 'next/server';

export async function GET() {
  let list = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(r => r.json());
  return NextResponse.status(200).json({ latest: list[0] });
}
