import Pusher from 'pusher'
import ClientPusher from 'pusher-js'

export const serverPusher = new Pusher({
  appId: '1544791',
  key: '1bfba5f136b6af54fed8',
  secret: '73a63<redacted>',
  cluster: 'us3',
  useTLS: true,
})

export const clientPusher = new ClientPusher('1bfba5f136b6af54fed8', {
  cluster: 'us3',
  forceTLS: true,
})
