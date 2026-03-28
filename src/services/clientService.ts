import { api } from './api';
import type { Client, CreateClientData } from '../types';

interface ApiResponse<T> {
  data: T; //trazendo um obj ao inves de uma lista
}

export async function getAllClients(): Promise<Client[]> {
  const response = await api.get<ApiResponse<Client[]>>('/clients');
  return response.data.data;
}

export async function createClient(data: CreateClientData): Promise<Client> {
  const response = await api.post<ApiResponse<Client>>('/clients', data);
  return response.data.data;
}

export async function deleteClient(id: number): Promise<void> {
  await api.delete(`/clients/${id}`);
}