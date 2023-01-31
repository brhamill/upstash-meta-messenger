// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis'
import { serverPusher } from '../../pusher'
import { Message } from '../../typings'

type Data = {
  message: Message
}

type ErrorData = {
  body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ body: 'Method Not Allowed' })
  }

  const { message } = req.body

  const newMessage = {
    ...message,
    // Replace the timestamp of the user to the timestamp of the server

    // @BH - this was creating problems when using server component fetching on page.tsx
    // created_at: Date.now(),
  }

  // // push to upstash redis db
  await redis.hset('messages', message.id, JSON.stringify(newMessage))
  await serverPusher.trigger('messages', 'new-message', newMessage)

  res.status(200).json({ message: newMessage })
}
