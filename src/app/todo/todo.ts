import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.html',
  styleUrl: './todo.css',
  standalone: true,
  imports: [CommonModule],  
})
export class Todo {
  todos = signal<{ text: string; done: boolean }[]>([]);

  completedCount = computed(() =>
    this.todos().filter(t => t.done).length
  );

  add(text: string) {
    if (!text.trim()) return;

    this.todos.update(list => [
      ...list,
      { text, done: false }
    ]);
  }

  toggle(index: number) {
    this.todos.update(list =>
      list.map((t, i) =>
        i === index ? { ...t, done: !t.done } : t
      )
    );
  }

  remove(index: number) {
    this.todos.update(list =>
      list.filter((_, i) => i !== index)
    );
  }
}
