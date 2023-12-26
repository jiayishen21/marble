import type { NextPage } from 'next'
import axios from 'axios'

const Home: NextPage = () => {

  const onButton = async () => {
    axios
      .get('http://localhost:3000/api/hello')
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err?.response?.data?.message)
      })
  }

  return (
    <>
      <button onClick={onButton}>Click me</button>
    </>
  )
}

export default Home
