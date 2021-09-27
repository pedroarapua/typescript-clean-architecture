import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL, process.env.MONGO_DBNAME)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    await sut.disconnect()
    let todoCollection = await sut.getCollection('todos')
    expect(todoCollection).toBeTruthy()
  })
})