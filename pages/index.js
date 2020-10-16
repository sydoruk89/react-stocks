import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data
}

export default function Home() {
  const apiUrl = 'https://swapi.dev/api/people/'
  const { data, error } = useSWR(apiUrl, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <h1 className={styles.title}>This is my list</h1>
        {data.results.map((item)=>{
          return <h2 key={item.url}>Hi, I am {item.name}</h2>
        })}
      </main>
    </div>
  )
}
