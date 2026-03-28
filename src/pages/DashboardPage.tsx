import { useEffect, useState } from "react"
import ServiceCard from "../components/ServiceCard"
import { api } from "../services/api"
import type { ServiceOrder, Client } from "../types";
import { getAllClients } from "../services/clientService";

export function DashboardPage() {

  const [services, setServices] = useState<ServiceOrder[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [response, clientsData] = await Promise.all([api.get('/service-orders'), getAllClients()]);
        // console.log("CONTEÚDO REAL DA API:", response.data);
        const ordersNormalizados = response.data.data.map((order: any) => ({
          ...order, clientId: order.clientId || order.client_id || 0
        }));

        setServices(ordersNormalizados);
        setClients(clientsData);
      } catch (e) {
        setError('Os dados não foram carregados');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const getClientName = (id: number) => {
    const client = clients.find(c => c.id === id);
    return client ? client.name : `Cliente #${id}`;
  };

    if (isLoading) return <p>carregando...</p>
    if (error) return <p className="text-red-500">{error}</p>

  return (
    <>
      <div className="max-w-3x1 mx-auto p-6 space-y-3 min-h-screen bg-gray-100 font-sans">
        <div className="flex gap-4 flex-wrap">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              cliente={getClientName(service.clientId)}
              aparelho={service.device}
              servico={service.issue}
              status={service.status}
            />
          ))}
          </div>
      </div>
    </>
  )
}


