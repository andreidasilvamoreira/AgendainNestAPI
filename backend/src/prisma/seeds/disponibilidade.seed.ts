import { PrismaService } from '../prisma.service';

export async function seedDisponibilidades(prisma: PrismaService, funcionarioIds: number[]) {
  const dias = [1, 2, 3, 4, 5];

  await prisma.disponibilidade.deleteMany({
    where: { funcionario_id: { in: funcionarioIds } },
  });

  const data: Array<{
    funcionario_id: number;
    dia_semana: number;
    inicio: string;
    fim: string;
    ativo: boolean;
  }> = [];

  for (const funcionario_id of funcionarioIds) {
    for (const dia_semana of dias) {
      data.push(
        { funcionario_id, dia_semana, inicio: '09:00', fim: '12:00', ativo: true },
        { funcionario_id, dia_semana, inicio: '13:00', fim: '18:00', ativo: true },
      );
    }
  }

  await prisma.disponibilidade.createMany({ data });

  console.log('Disponibilidades seeded');
}
