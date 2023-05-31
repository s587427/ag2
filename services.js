import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getActivations() {
    return await prisma.activation.findMany()
}

export function getActivationByMachineCode(machineCode) {
    return prisma.activation.findUnique({
        where: { machineCode: machineCode },
        select: {
            id: true,
            machineCode: true,
        },
    })
}

export async function createActivation(machineCode) {
    return await prisma.activation.create({
        data: {
            machineCode: machineCode,
        },
        select: {
            id: true,
            machineCode: true,
        },
    })
}

export async function deleteActivations() {
    return await prisma.activation.deleteMany()
}
