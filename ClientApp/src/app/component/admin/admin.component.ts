import { Component, OnInit } from '@angular/core';

@Component({
  template: `<h1>Admin</h1>
  <chart type="pie" [data]="data"></chart>
  `
})

export class AdminComponent implements OnInit {
  data = {
    labels: ['Maruti', 'Honda', 'Hyundai', 'Tata'],
    datasets: [
        {
            data: [5, 3, 2, 4],
            backgroundColor: [
                'red',
                'black',
                'grey',
                'yellow'
            ]
        }
    ]
  };

  constructor() { }

  ngOnInit() { }
}
