import fetch from 'node-fetch';

export default async function handler(req, res) {
  let { version } = req.query;

  let resp = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`).then(r => r.json());
  let data = Object.entries(resp.data)
    .map(([id, val]) => {
      return {
        id,
        ...val
      }
    }).filter(i => i.inStore !== false)
  res.status(200).json({ data, version })
}
