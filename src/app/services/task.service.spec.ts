import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService);
  });

  // it('should be created', (done: DoneFn) => {
  //   const expectedValue = 4;

  //   service.getData(2).subscribe({
  //     next: (value) => {
  //       expect(value).withContext('expected a value').toEqual(expectedValue);
  //       done();
  //     },
  //     error: done.fail,
  //   });
  // });
});
