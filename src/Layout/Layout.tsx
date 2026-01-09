import type React from 'react';
import Header from '../components/Header/Header';
import type { PropsWithChildren } from 'react';
import './Layout.css';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
    </>
  );
};

export default Layout;
