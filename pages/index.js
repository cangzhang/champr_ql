import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react";

export default function Home() {
  const [latestVer, setLatestVer] = useState(``);

  useEffect(() => {
    fetch(`/api/data_dragon`).then(r => r.json())
      .then((list) => {
        setLatestVer(list[0]);
      })
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>ChampR</title>
        <meta name="description" content="ChampR - Yet Another L.o.L Helper"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome!
        </h1>

        <h3>Latest version is {latestVer}</h3>
      </main>

      <footer className={styles.footer}>
        Made with 💙 by alcheung
      </footer>
    </div>
  )
}
