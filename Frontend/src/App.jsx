import './App.css';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useSignals } from '@preact/signals-react/runtime';
import { userExists } from '@/signals/user.js';
import { HomeNav } from '@/components/NavBar/HomeNav';
import { ProdNav } from '@/components/NavBar/ProdNav';
import { Dashboard } from '@/pages/Product/Dashboard';
import { Home } from '@/pages/Home/Home';
import { SignIN } from '@/pages/Auth/SignIN';
import { SignUP } from '@/pages/Auth/SignUP';
import { Notification } from '@/pages/Product/Notification';
import { Report } from '@/pages/Product/Report';
import { Setting } from '@/pages/Product/Setting';
import { UploadVideo } from '@/pages/Product/UploadVideo';

function Layout() {
  const navComponent = userExists.value ? <ProdNav /> : <HomeNav />;
  return (
    <div className={userExists.value ? 'flex h-full' : 'h-full'}>
      {navComponent}
      <Outlet />
    </div>
  );
}

function App() {
  console.log('Rendering App component');
  useSignals();

  return (
    <div className="w-screen h-full max-w-">
      <Routes>
        <Route path="/" element={<Layout />}>
          {userExists.value ? (
            <>
              <Route index element={<Dashboard />} />
              <Route path="notification" element={<Notification />} />
              <Route path="report" element={<Report />} />
              <Route path="setting" element={<Setting />} />
              <Route path="upload_video" element={<UploadVideo />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route index element={<Home />} />
              <Route path="signin" element={<SignIN />} />
              <Route path="signup" element={<SignUP />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
