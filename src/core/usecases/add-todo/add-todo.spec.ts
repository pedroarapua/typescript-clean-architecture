import { AddTodo } from './add-todo'
import { AddTodoEntity, TodoEntity, AddTodoRepository } from './add-todo-protocols'

const makeFakeDataAddTodoModel = (): AddTodoEntity => ({
  name: 'valid_name'
})

const makeAddTodoRepository = (): AddTodoRepository => {
  class AddTodoRepositoryStub implements AddTodoRepository {
    async add (addTodoEntity: AddTodoEntity): Promise<TodoEntity> {
      const fakeResponse : TodoEntity = {
        id: 'valid_id',
        name: 'valid_name'
      }
      return new Promise<TodoEntity>(resolve => resolve(fakeResponse))
    }
  }
  return new AddTodoRepositoryStub()
}

interface SubTypes {
  sut: AddTodo
  addTodoRepositoryStub: AddTodoRepository
}

const makeSut = (): SubTypes => {
  const addTodoRepositoryStub = makeAddTodoRepository()
  const sut = new AddTodo(addTodoRepositoryStub)
  return {
    sut,
    addTodoRepositoryStub
  }
}

describe('AddTodo UseCase', () => {
  test('Should call AddTodoRepository with correct values', async () => {
    const { sut, addTodoRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addTodoRepositoryStub, 'add')
    await sut.add(makeFakeDataAddTodoModel())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name'
    })
  })
})