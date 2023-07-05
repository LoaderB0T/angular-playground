import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreService } from '../store.service';
import { ToDoItem } from '../model';

@Component({
  selector: 'app-on-push-async',
  templateUrl: './on-push-async.component.html',
  styleUrls: ['./on-push-async.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnPushAsyncComponent {
  items: ToDoItem[] = [];

  constructor(private readonly todoStore: StoreService) {
    todoStore.getTodos$().subscribe((todos) => {
      this.items = todos.todos;
    });
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
