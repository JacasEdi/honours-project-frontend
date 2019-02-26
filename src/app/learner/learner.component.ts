import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';
import { HttpClient } from '@angular/common/http';


const LEARNER_QUERY = gql`
  query{
    learner(id: "5c5dd1056957460c4ff04015") {
      firstName
      lastName
      email
      age
      enrolments {
        progress
        course {
          title
        }
        createdAt
        updatedAt
      }
    }
  }
`;

@Component({
  selector: 'app-learner',
  templateUrl: './learner.component.html',
  styleUrls: ['./learner.component.css']
})
export class LearnerComponent implements OnInit {
  options: FormGroup;
  displayedColumns: string[] = ['title', 'progress', 'createdAt', 'updatedAt'];
  learner: any;
  private querySubscription: Subscription;

  constructor(private apollo: Apollo, private http: HttpClient, fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }

  ngOnInit() {
    this.getLearnerWithRest();
    // this.getLearnerWithGraphql();
  }

  getLearnerWithRest() {
      this.http.get<any>('http://localhost:3100/learners/5c5dd1056957460c4ff04015').subscribe(data => {
        this.learner = data;
      });
  }

  getLearnerWithGraphql() {
    this.querySubscription = this.apollo.watchQuery<any>({ query: LEARNER_QUERY }).valueChanges
      .subscribe(({ data }) => {
        this.learner = data.learner;
      });
  }

}
