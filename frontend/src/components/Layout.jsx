import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#0f1117]">
      <Sidebar />
      <main className="flex-1 p-8 text-white">
        {children}
      </main>
    </div>
  );
};

export default Layout;