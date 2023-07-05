import { Component } from '@angular/core';
import { StoreService } from '../store.service';
import { ToDoItem } from '../model';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {
  public get items(): ToDoItem[] {
    return this.todoStore.getTodos();
  }

  constructor(private readonly todoStore: StoreService) {}

  public addTodo(value: string) {
    this.todoStore.addTodo({ title: value });
  }

  public todoCompleted(item: ToDoItem) {
    this.todoStore.editTodo(item.id, (draft) => {
      draft.completed = !draft.completed;
    });
  }
}
