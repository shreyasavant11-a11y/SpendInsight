import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    return token ? { token, name } : null;
  });

  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.user.name);
    setUser({ token: data.token, name: data.user.name });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setUser(null);
  };

  // ✅ useEffect ANDAR hai — logout access kar sakta hai
  useEffect(() => {
    if (!user) return; // sirf logged in hone pe run karo

    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        logout();
      }, 15 * 60 * 1000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);