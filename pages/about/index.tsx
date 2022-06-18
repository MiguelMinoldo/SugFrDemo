import { Text, Button } from '@vercel/examples-ui'
import ConfigcatLayout from '@components/layout'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Image from 'next/image'

export default function About() {
  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>Edge Functions Demo - Configcat</title>
        <meta name="description" content="Sitecore User Group France" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Text variant="h2" className="mb-6">
          About page
        </Text>
        <Text className="text-lg mb-4">This is the original about page</Text>
        <Text className="mb-4">
          You&apos;re currently on <b>/about</b>
        </Text>
        <Image src="/letta.png" alt="sugfr Logo" width={300} height={300} />
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

About.Layout = ConfigcatLayout
