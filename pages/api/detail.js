import fetch from 'node-fetch';
import {CDN_URL, REGISTRY_URL} from "../config";

export default async function handler(req, res) {
  try {
    const { source, champion } = req.query;

    if (!source || !champion) {
      return res.status(400).json({ error: true, message: "Invalid request, source and champion are required." });
    }

    const version = await getLatestVersion(source);
    const data = await getFile(source, version, champion);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).text(err);
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
