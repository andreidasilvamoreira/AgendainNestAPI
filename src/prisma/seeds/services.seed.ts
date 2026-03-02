import { PrismaService } from '../prisma.service';

export async function seedServices(prisma: PrismaService) {
  await prisma.servico.createMany({
    data: [
      {
        nome: 'Corte Masculino',
        duracao_minutos: 30,
        preco_centavos: 3000,
        ativo: true,
      },
      {
        nome: 'Barba',
        duracao_minutos: 20,
        preco_centavos: 2000,
        ativo: true,
      },
    ],
    skipDuplicates: true,
  });

  const servico = await prisma.servico.findFirst({
    where: { nome: 'Corte Masculino' },
  });

  if (!servico) throw new Error('Serviço "Corte Masculino" não encontrado após seed');

  return { servico };
}
