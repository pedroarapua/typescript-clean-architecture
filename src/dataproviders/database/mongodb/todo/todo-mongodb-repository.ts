import { AddTodoRepository, AddTodoEntity, TodoEntity } from '../../../../core/usecases/add-todo/add-todo-protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class TodoMongoDbRepository implements AddTodoRepository {
  async add (todoData: AddTodoEntity): Promise<TodoEntity> {
    const todoCollection = await MongoHelper.getCollection('todos')
    const { insertedId } = await todoCollection.insertOne(todoData)
    const result =  await todoCollection.findOne({ _id: insertedId })
    return MongoHelper.map(result)
  }
}