import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import './RootLayout.css';

export default function RootLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Outlet />
      </div>
    </div>
  );
}
