import { useEffect, useState } from "react"
import type { Client, ServiceOrder, CreateServiceOrder } from "../types"
import { getAllServiceOrders, createServiceOrder, deleteServiceOrder } from "../services/serviceOrderService";
import { getAllClients } from "../services/clientService";

export const ServiceOrdersPage = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState<number>(0);
  const [device, setDevice] = useState('');
  const [issue, setIssue] = useState('');
  const [status, setStatus] = useState('open');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [ordersData, clientsData] = await Promise.all([getAllServiceOrders(), getAllClients()]);
        const ordersNormalizados = ordersData.map((order: any) => ({
          ...order, clientId: order.clientId || order.client_id || 0
        }));
        // console.log(clientsData);
        setOrders(ordersNormalizados);
        setClients(clientsData);
      } catch (error) {
        console.error("Erro ao carregar os dados", error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newOrder: CreateServiceOrder = {
      clientId: clientId,
      device: device,
      issue: issue,
      status: "open"
    };

    try {
      const created = await createServiceOrder(newOrder);
      setOrders(prev => [...prev, created]);
      setDevice(''); setIssue(''); setClientId(0);
    } catch (error) {
      alert('Erro ao criar OS');
    }
  }

  async function handleDelete(id: number) {
    await deleteServiceOrder(id);
    setOrders(prev => prev.filter(c => c.id !== id));
  }

  const getClientName = (id: number) => {
    const client = clients.find(c => c.id === id);
    return client ? client.name : "Cliente não encontrado."
  }
  
  if (isLoading) return <p>carregando...</p>

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ordens de Serviço</h1>
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 gap-4 bg-white p-6 rounded shadow">
        <select value={clientId} onChange={e => setClientId(Number(e.target.value))} className="border p-2 rounded" required>
          <option value="">Selecione o Cliente</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.name}</option>
          ))}
        </select>

      <input placeholder="Aparelho" value={device} onChange={e => setDevice(e.target.value)} className="border p-2 rounded" required/>
      <textarea placeholder="Descrição do problema" value={issue} onChange={e => setIssue(e.target.value)} className="border p-2 rounded" required></textarea>
      <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">Adicionar</button>
      </form>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider"> Cliente: {getClientName(order.clientId)}</p>
              <h3 className="text-lg font-bold text-gray-800">{order.device}</h3>
              <p className="text-sm text-gray-600">{order.issue}</p>  
              <span className={`text-xs px-2 py-1 rounded font-semibold ${order.status === 'open' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
              }`}>{order.status}</span>
            </div>
            <button onClick={() => handleDelete(order.id)} className="text-red-500">Excluir</button>
          </div>
        ))}
      </div>
    </div>
  )
}
