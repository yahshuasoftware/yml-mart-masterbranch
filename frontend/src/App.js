import './App.css';
import 'animate.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from './context';
import { UserProvider } from './context/userContext'; // Import the UserProvider

function App() {
  return (
    <>
      <ContextProvider>
        <UserProvider>
          <ToastContainer position="top-center" />
          <Header />
          <main className="min-h-[calc(100vh-120px)] pt-16">
            <Outlet />
          </main>
          <Footer />
        </UserProvider>
      </ContextProvider>
    </>
  );
}

export default App;
