import { AddTodo } from './add-todo'
import { AddTodoEntity, TodoEntity, AddTodoRepository } from './add-todo-protocols'

const makeFakeDataAddTodoEntity = (): AddTodoEntity => ({
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
    const addTodoData = makeFakeDataAddTodoEntity()
    await sut.add(addTodoData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name'
    })
  })

  test('Should throw if AddTodoRepository throws', async () => {
    const { sut, addTodoRepositoryStub } = makeSut()
    const addTodoData = makeFakeDataAddTodoEntity()
    jest.spyOn(addTodoRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(addTodoData)
    expect(promise).rejects.toThrow()
  })
})