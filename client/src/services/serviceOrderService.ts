import { api } from './api';
import type { ServiceOrder, CreateServiceOrder } from '../types';

interface ApiResponse<T> {
  data: T; //trazendo um obj ao inves de uma lista
}

export async function getAllServiceOrders(): Promise<ServiceOrder[]> {
  const response = await api.get<ApiResponse<ServiceOrder[]>>('/service-orders');
  return response.data.data;
}

export async function createServiceOrder(data: CreateServiceOrder): Promise<ServiceOrder> {
  const response = await api.post<ApiResponse<ServiceOrder>>('/service-orders', data);
  return response.data.data;
}

export async function deleteServiceOrder(id: number): Promise<void> {
  await api.delete(`/service-orders/${id}`);
}