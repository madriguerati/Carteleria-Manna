import Footer from '../Footer'
import Navbar from '../Navbar'

const Layout = ({ children } : any) => {
  return (
    <>
      <Navbar />
      <main className='min-h-[83vh]'>
      {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
