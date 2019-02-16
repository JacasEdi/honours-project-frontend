import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';
import { HttpClient } from '@angular/common/http';


const COURSES_QUERY = gql`
  query courses {
    courses {
      id
      title
      description
      date
      location
    }
  }
`;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'date', 'location'];
  courses: any[];
  private querySubscription: Subscription;

  constructor(private apollo: Apollo, private http: HttpClient) { }

  ngOnInit() {
    // this.getCoursesWithRest();
    this.getCoursesWithGraphql();
  }

  getCoursesWithRest() {
    this.http.get<any>('http://localhost:3100/courses').subscribe(data => {
      this.courses = data.courses;
    });
  }

  getCoursesWithGraphql() {
    this.querySubscription = this.apollo.watchQuery<any>({ query: COURSES_QUERY }).valueChanges
      .subscribe(({ data }) => {
        this.courses = data.courses;
      });
  }
}
