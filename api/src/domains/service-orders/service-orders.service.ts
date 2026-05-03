import { prisma } from "../../config/prismaClient";

class ServiceOrderService {
    async create(title: string) {
        const novaOrdem = prisma.serviceOrder.create({ data: { title } });
        return novaOrdem;
    }

    async getAll(completedStatus?: string) {
        if(completedStatus === "true") {
            return await prisma.serviceOrder.findMany({ where: { completed: true }});
        }
        if(completedStatus === "false") {
            return await prisma.serviceOrder.findMany({ where: { completed: false }});            
        }
        return await prisma.serviceOrder.findMany();
    }

    async getById(id: number) {
        const OrdemEncontrada = await prisma.serviceOrder.findUnique({ where: { id }});
        return OrdemEncontrada;
    }

    async update(id: number, title: string, completed: boolean) {
        const ordem = await prisma.serviceOrder.findUnique({ where: { id }});
        if(!ordem) return undefined;
        const ordemAtualizada = await prisma.serviceOrder.update({ where: { id }, data: { title, completed } });
        return ordemAtualizada;
    }

    async delete(id: number) {
        const ordem = await prisma.serviceOrder.findUnique({ where: { id }});
        if(!ordem) return undefined;
        await prisma.serviceOrder.delete({ where: { id }});
        return true;
    }
}

export { ServiceOrderService };