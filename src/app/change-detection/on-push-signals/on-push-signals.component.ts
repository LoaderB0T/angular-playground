import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { StoreService } from '../store.service';
import { ToDoItem } from '../model';

@Component({
  selector: 'app-on-push-signals',
  templateUrl: './on-push-signals.component.html',
  styleUrls: ['./on-push-signals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnPushSignalsComponent {
  items = this.todoStore.getTodosSig();
  counter = this.todoStore.getCounterSig();

  count = computed(() => this.items()?.length ?? 0);

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
