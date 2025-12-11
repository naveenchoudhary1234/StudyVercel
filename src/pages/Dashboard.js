import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/core/dashboard/SideBar";

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-auto md:h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 md:w-10/12 max-w-[1000px] py-6 md:py-8 lg:py-10 px-2 md:px-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard