import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../models/task-model';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginationTask } from '../../enums/pagination-task.enum';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { SearchTask } from '../../enums/search-task.enum';
import { SearchType } from '../../models/search-type.model';
import { TaskService } from '../../services/task.service';
import { TaskWrapperComponent } from "../../components/task-wrapper/task-wrapper.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TaskWrapperComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
