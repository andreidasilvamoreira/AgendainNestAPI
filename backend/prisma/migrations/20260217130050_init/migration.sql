-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha_hash` VARCHAR(191) NOT NULL,
    `papel` ENUM('ADMIN', 'FUNCIONARIO', 'CLIENTE') NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `duracao_minutos` INTEGER NOT NULL,
    `preco_centavos` INTEGER NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agendamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `servico_id` INTEGER NOT NULL,
    `cliente_id` INTEGER NOT NULL,
    `funcionario_id` INTEGER NOT NULL,
    `inicio_em` DATETIME(3) NOT NULL,
    `fim_em` DATETIME(3) NOT NULL,
    `status` ENUM('AGENDADO', 'CANCELADO', 'CONCLUIDO') NOT NULL DEFAULT 'AGENDADO',
    `preco_centavos_snapshot` INTEGER NOT NULL,
    `duracao_minutos_snapshot` INTEGER NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,

    INDEX `Agendamento_funcionario_id_inicio_em_idx`(`funcionario_id`, `inicio_em`),
    INDEX `Agendamento_cliente_id_inicio_em_idx`(`cliente_id`, `inicio_em`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disponibilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `funcionario_id` INTEGER NOT NULL,
    `dia_semana` INTEGER NOT NULL,
    `inicio` TIME NOT NULL,
    `fim` TIME NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,

    INDEX `Disponibilidade_funcionario_id_dia_semana_idx`(`funcionario_id`, `dia_semana`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_servico_id_fkey` FOREIGN KEY (`servico_id`) REFERENCES `Servico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_funcionario_id_fkey` FOREIGN KEY (`funcionario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Disponibilidade` ADD CONSTRAINT `Disponibilidade_funcionario_id_fkey` FOREIGN KEY (`funcionario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
