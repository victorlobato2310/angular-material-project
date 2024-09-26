import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaskWrapperComponent } from './task-wrapper.component';
import { SearchTask } from '@app/enums/search-task.enum';
import { PaginationTask } from '@app/enums/pagination-task.enum';
import { PageEvent } from '@angular/material/paginator';
import { SearchType } from '@app/models/search-type.model';
import { Task } from '@app/models/task-model';
import { signal } from '@angular/core';

describe('TaskWrapperComponent', () => {
  let component: TaskWrapperComponent;
  let fixture: ComponentFixture<TaskWrapperComponent>;

  let tasksMock: Task[] = [
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskWrapperComponent,
        TaskCardComponent,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear search input and set default EMPTY_STRING', () => {
    const searchSpy = spyOn(component.search, 'set');

    component.clearSearch();

    expect(searchSpy).toHaveBeenCalledOnceWith(SearchTask.EMPTY_STRING);
  });

  it('should reset page index', () => {
    const pageIndexSpy = spyOn(component.pageIndex, 'set');

    component.resetPageIndex();

    expect(pageIndexSpy).toHaveBeenCalledOnceWith(PaginationTask.INITIAL_VALUE_ZERO);
  });

  it('should trigger page event method and set values to its corresponding signals', () => {
    const pageIndexSpy = spyOn(component.pageIndex, 'set');
    const pageSizeSpy = spyOn(component.pageSize, 'set');
    const pageLengthSpy = spyOn(component.pageLength, 'set');

    const event: PageEvent = {
      pageIndex: 0,
      pageSize: 0,
      length: 0
    };

    component.handlePageEvent(event);

    expect(pageIndexSpy).toHaveBeenCalledOnceWith(event.pageIndex);
    expect(pageSizeSpy).toHaveBeenCalledOnceWith(event.pageSize);
    expect(pageLengthSpy).toHaveBeenCalledOnceWith(event.length);
  });

  it('should set search type to NAME', () => {
    const selectedSearchTypeSpy = spyOn(component.selectedSearchType, 'set');
    const resetPageIndexSpy = spyOn(component, 'resetPageIndex');
    const searchType: SearchType = component.searchTypes[0];

    component.setSearchType(searchType);

    expect(selectedSearchTypeSpy).toHaveBeenCalledOnceWith(SearchTask.NAME_TYPE);
    expect(resetPageIndexSpy).toHaveBeenCalledTimes(1);
  });

  it('should set search type to DATE', () => {
    const selectedSearchTypeSpy = spyOn(component.selectedSearchType, 'set');
    const resetPageIndexSpy = spyOn(component, 'resetPageIndex');
    const searchType: SearchType = component.searchTypes[1];

    component.setSearchType(searchType);

    expect(selectedSearchTypeSpy).toHaveBeenCalledOnceWith(SearchTask.DATE_TYPE);
    expect(resetPageIndexSpy).toHaveBeenCalledTimes(1);
  });

  it('should return an empty array if no tasks exist', () => {
    component.tasks = signal<Task[]>([]);
    component.search = signal<string>(SearchTask.EMPTY_STRING);
    component.selectedSearchType = signal<string>(SearchTask.NAME_TYPE);

    spyOn(component, 'filteredList').and.returnValue([]);

    const result: Task[] = component.filteredList();

    expect(result.length).toBe(0);
  });

  it('should return an array of tasks by NAME', () => {
    component.tasks = signal<Task[]>(tasksMock);
    component.search = signal<string>('Task');
    component.selectedSearchType = signal<string>(SearchTask.NAME_TYPE);

    spyOn(component, 'filteredList').and.returnValue(tasksMock);

    const result: Task[] = component.filteredList();

    expect(result.length).toBe(3);
  });

  it('should return an array of tasks by DATE', () => {
    component.tasks = signal<Task[]>(tasksMock);
    component.search = signal<string>('01/01/2001');
    component.selectedSearchType = signal<string>(SearchTask.DATE_TYPE);

    spyOn(component, 'filteredList').and.returnValue([]);

    const result: Task[] = component.filteredList();

    expect(result.length).toBe(0);
  });

});
