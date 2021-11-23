import Sidebar from '../Sidebar'
export default function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen flex">
        <div className="sm:w-1/8 md:w-1/5  py-12 px-10 ">
          <div className="mt-8">
            <Sidebar />
          </div>
        </div>
        <div className="bg-indigo-50 flex-grow py-12 px-10">{children}</div>
      </div>
    </>
  )
}
