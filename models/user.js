const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

module.exports = {
  async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  },
  async create(email, password) {
    const hashed = await bcrypt.hash(password, 10);
    return prisma.user.create({ data: { email, password: hashed } });
  },
  async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  },
  async findById(id) {
    return prisma.user.findUnique({ where: { id: Number(id) } });
  }
}; 