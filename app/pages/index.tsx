import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Wallet = dynamic(() => import('../components/wallet'), {
  ssr: false
})

const Home: NextPage = () => {
  return (
   <Wallet />
  )
}

export default Home
