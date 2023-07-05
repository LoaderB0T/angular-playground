import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map } from 'rxjs';
import { ToDoItem } from './model';
import { Draft, produce } from 'immer';

type State = {
  readonly todos: ToDoItem[];
};

@Injectable({ providedIn: 'root' })
export class StoreService {
  private _state = new BehaviorSubject<State>({
    todos: [],
  });

  private updateState(fn: (state: Draft<State>) => void) {
    const oldState = this._state.getValue();
    const newState = produce(oldState, (s) => fn(s));
    this._state.next(newState);
  }

  public addTodo(todo: ToDoItem) {
    this.updateState((s) => {
      s.todos.push(todo);
    });
  }

  public getTodos() {
    return this._state.getValue().todos;
  }

  public getTodos$() {
    return this._state.asObservable().pipe(map((s) => s.todos));
  }

  public getTodosSig() {
    return toSignal(this.getTodos$());
  }
}
