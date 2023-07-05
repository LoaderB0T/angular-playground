import { Component } from '@angular/core';
import { StoreService } from '../store.service';
import { ToDoItem } from '../model';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {
  public items: ToDoItem[] = [];

  constructor(private readonly todoStore: StoreService) {}

  ngOnInit() {
    this.items = this.todoStore.getTodos();
  }

  public addTodo(value: string) {
    this.todoStore.addTodo({ title: value });
    this.items = this.todoStore.getTodos();
  }

  public todoCompleted(item: ToDoItem) {
    this.todoStore.editTodo(item.id, (draft) => {
      draft.completed = !draft.completed;
    });
    this.items = this.todoStore.getTodos();
  }
}
