import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST':
      const { username, password, email } = req.body
      const user = await prisma.user.create({ 
        data: { 
          username: username, 
          email: email,
          password: password,     // TODO: encrypt password
          followers: 0,
        },
      })
      res.status(201).json(user)
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}