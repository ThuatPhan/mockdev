import { Inngest } from 'inngest'
import logger from '@/config/logger'
import prisma from '@/config/db'

export const inngest = new Inngest({ id: 'mock_dev' })

const syncUserFromClerk = inngest.createFunction(
  { id: 'sync-user-from-clerk' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    const { id: clerkId, first_name, last_name, email_addresses, banned, image_url } = event.data

    const newUser = await prisma.user.create({
      data: {
        id: clerkId,
        firstname: first_name,
        lastname: last_name,
        email: email_addresses[0]?.email_address,
        banned: banned,
        image: image_url
      }
    })

    logger.info(`User ${newUser.id} successfully synced to DB.`)

    return newUser
  }
)

const updateUserFromClerk = inngest.createFunction(
  { id: 'update-user-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    const { id: clerkId, first_name, last_name, email_addresses, banned, image_url } = event.data

    const updatedUser = await prisma.user.update({
      where: { id: clerkId },
      data: {
        firstname: first_name,
        lastname: last_name,
        email: email_addresses[0]?.email_address,
        banned: banned,
        image: image_url
      }
    })

    logger.info(`User ${clerkId} successfully updated in DB.`)

    return updatedUser
  }
)

const deleteUserFromClerk = inngest.createFunction(
  { id: 'delete-user-from-clerk' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    const { id: clerkId } = event.data

    const deletedUser = await prisma.user.delete({
      where: { id: clerkId }
    })

    logger.info(`User ${clerkId} successfully deleted from DB.`)

    return deletedUser
  }
)

export const functions = [syncUserFromClerk, updateUserFromClerk, deleteUserFromClerk]
