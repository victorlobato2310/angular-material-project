import { Injectable } from '@angular/core';
import { Task } from '@app/models/task-model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[] = [
    {
      id: 1,
      name: 'Task 1',
      description: 'Complete the report',
      date: '23/10/2024'
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Prepare presentation slides',
      date: '19/01/2024'
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Attend project meeting',
      date: '23/11/2024'
    }
  ];

  retrieveAll(): Observable<Task[]>{
    return of(this.tasks);
  }

  edit(task: Task) {
    let index: number = this.tasks.findIndex((item: Task) => task.id == item.id);

    if(index == -1) {
      return;
    }

    this.tasks[index] = { ...task };
    this.tasks = [...this.tasks];

    return of(this.tasks);
  }

  delete(task: Task) {
    return of(this.tasks.filter((item: Task)  => item.id != task.id));
  }
}
