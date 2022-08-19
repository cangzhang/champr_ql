import fetch from 'node-fetch';

export default async function handler(req, res) {
  let list = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(r => r.json());
  res.status(200).json({ list, latest: list[0] });
}
