import fetch from 'node-fetch';
import {REGISTRY_URL} from "../config";

export default async function handler(req, res) {
  try {
    const { sources } = await fetch(`${REGISTRY_URL}/source-list/latest`).then(r => r.json());
    res.status(200).json(sources);
  } catch (err) {
    res.status(500).text(err);
  }
}
