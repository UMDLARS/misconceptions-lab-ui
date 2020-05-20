import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {jsonData} from '../../assets/anonymized-data';

@Component({
  selector: 'app-anonymized-data',
  templateUrl: './anonymized-data.component.html',
  styleUrls: ['./anonymized-data.component.css']
})

export class AnonymizedDataComponent implements OnInit {
  dataSource: LocalDataSource;
  tableSettings = {
    columns: {
      id: {
        title: 'ID',
        sort: true,
        sortDirection: 'asc',
      },
      occupation: {
        title: 'Occupation',
      },
      location: {
        title: 'Location',
      },
      gender: {
        title: 'Sex',
      },
      age: {
        title: 'Age',
      },
      marital_status: {
        title: 'Marital Status',
      },
      family_size: {
        title: 'Family Size',
      }
    },
    actions: false,
    hideHeader: false,
    noDataMessage: 'No results found',
  };

  public questions;
  constructor() {
    this.questions = [

      {prompt: '1) Question one?',
        options: [
          'Answer 0.',
          'Answer 1.',
          'Answer 2.',
          'Answer 3.'
        ],
        answer: '3',
        result: ' '},
      {prompt: '2) Question two?',
        options: [
          'Answer 0.',
          'Answer 1.',
          'Answer 2.',
          'Answer 3.'
        ],
        answer: '0',
        result: ' '}
    ];

  }

  ngOnInit(): void {
    this.dataSource = new LocalDataSource(jsonData);
  }
}
