import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map, tap } from 'rxjs';
import chalk from 'chalk';
import { NewToDoItem, ToDoItem } from './model';
import { Draft, produce } from 'immer';

type State = {
  readonly todos: ToDoItem[];
};

@Injectable({ providedIn: 'root' })
export class StoreService {
  private _counter = {
    default: 0,
    async: 0,
    signal: 0,
  };

  private _state = new BehaviorSubject<State>({
    todos: [],
  });

  private getNextId() {
    const todos = this.getTodos();
    return todos.length === 0 ? 1 : Math.max(...todos.map((t) => t.id)) + 1;
  }

  private updateState(fn: (state: Draft<State>) => void) {
    const oldState = this._state.getValue();
    const newState = produce(oldState, (s) => fn(s));
    this._state.next(newState);
  }

  public addTodo(todo: NewToDoItem) {
    const newTodo: ToDoItem = {
      ...todo,
      id: this.getNextId(),
      completed: false,
    };
    this.updateState((s) => {
      s.todos.push(newTodo);
    });
  }

  private logGet(which: 'default' | 'async' | 'signal') {
    const chalkFn =
      which === 'default'
        ? chalk.blue
        : which === 'async'
        ? chalk.green
        : chalk.magenta;
    console.log(chalkFn(`[get ${which}]: ${++this._counter[which]}`));
  }

  public getTodos() {
    this.logGet('default');
    return this._state.getValue().todos;
  }

  public getTodos$() {
    return this._state.asObservable().pipe(tap(() => this.logGet('async')));
  }

  public getTodosSig() {
    return toSignal(this.getTodos$().pipe(tap(() => this.logGet('signal'))));
  }

  public editTodo(id: number, updater: (draft: Draft<ToDoItem>) => void) {
    this.updateState((s) => {
      const todo = s.todos.find((t) => t.id === id);
      if (todo) {
        updater(todo);
      }
    });
  }
}
