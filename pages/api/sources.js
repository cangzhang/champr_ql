import fetch from 'node-fetch';

const NPM_HOST = "https://registry.npmjs.com/@champ-r";

export default async function handler(req, res) {
  let sources = [];
  try {
    const indexFile = await fetch(`${NPM_HOST}/source-list/latest`).then(r => r.json());
    sources = indexFile.sources;
  } catch (err) {
    console.error(err);
    sources = [];
  }

  res.status(200).json(sources);
}
