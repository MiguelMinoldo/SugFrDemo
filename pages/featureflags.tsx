import { Text } from '@vercel/examples-ui'
import ConfigcatLayout from '@components/layout'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Cookies from 'js-cookie'
import { useValue } from '@lib/use-configcat'

export default function Index({ sugconfr }) {
  const userFromFrance =  useValue ('sugconfr', false, Cookies.get('uId'), Cookies.get('frenchUser'))
  
  console.log('userFromFrance', userFromFrance)
  
  return (
    <div className={styles.container}>
    <Head>
      <title>Edge Functions Demo - Configcat</title>
      <meta name="description" content="Sitecore User Group France" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
    <main className={styles.main}>
      <Text variant="h1" className="mb-6">
        Welcome to our Feature Flag Demo!
      </Text>
     
      <Text variant="h2" className="mb-6">
        Feature Flag Enablement
      </Text>
      
      <div className={styles.grid}>
        {sugconfr ? (
          <a href="https://www.meetup.com/Sitecore-User-Group-France/" className={styles.card}>
            <h2>Join our Sitecore User Group France! &rarr;</h2>
            <Image src="/sugfr.jpeg" alt="sugfr Logo" width={300} height={150} />
            <p>This group is for anyone interested in Sitecore, users, marketers, 
              developers, professionals, etc. of any type and level who want to learn, 
              share and contribute to the Sitecore community both locally and globally. 
              Join us!</p>
          </a>
          ) : (
            <a href="https://app.configcat.com/" className={styles.card}>
            <h2>Ouch! &rarr;</h2>
            <p>The feature flag called <code>sugconfr</code> is{' '}</p>
            <b>disabled</b> in your ConfigCat dashboard, enabling it will change
              this text
          </a>
          )}
          <a href="https://github.com/vercel/examples/tree/main/edge-functions" className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Get insipired by a functions library from Vercel</p>
          </a>        
          
        </div>

      {userFromFrance && (
        <Text>
          It seems you are coming from France.. <b>See you in our next meetup!</b>
        </Text>
      )}
    </main>
    </div>)
}

Index.Layout = ConfigcatLayout