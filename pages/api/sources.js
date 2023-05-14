import fetch from 'node-fetch';

const NPM_HOST = "https://registry.npmjs.com";

export default async function handler(req, res) {
  let sources = [];
  try {
    const indexFile = await fetch(`${NPM_HOST}/source-list/latest`).then(r => r.json());
    sources = indexFile.sources;
  } catch {
    sources = [];
  }

  res.status(200).json(sources);
}
