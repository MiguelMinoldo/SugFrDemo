import Cookies from 'js-cookie'
import { Text, Button } from '@vercel/examples-ui'
import ConfigcatLayout from '@components/layout'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Index() {
  const removeCookie = (name: string) => {
    Cookies.remove(name)
    window.location.reload()
  }

  return (
    <>
    <div className={styles.container}>
    <Head>
      <title>Edge Functions Demo - Configcat</title>
      <meta name="description" content="Sitecore User Group France" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
    <main className={styles.main}>
      <Text variant="h1" className="mb-6">
        Welcome to our A/B Testing Demo!
      </Text>
      
      <Text className="mb-4">
        The following about page will render a different version with a 50% chance:
      </Text>
      
      <div className={styles.grid}>
        
          <Link href="/about">
            <a  className={styles.card} >
              <h2>Test it! &rarr;</h2>
              <p>Click to go to the About page...</p>
            </a>
          </Link>    
          
        </div>

        <Text className="mb-4">
        Click the button below if you want to change the current variant (each
        variant has a 50% chance)
        </Text>
      <div className="mb-4">
        <Button
          variant="secondary"
          className="mr-2.5"
          onClick={() => removeCookie('flag-newAboutPage')}
        >
          Remove /about cookie & reload
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
    </div>
    </>
    )
}

Index.Layout = ConfigcatLayout
