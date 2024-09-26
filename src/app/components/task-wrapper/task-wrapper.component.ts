import { CommonModule } from "@angular/common";
import { Component, signal, computed, inject, viewChild, output } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { PaginationTask } from "@app/enums/pagination-task.enum";
import { SearchTask } from "@app/enums/search-task.enum";
import { SearchType } from "@app/models/search-type.model";
import { Task } from "@app/models/task-model";
import { TaskService } from "@app/services/task.service";
import { TaskCardComponent } from "../task-card/task-card.component";
import { MatCardModule } from "@angular/material/card";
import { TaskEditComponent } from "../task-edit/task-edit.component";


@Component({
  selector: 'app-task-wrapper',
  standalone: true,
  imports: [
    TaskCardComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    TaskEditComponent
  ],
  templateUrl: './task-wrapper.component.html',
  styleUrl: './task-wrapper.component.scss'
})
export class TaskWrapperComponent {
  tasks = signal<Task[]>([]);
  search = signal<string>(SearchTask.EMPTY_STRING);
  pageSize = signal<number>(PaginationTask.PAGE_SIZE);
  pageIndex = signal<number>(PaginationTask.INITIAL_VALUE_ZERO);
  pageLength = signal<number>(PaginationTask.INITIAL_VALUE_ZERO);
  pageSizeOptions: number[] = [1, 2, 3];
  hidePageSize: boolean = false;
  showPageSizeOptions: boolean = true;
  showFirstLastButtons: boolean = true;
  disabled: boolean = false;
  loading: boolean = false;
  searchTypes: SearchType[] = [
    { value: SearchTask.NAME_TYPE, viewValue: 'Name' },
    { value: SearchTask.DATE_TYPE, viewValue: 'Date' },
  ];
  selectedSearchType = signal<string>(SearchTask.NAME_TYPE);
  placeholderSearch = computed(() => {
    const type: string = this.selectedSearchType();
    return type == SearchTask.NAME_TYPE ? 'Task XPTO' : 'DD/MM/YYYY';
  });

  filteredList = computed(() => {
    const array: Task[] = this.tasks();
    const search: string = this.search().toLowerCase();
    const pageSize: number = this.pageSize();
    const selectedSearch: string = this.selectedSearchType();
    let filteredArray: Task[] = [];

    if (array.length > 0) {
      filteredArray = array.filter((task: Task) => {
        if (selectedSearch === SearchTask.NAME_TYPE) {
          return task.name.toLowerCase().includes(search);
        } else if (selectedSearch === SearchTask.DATE_TYPE) {
          return task.date.toLowerCase().includes(search);
        }
        return false;
      });
    }

    const startIndex: number = this.pageIndex() * pageSize;
    const endIndex: number = Math.min(startIndex + pageSize, filteredArray.length);

    return filteredArray.slice(startIndex, endIndex);
  });

  private taskService = inject(TaskService);

  editTask!: Task;

  ngOnInit(): void {
    this.loading = true;
    this.taskService.retrieveAll().subscribe((data: Task[]) => {
      this.tasks.set(data);
      this.pageLength.set(this.tasks().length);
      this.selectedSearchType.set(SearchTask.NAME_TYPE);
      this.loading = false;
    });
  }

  clearSearch() {
    this.search.set(SearchTask.EMPTY_STRING);
    this.resetPageIndex();
  }

  resetPageIndex() {
    this.pageIndex.set(PaginationTask.INITIAL_VALUE_ZERO);
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
    this.pageLength.set(e.length);
  }

  setSearchType(searchType: SearchType) {
    this.selectedSearchType.set(searchType.value);
    this.resetPageIndex();
  }

  edit(task: Task) {
    this.editTask = task;
  }

  deleteTask(task: Task) {
    this.loading = true;
    this.taskService.delete(task).subscribe((tasks: Task[]) => {
      this.tasks.set(tasks);
      this.loading = false;
    });
  }

  updateTasks(tasks: Task[]){
    this.tasks.set(tasks);
  }
}
