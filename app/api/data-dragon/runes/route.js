import fetch from 'node-fetch';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    let [latest] = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(r => r.json());
    let runes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/runesReforged.json`).then(r => r.json());

    return NextResponse.json(runes);
  } catch (e) {
    return new Response(err, {
      status: 500,
    });
  }
}
