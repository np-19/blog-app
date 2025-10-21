import { useEffect, useState } from 'react'
import './App.css'
import authService from './services/auth.js'
import { useDispatch } from 'react-redux';
import { login, logout } from './features/auth/authSlice';
import { Header, Footer, LoadingBar, Container } from './components/index.js';
import { Outlet, RouterProvider, Route  } from 'react-router';

    function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser().then((user) => {
      if (user) {        
        dispatch(login({userData: user}));
      }
      else {
        dispatch(logout());
      }
    })
    .catch((error) => {
      console.log("Error fetching current user: ", error);
      dispatch(logout());
    })
    .finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  return (
    !loading ? (
      <div className="min-h-full w-full flex flex-wrap content-between bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 animate-fade-in">
        <div className="w-full block">
          <Header />
          <main className="min-h-[90vh]">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    ) : (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Container>
          <LoadingBar message="Initializing application..." />
        </Container>
      </div>
    )
  );
}

export default App
