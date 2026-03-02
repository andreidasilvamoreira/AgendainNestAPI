import 'dotenv/config';
import { PrismaService } from './prisma.service';

import { seedUsers } from './seeds/user.seed';
import { seedServices } from './seeds/services.seed';
import { seedDisponibilidades } from './seeds/disponibilidade.seed';
import { seedAgendamentos } from './seeds/agendamento.seed';

async function main() {
  const prisma = new PrismaService();
  await prisma.$connect();

  await prisma.agendamento.deleteMany();
  await prisma.disponibilidade.deleteMany();
  await prisma.servico.deleteMany();
  await prisma.usuario.deleteMany();

  const { admin, funcionario1, funcionario2, cliente1, cliente2 } = await seedUsers(prisma);
  const { servico } = await seedServices(prisma);

  await seedDisponibilidades(prisma, [funcionario1.id, funcionario2.id]);
  await seedAgendamentos(prisma, {
    servicoId: servico.id,
    clienteId: cliente1.id,
    funcionarioIds: [funcionario1.id, funcionario2.id],
  });

  await seedAgendamentos(prisma, {
    servicoId: servico.id,
    clienteId: cliente2.id,
    funcionarioIds: [funcionario1.id, funcionario2.id],
  });
  console.log('Admin criado com sucesso!');
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  process.exit(1);
});
