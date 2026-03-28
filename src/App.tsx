import { BrowserRouter, Routes, Route } from 'react-router';
import { DashboardPage } from './pages/DashboardPage';
import { ClientsPage } from './pages/ClientsPage';
import { ServiceOrdersPage } from './pages/ServiceOrdersPage';
import { Header } from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/service-orders" element={<ServiceOrdersPage />} />
          <Route path='*' element={<h1>Página não encontrada 💔</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;