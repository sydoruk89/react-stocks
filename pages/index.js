import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data
}

export default function Home() {
  const apiUrl = 'https://react-stocks-api.herokuapp.com/api/v1/stocks/'
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
      <h1 className={styles.title}>This is my stock list</h1>
        {data.map((item)=>{
          return <h2 key={item.id}>Stock:<span className="green">{item.name} </span>price: <span className="red">{!item.price?item.price='N/A':item.price}</span></h2>
        })}
      </main>
    </div>
  )
}
