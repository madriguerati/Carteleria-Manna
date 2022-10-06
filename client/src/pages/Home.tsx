import Layout from "../components/Layout"
import useUser from './../store/user';

const Home = () => {
  const { tokken } = useUser((state) => state)
  return (
    <Layout>
      Heyyyy
    </Layout>
  )
}

export default Home