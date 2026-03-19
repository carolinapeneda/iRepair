import { Link, useNavigate, Outlet } from 'react-router';

export function Header(){

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1); // volta uma página no histórico
  }

  return (
        <div className="max-w-3xl mx-auto flex flex-col justify-between items-center">
          <header className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800">
              iRepair Dashboard
            </h1>
          </header>
          <nav className="flex flex-col gap-4">
            <Link to="/" className="hover:underline">Dashboard</Link>
            <Link to="/clients" className="hover:underline">Clientes</Link>
            <Link to="/service-orders" className="hover:underline">Ordens de Serviço</Link>
          </nav>

          <button onClick={handleBack} className="bg-blue-800 px-3 py-1 rounded">
            Voltar
          </button>
          <main className='p-6'>
            <Outlet />
          </main>
        </div>
    );
  }

  // // Opção 1: Link (para navegação em texto/botões simples)
  // const Menu = () => {
  //   return (
  //     <nav>
  //       <Link to="/">Dashboard</Link>
  //       <Link to="/clients">Clientes</Link>
  //       <Link to="/service-orders">Ordens de Serviço</Link>
  //     </nav>
  //   );
  // };

  // // Opção 2: useNavigate (para navegar programaticamente)
  // // Arrow function para o componente, function normal para o handler
  // const BackButton = () => {


  //   return <button onClick={handleBack}>Voltar</button>;
  // };


