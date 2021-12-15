import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Wallet = dynamic(() => import('../components/wallet'), {
  ssr: false
})

const Home: NextPage = () => {
  return (
    <>
      <Wallet />
      This program is running on <b>devnet</b>. No actual money will change hands to send messages
   </>
  )
}

export default Home
