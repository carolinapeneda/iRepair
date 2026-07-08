export interface ServiceOrder {
  id: number;
  clientId: number;
  device: string
  issue: string
  status: "open" | "in_progress" | "done";
  created_at: string;
}

export type CreateServiceOrder = Omit<ServiceOrder, 'id' | 'created_at'>;