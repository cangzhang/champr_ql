import { NextResponse } from 'next/server';
import { REGISTRY_URL } from '@/config';

export async function GET() {
  try {
    const { sources } = await fetch(`${REGISTRY_URL}/source-list/latest`).then(r => r.json());
    return NextResponse.json(sources);
  } catch (err) {
    return new Response(err, {
      status: 500,
    });
  }
}
