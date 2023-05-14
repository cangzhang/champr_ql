import fetch from 'node-fetch';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const file = await fetch(`https://raw.githubusercontent.com/Loyalsoldier/clash-rules/release/${params.file}`).then(r => r.text());
    return new Response(file, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  } catch (e) {
    return NextResponse.error();
  }
}