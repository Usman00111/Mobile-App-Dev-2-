import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: false
})
export class TasksPage implements OnInit {

  constructor(private router: Router) { }

  //navigate to the add task page
  goToAddTask(){
    this.router.navigateByUrl('/add-task')
  }

  ngOnInit() {
  }

}
