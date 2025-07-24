const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

module.exports = {
  async getAllByUser(userId) {
    return prisma.todo.findMany({ where: { ownerId: userId }, orderBy: { createdAt: 'desc' } });
  },
  async create(title, ownerId) {
    return prisma.todo.create({ data: { title, ownerId } });
  },
  async update(id, data) {
    return prisma.todo.update({ where: { id: Number(id) }, data });
  },
  async delete(id) {
    return prisma.todo.delete({ where: { id: Number(id) } });
  },
  async getById(id) {
    return prisma.todo.findUnique({ where: { id: Number(id) } });
  }
}; 