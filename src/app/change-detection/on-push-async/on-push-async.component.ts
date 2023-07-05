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
  items$ = this.todoStore.getTodos$();

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
