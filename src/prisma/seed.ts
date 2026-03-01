import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './prisma.service';

async function main() {
  const prisma = new PrismaService();
  await prisma.$connect();

  const senha_hash = await bcrypt.hash('123456', 10);

  await prisma.usuario.upsert({
    where: { email: 'admin@email.com' },
    update: {},
    create: {
      nome: 'Admin',
      email: 'admin@email.com',
      senha_hash,
      papel: 'ADMIN',
    },
  });

  console.log('Admin criado com sucesso!');
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  process.exit(1);
});
