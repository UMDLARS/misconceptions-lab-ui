import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {jsonData} from '../../assets/anonymized-data';

@Component({
  selector: 'app-anonymized-data',
  templateUrl: './anonymized-data.component.html',
  styleUrls: ['./anonymized-data.component.css']
})

export class AnonymizedDataComponent implements OnInit {
  constructor() {
  }

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
  message = 'Anonymized data can’t leak sensitive information.';

  ngOnInit(): void {
    this.dataSource = new LocalDataSource(jsonData);
  }
}
