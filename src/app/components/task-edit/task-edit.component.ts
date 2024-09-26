import { ChangeDetectionStrategy, Component, inject, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task } from '@app/models/task-model';
import { TaskService } from '@app/services/task.service';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatCardModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskEditComponent implements OnInit, OnChanges {
  task = input<Task | any>();
  show: boolean = false;
  private taskService = inject(TaskService);
  updateTasks = output<Task[]>();
  form!: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['task']) {
      this.setTaskToForm();
      this.show = true;
    } else {
      this.show = false;
    }
  }

  ngOnInit(): void {
    this.show = false;
    this.createForm();
  }

  createForm(){
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  setTaskToForm(){
    if(this.task()){
      this.form.controls['name'].setValue(this.task().name);
      this.form.controls['description'].setValue(this.task().description);
    }
  }

  editTask() {
    let task: Task = {
      id: this.task().id,
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      date: this.task().date,
    };

    this.taskService.edit(task)?.subscribe((tasks: Task[]) => {
      this.updateTasks.emit(tasks);
      this.show = false;
    });
  }

  cancel() {
    this.show = false;
  }
}
