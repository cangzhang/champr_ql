import fetch from 'node-fetch';
import { NextResponse } from 'next/server';

import { CDN_URL, REGISTRY_URL } from "../../../config";

export async function GET(req) {
  try {
    const { searchParams: search } = new URL(req.url);
    const source = search.get("source");
    const champion = search.get("champion");

    if (!source || !champion) {
      const body = JSON.stringify({ error: true, message: "Invalid request, source and champion are required." });
      return new Response(body, {
        status: 400,
        headers: {
          'content-type': 'application/json',
        }
      });
    }

    const version = await getLatestVersion(source);
    const data = await getFile(source, version, champion);
    return NextResponse.json(data);
  } catch (err) {
    return new Response(err, {
      status: 500,
    });
  }
}

async function getLatestVersion(source) {
  try {
    const { version } = await fetch(`${REGISTRY_URL}/${source}/latest`).then(r => r.json());
    return version;
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getFile(source, version, champ) {
  try {
    return await fetch(`${CDN_URL}/${source}@${version}/${champ}.json`).then(r => r.json());
  } catch (err) {
    return Promise.reject(err);
  }
}
