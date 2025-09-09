import { Outlet } from 'react-router';
import { AppProvider } from '../providers';

export function App() {
  return (
    <AppProvider>
      <Outlet/>
    </AppProvider>
  );
}