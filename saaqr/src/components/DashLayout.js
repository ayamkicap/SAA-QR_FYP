import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import SideNav from './sideNav'

const DashLayout = () => {
    return (
        <>
            <DashHeader />
            <SideNav/>
            <div className="dash-container" >
                <Outlet />
            </div>
            <DashFooter />
        </>
    )
}
export default DashLayout