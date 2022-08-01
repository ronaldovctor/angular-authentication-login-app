import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  public people$?: Observable<Person[]>

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.people$ = this.mainService.getPeople()
  }

}
