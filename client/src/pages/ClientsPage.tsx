import { useEffect, useState } from 'react';
import { getAllClients, deleteClient, createClient } from '../services/clientService';
import type { Client } from '../types';

export const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllClients();
        setClients(data);
      } catch (error) {
        console.error("Erro ao carregar:", error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      //cria cliente na api
      const newClient = await createClient({name, phone, email});
      //atualiza lista na tela
      setClients(prev => [...prev, newClient]);
      //limpa os campos
      setName('');
      setPhone('');
      setEmail('');
    } catch(error) {
      alert("Erro");
    }
  }

  async function handleDelete(id: number) {
    await deleteClient(id);
    setClients(prev => prev.filter(c => c.id !== id));
  }

  if (isLoading) return <p>carregando...</p>

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Clientes</h1>

      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded shadow">
        <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded" required />
        <input placeholder="Telefone" value={phone} onChange={e => setPhone(e.target.value)} className="border p-2 rounded" required />
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Cadastrar</button>
      </form>

      <ul className="space-y-2">
        {clients.length > 0 ? (
          clients.map(client => (
            <li key={client.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-bold">{client.name}</p>
                <p className="text-sm text-gray-500">{client.email} | {client.phone}</p>
              </div>
              <button onClick={() => handleDelete(client.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Excluir</button>
            </li>
          ))
        ) : (
          <p className="text-gray-500 italic text-center">Nenhum cliente encontrado.</p>
        )}
      </ul>
    </div>
  );
};