import { PrismaClient } from '@prisma/client'

declare global {
  namespace NodeJS {
    interface Global {}
  }
}

// add prisma to the NodeJS global type
interface CustomModeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient
}

// prevent multiple instance of prisma client in development

declare const global: CustomModeJsGlobal

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development')
  global.prisma = prisma

export default prisma
