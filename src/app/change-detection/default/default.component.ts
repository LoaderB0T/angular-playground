import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StoreService } from '../store.service';
import { ToDoItem } from '../model';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {
  public get items(): ToDoItem[] {
    return this.todoStore.getTodos();
  }

  public get count(): number {
    return this.items.length;
  }

  public get counter() {
    return this.todoStore.getCounter();
  }

  constructor(private readonly todoStore: StoreService) {}

  public addTodo(value: string) {
    if (!value) return;
    this.todoStore.addTodo({ title: value });
  }

  public todoCompleted(item: ToDoItem) {
    this.todoStore.editTodo(item.id, draft => {
      draft.completed = !draft.completed;
    });
  }

  public incrementCounter() {
    this.todoStore.incrementCounter();
  }

  public decrementCounter() {
    this.todoStore.decrementCounter();
  }
}
