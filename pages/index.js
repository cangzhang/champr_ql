import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import cn from 'classnames';

import s from '../styles/Home.module.css'

export default function Home() {
  const [latestVer, setLatestVer] = useState(``);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState(``);
  const itemsRef = useRef([]);

  useEffect(() => {
    fetch(`/api/data-dragon/versions`).then(r => r.json())
      .then(({ latest }) => {
        setLatestVer(latest);

        fetch(`/api/data-dragon/${latest}/items`).then(r => r.json())
          .then(({ data }) => {
            setItems(data);
            itemsRef.current = data;
            console.log(`total ${data.length} items`)
          })
      })
  }, [])

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
        <title>ChampR</title>
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

          <div>
            <label htmlFor="search">Search Items</label>
            <input
              autoComplete={`off`}
              className={` mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
              name="search"
              type="text"
              value={filter}
              onChange={ev => setFilter(ev.target.value)}
            />
          </div>
        </div>

        <div className={cn(s.list, `flex flex-wrap basis-1 my-4`)}>
          {items.map(i =>
            <Image
              key={i.id}
              data-itemid={i.id}
              title={i.name}
              width={48}
              height={48}
              alt={i.name}
              src={`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/item/${i.id}.png`}
            />
          )}
        </div>

      </main>

      <footer className={s.footer}>
        Made with 💙 by alcheung
      </footer>
    </>
  )
}
