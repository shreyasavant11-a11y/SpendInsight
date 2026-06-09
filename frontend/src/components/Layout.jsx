import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-800">
      <Sidebar />
      <main className="flex-1 p-8 text-white">
        {children}
      </main>
    </div>
  );
};

export default Layout;