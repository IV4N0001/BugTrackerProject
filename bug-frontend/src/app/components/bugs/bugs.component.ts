import { Component, OnInit } from '@angular/core';
import { BugService } from 'src/app/services/bug.service';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})

export class BugsComponent implements OnInit {
  bugs: any[] = [];

  constructor(private bugService: BugService) { }

  ngOnInit(): void {
    this.loadBugs();
  }

  loadBugs() {
    this.bugService.getBugs().subscribe(
      (data) => {
        this.bugs = data;

        // Aquí puedes acceder a la información del usuario para cada bug
        this.bugs.forEach(bug => {
          console.log(bug);
        });
      },
      (error) => {
        console.error('Error fetching bugs:', error);
      }
    );
  }
}