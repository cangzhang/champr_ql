import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useRef, useState } from "react";

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
    <div className={styles.container}>
      <Head>
        <title>ChampR</title>
        <meta name="description" content="ChampR - Yet Another League of Legends Helper"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome!
        </h1>

        <h3>Latest version is {latestVer}</h3>

        <form>
          <label htmlFor="search">Search Items</label>
          <input name="search" type="text" value={filter} onChange={ev => setFilter(ev.target.value)}/>
        </form>

        <div className={styles.list}>
          {items.map(i =>
            <Image
              key={i.id}
              title={i.name}
              src={`https://ddragon.leagueoflegends.com/cdn/12.15.1/img/item/${i.id}.png`}
              width={48}
              height={48}
              alt={i.name}/>
          )}
        </div>

      </main>

      <footer className={styles.footer}>
        Made with 💙 by alcheung
      </footer>
    </div>
  )
}
