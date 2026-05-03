import { Link, useNavigate, Outlet } from 'react-router';

export function Header(){

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1); // volta uma página no histórico
  }

return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-sm border-b border-gray-200 w-full mb-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              iRepair Dashboard
            </h1>
            
            <nav className="flex gap-6 text-sm font-medium text-gray-700">
              <Link to="/" className="hover:text-blue-600 transition-colors">Dashboard</Link>
              <Link to="/clients" className="hover:text-blue-600 transition-colors">Clientes</Link>
              <Link to="/service-orders" className="hover:text-blue-600 transition-colors">Ordens de Serviço</Link>
            </nav>
          </div>

          <button 
            onClick={handleBack} 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>←</span> Voltar
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-12">
        <Outlet />
      </main>
    </div>
  );
}

