import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
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
}
