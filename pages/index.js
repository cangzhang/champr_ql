import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import cn from 'classnames';

import s from '../styles/Home.module.css'

export async function getServerSideProps(context) {
  let host = context.req.headers[`referer`];
  if (process.env.NODE_ENV === `production`) {
    host = process.env.HOST;
  }

  const { latest } = await fetch(`${host}api/data-dragon/versions`).then(r => r.json());
  const resp = await fetch(`${host}api/data-dragon/${latest}/items`).then(r => r.json());

  return {
    props: {
      version: latest,
      itemList: resp.data,
    }
  }
}

function Home({ version, itemList = [] }) {
  const [latestVer, setLatestVer] = useState(version);
  const [items, setItems] = useState(itemList);
  const [filter, setFilter] = useState(``);
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = itemList;
  }, [itemList])

  useEffect(() => {
    if (!filter) {
      setItems(itemsRef.current);
      return
    }

    let list = itemsRef.current.filter(i => i.id.includes(filter))
    setItems(list)
  }, [filter, items])

  return (
    <>
      <Head>
        <title>ChampR - Yet Another League of Legends Helper</title>
        <meta name="description" content="ChampR - Yet Another League of Legends Helper"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={cn(s.main, `container mx-auto p-4 flex flex-col`)}>
        <h1 className={`text-6xl font-bold text-blue-600`}>Welcome!</h1>

        <div className={`mt-4 mx-1`}>
          <p className={`text-xl text-slate-500`}>
            Latest version is
            <span className={`text-gray-700 mx-2 underline decoration-4 decoration-pink-500`}>{latestVer}</span>
          </p>

          <input
            autoComplete={`off`}
            className={` mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
            name="search"
            type="search"
            placeholder={`Search items...`}
            value={filter}
            onChange={ev => setFilter(ev.target.value)}
          />
        </div>

        <div className={cn(s.list, `grid justify-between`)}>
          {items.map(i =>
            <div
              key={i.id}
              data-itemid={i.id}
              className={`p-1 h-16 w-16 flex items-center justify-center`}
            >
              <Image
                title={i.name}
                width={48}
                height={48}
                alt={i.name}
                src={`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/item/${i.id}.png`}
              />
            </div>
          )}
        </div>

      </main>

      <footer className={cn(s.footer, 'bg-gray-600 text-slate-300')}>
        Made with ???? by
        <a
          className={`font-mono bg-slate-500 rounded-lg mx-1 px-1 text-slate-50 w-auto grow-0 hover:underline`}
          href={`https://github.com/cangzhang`}
        >
          @alcheung
        </a>
      </footer>
    </>
  )
}

export default Home;
