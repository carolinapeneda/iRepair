import { prisma } from "../../config/prismaClient";

class ClienteService {
    async create(title: string) {
        const novaCliente = prisma.client.create({ data: { title } });
        return novaCliente;
    }

    async getAll(completedStatus?: string) {
        if(completedStatus === "true") {
            return await prisma.client.findMany({ where: { completed: true }});
        }
        if(completedStatus === "false") {
            return await prisma.client.findMany({ where: { completed: false }});            
        }
        return await prisma.client.findMany();
    }

    async getById(id: number) {
        const clienteEncontrada = await prisma.client.findUnique({ where: { id }});
        return clienteEncontrada;
    }

    async update(id: number, title: string, completed: boolean) {
        const cliente = await prisma.client.findUnique({ where: { id }});
        if(!cliente) return undefined;
        const clienteAtualizada = await prisma.client.update({ where: { id }, data: { title, completed } });
        return clienteAtualizada;
    }

    async delete(id: number) {
        const cliente = await prisma.client.findUnique({ where: { id }});
        if(!cliente) return undefined;
        await prisma.client.delete({ where: { id }});
        return true;
    }
}

export { ClienteService };