import { PrismaService } from '../prisma.service';

function nextWeekdayAt(diaSemana: number, hour: number, minute = 0) {
  const now = new Date();
  const d = new Date(now);

  d.setSeconds(0, 0);
  d.setHours(hour, minute, 0, 0);

  const diff = (diaSemana - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);

  return d;
}

export async function seedAgendamentos(prisma: PrismaService, params: { servicoId: number; clienteId: number; funcionarioIds: number[] }) {
  const { servicoId, clienteId, funcionarioIds } = params;

  const servico = await prisma.servico.findUnique({ where: { id: servicoId } });
  if (!servico) throw new Error('Serviço não encontrado para seed');

  await prisma.agendamento.deleteMany({
    where: { cliente_id: clienteId },
  });

  const inicio1 = nextWeekdayAt(2, 10, 0);
  const fim1 = new Date(inicio1.getTime() + servico.duracao_minutos * 60_000);
  const inicio2 = nextWeekdayAt(4, 14, 0);
  const fim2 = new Date(inicio2.getTime() + servico.duracao_minutos * 60_000);

  await prisma.agendamento.createMany({
    data: [
      {
        servico_id: servicoId,
        cliente_id: clienteId,
        funcionario_id: funcionarioIds[0],
        inicio_em: inicio1,
        fim_em: fim1,
        status: 'AGENDADO',
        preco_centavos_snapshot: servico.preco_centavos,
        duracao_minutos_snapshot: servico.duracao_minutos,
      },
      {
        servico_id: servicoId,
        cliente_id: clienteId,
        funcionario_id: funcionarioIds[1] ?? funcionarioIds[0],
        inicio_em: inicio2,
        fim_em: fim2,
        status: 'AGENDADO',
        preco_centavos_snapshot: servico.preco_centavos,
        duracao_minutos_snapshot: servico.duracao_minutos,
      },
    ],
  });

  console.log('Agendamentos seeded');
}
