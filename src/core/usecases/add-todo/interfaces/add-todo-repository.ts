import { TodoEntity } from "../../../entities/todo";
import { AddTodoEntity } from "../../../entities/add-todo";


export interface AddTodoRepository {
  add (addTodoEntity: AddTodoEntity): Promise<TodoEntity>
}