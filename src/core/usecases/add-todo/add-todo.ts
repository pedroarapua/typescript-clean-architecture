import { AddTodoEntity, TodoEntity, AddTodoRepository } from './add-todo-protocols'

export class AddTodo {
  constructor (
    private readonly addTodoRepository: AddTodoRepository
  ) {
    this.addTodoRepository = addTodoRepository
  }

  async add (addTodoData: AddTodoEntity): Promise<TodoEntity> {
    return await this.addTodoRepository.add(addTodoData)
  }
}