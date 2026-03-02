import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

type Papel = 'ADMIN' | 'FUNCIONARIO' | 'CLIENTE';

export async function seedUsers(prisma: PrismaService) {
  const senha_hash = await bcrypt.hash('123456', 10);

  const users = [
    { key: 'admin', nome: 'Admin', email: 'admin@email.com', papel: 'ADMIN' as Papel },
    { key: 'funcionario1', nome: 'João Func', email: 'joao.func@email.com', papel: 'FUNCIONARIO' as Papel },
    { key: 'funcionario2', nome: 'Maria Func', email: 'maria.func@email.com', papel: 'FUNCIONARIO' as Papel },
    { key: 'cliente1', nome: 'Cliente 1', email: 'cliente1@email.com', papel: 'CLIENTE' as Papel },
    { key: 'cliente2', nome: 'Cliente 2', email: 'cliente2@email.com', papel: 'CLIENTE' as Papel },
  ] as const;

  for (const u of users) {
    await prisma.usuario.upsert({
      where: { email: u.email },
      update: { nome: u.nome, papel: u.papel },
      create: {
        nome: u.nome,
        email: u.email,
        senha_hash,
        papel: u.papel,
      },
    });
  }

  const [admin, funcionario1, funcionario2, cliente1, cliente2] = await Promise.all([
    prisma.usuario.findUniqueOrThrow({ where: { email: 'admin@email.com' } }),
    prisma.usuario.findUniqueOrThrow({ where: { email: 'joao.func@email.com' } }),
    prisma.usuario.findUniqueOrThrow({ where: { email: 'maria.func@email.com' } }),
    prisma.usuario.findUniqueOrThrow({ where: { email: 'cliente1@email.com' } }),
    prisma.usuario.findUniqueOrThrow({ where: { email: 'cliente2@email.com' } }),
  ]);

  return { admin, funcionario1, funcionario2, cliente1, cliente2 };
}
