import { TodoEntity } from 'src/core/entities/todo'
import { MongoHelper } from '../helpers/mongo-helper'
import { TodoMongoDbRepository } from './todo-mongodb-repository'

let todoCollection

describe('Todo MongoDb Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL, process.env.MONGO_DBNAME)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    todoCollection = await MongoHelper.getCollection('todos')
    await todoCollection.deleteMany({})
  })

  const makeSut = (): TodoMongoDbRepository => {
    return new TodoMongoDbRepository()
  }

  describe('add()', () => {
    test('Should return an todo on add success', async () => {
      const sut = makeSut()
      const todo:TodoEntity = await sut.add({
        name: 'any_name'
      })
      expect(todo).toBeTruthy()
      expect(todo.id).toBeTruthy()
      expect(todo.name).toBe('any_name')
    })
  })
})