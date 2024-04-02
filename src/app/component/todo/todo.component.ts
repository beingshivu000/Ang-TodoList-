import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { log } from 'console';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {
  tasks: { name: string; completed: boolean }[] = [];
  // completed!: any[];
  // pending!: any[];

  todoList!: FormGroup;


  constructor(@Inject(PLATFORM_ID) private platformid: object, private formBuilder: FormBuilder) {
    this.tasks = [];

    if (isPlatformBrowser(this.platformid)) {
      // console.log('Running in the browser');
      const storedTasks = localStorage.getItem('tasks');
      // console.log('Stored tasks:', storedTasks);
      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      }
    }
  }

  ngOnInit(): void {
    this.todoList = this.formBuilder.group({
      // Define your form controls here
      newTOdo: ['', [Validators.required, Validators.minLength(2)]],
      // completed:['']

    });
  };

  addTask(task: string): void {
    if(this.todoList.valid && task.trim() !== '') {
    this.tasks.push({name: task.trim(), completed: false});
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
    }
  
  removeTask(index: number): void {
    this.tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  
  onSubmit(): void {
    // console.log(this.todoList.value);
    if(this.todoList.valid){
    console.log('Form submitted!');
  }
  this.todoList.reset();
    }
  
  
    toggleTaskCompletion(index: number): void {
      this.tasks[index].completed = !this.tasks[index].completed;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

// addTask(task:string):void{
//  if(this.todoList.valid){
//   this.tasks.push(task);
//  }
// }

