import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, distinctUntilChanged, map, tap } from 'rxjs';
import { color } from 'console-log-colors';
import { NewToDoItem, ToDoItem } from './model';
import { Draft, produce } from 'immer';

type State = {
  readonly todos: ToDoItem[];
  readonly counter: number;
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
    counter: 0,
  });

  private getNextId() {
    const todos = this._state.value.todos;
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

  public incrementCounter() {
    this.updateState((s) => {
      s.counter++;
    });
  }

  public decrementCounter() {
    this.updateState((s) => {
      s.counter--;
    });
  }

  private logGet(
    which: 'default' | 'async' | 'signal',
    kind: 'todo' | 'counter'
  ) {
    const colorFn =
      which === 'default'
        ? color.blue
        : which === 'async'
        ? color.green
        : color.magenta;
    console.log(colorFn(`[get ${kind} ${which}]: ${++this._counter[which]}`));
  }

  public getTodos() {
    this.logGet('default', 'todo');
    return this._state.getValue().todos;
  }

  public getTodos$() {
    return this._state.asObservable().pipe(
      map((s) => s.todos),
      distinctUntilChanged(),
      tap(() => this.logGet('async', 'todo'))
    );
  }

  public getTodosSig() {
    return toSignal(
      this.getTodos$().pipe(tap(() => this.logGet('signal', 'todo')))
    );
  }

  public editTodo(id: number, updater: (draft: Draft<ToDoItem>) => void) {
    this.updateState((s) => {
      const todo = s.todos.find((t) => t.id === id);
      if (todo) {
        updater(todo);
      }
    });
  }

  public getCounter() {
    this.logGet('default', 'counter');
    return this._state.getValue().counter;
  }

  public getCounter$() {
    return this._state.asObservable().pipe(
      map((s) => s.counter),
      distinctUntilChanged(),
      tap(() => this.logGet('async', 'counter'))
    );
  }

  public getCounterSig() {
    return toSignal(
      this.getCounter$().pipe(tap(() => this.logGet('signal', 'counter')))
    );
  }
}
