import Navbar from "./Navbar"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />

      <div className="page-content">
        {children}
      </div>
    </div>
  )
}

export default Layout