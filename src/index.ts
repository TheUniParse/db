import prisma from '../prisma/client'

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e.message)
    await prisma.$disconnect()
    process.exit(1)
  })

async function main() {
  // await deleteArticle(1)
  // await deleteArticle(2)
  // await deleteUser(4)
  // await deleteUser(2)

  // await addUser('user1')

  // await addArticle({ id: 4, title: 'title1' })
  // await addArticle({ id: 4, title: 'title2' })

  // await addUserAndArticle({ name: 'user2', title: 'title1' })

  // await updateUser(4)
  // await updateArticle(4)

  await logTables()
}

// .................................................
async function addUser(name: string) {
  const data = {
    name,
    email: `${name}@gmail.com`,
  }
  const user = await prisma.user.create({ data })
  return user
}

async function addArticle({ id, title }: any) {
  // foreign key: article.authorId => user.id
  const author = {
    connect: { id },
  }
  const data = {
    title,
    body: 'content',
    author,
  }
  console.log(data)
  const article = await prisma.article.create({ data })
  return article
}

async function addUserAndArticle({ name, title }: any) {
  const articleData = {
    title,
    body: 'content',
  }
  const data = {
    name,
    email: `${name}@gmail.com`,
    articles: {
      create: articleData,
    },
  }
  const user = await prisma.user.create({ data })
  return user
}

async function updateUser(id: number) {
  const where = { id }
  const data = {
    email: `updated${id}@gmail.com`,
  }
  const user = await prisma.user.update({ where, data })
  return user
}

async function updateArticle(id: number) {
  const where = { id }
  const data = {
    body: 'updated',
  }
  const user = await prisma.article.update({ where, data })
  return user
}

async function deleteUser(id: number) {
  const where = { id }
  const user = prisma.user.delete({ where })
  return user
}

async function deleteArticle(id: number) {
  const where = { id }
  const article = prisma.article.delete({ where })
  return article
}

async function logTables() {
  const users = await prisma.user.findMany({
    include: {
      articles: true,
    },
  })
  const articles = await prisma.article.findMany()
  console.log(`users: ${JSON.stringify(users, null, 2)}`)
  console.log(`articles: ${JSON.stringify(articles, null, 2)}`)
}
