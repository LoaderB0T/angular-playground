export type ToDoItem = NewToDoItem & {
  readonly id: number;
  readonly completed: boolean;
};

export type NewToDoItem = {
  readonly title: string;
};
