import { useEffect, useState } from "react"
import ServiceCard from "../components/ServiceCard"
import { api } from "../services/api"
import type { ServiceOrder } from "../types";

export function DashboardPage() {

  const [services, setServices] = useState<ServiceOrder[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // function addService(newService: ServiceOrder) {
  //   setServices([...services, newService])
  // }

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await api.get('/service-orders')
        setServices(response.data);
      } catch (e) {
        setError('n carregou');
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, []);

    if (isLoading) return <p>carregando...</p>
    if (error) return <p className="text-red-500">{error}</p>

  return (
    <>
      <div className="max-w-3x1 mx-auto p-6 space-y-3 min-h-screen bg-gray-100 font-sans">
        <div className="flex gap-4 flex-wrap">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              cliente={service.cliente_id}
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


