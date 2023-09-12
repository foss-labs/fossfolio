import { NextPageWithLayout } from 'next';
import { DashboardLayout } from "@app/layout"


const Dashboard: NextPageWithLayout = () => {
   return (
      <h1>HELLO DASHBOARD</h1>
   )
}

Dashboard.Layout = DashboardLayout
Dashboard.RequireAuth = true
export default Dashboard