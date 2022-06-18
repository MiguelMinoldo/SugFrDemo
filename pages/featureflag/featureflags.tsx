import { Text, Button } from '@vercel/examples-ui'
import ConfigcatLayout from '@components/layout'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import nookies from 'nookies'
import { createClient } from 'configcat-node'
import Link from 'next/link'
import Cookies from 'js-cookie'

export default function Index({ sugconfr, userFromFrance }) {
  const removeCookies = () => {
    Cookies.remove('uId')
    Cookies.remove('uCountry')
    window.location.reload()
  }

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
        <Link href="https://www.meetup.com/sitecore-user-group-france/events/285819629/">
          <a>
          <Text className="mb-6">
            It seems you are coming from France.. <b>See you in our next meetup!</b>
          </Text>
          <Image src="/sugfrevent.png" alt="sugfr Logo" width={480} height={250} className="mb-6" />
          </a>
        </Link>
      )}

      <div className="mb-4">
        <Button
          variant="secondary"
          className="mr-2.5"
          onClick={() => removeCookies()}
        >
          Remove cookies & reload
        </Button>
      </div>

      <div className="mb-4">
        <Button
          variant="secondary"
          className="mr-2.5"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </div>
    </main>
    </div>)
}

Index.Layout = ConfigcatLayout

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)
  const configcat = createClient(process.env.NEXT_PUBLIC_CONFIGCAT_SDK_KEY)

  var userObject = {
    identifier : cookies['uId'],
    country : cookies['uCountry']
  };

  const userFromFrance = await configcat.getValueAsync(
    'userFromFrance',
    false,
    userObject
  )

  console.log('userFromFrance', userFromFrance)
  console.log('uCountry', cookies['uCountry'])

  const sugconfr = await configcat.getValueAsync(
    'sugconfr',
    false
  )

  return { props: { sugconfr, userFromFrance } }
}