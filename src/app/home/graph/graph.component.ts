import {Component, OnInit, Input} from '@angular/core';
import {DataSource} from '../home.component';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  @Input('dataSource') dataSource: DataSource[];
  date: any = [];
  quantite: any = [];

  public lineChartData: ChartDataSets[] = [
    {data: this.quantite, label: 'Quantité'}];
  public lineChartLabels: Label[] = this.date;


  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor() {
  }

  //
  // getYears() vérifie et additionne les quantités si la date précédente est identique (provisoire faute de mieux)
  //
  getYears() {
    this.dataSource.forEach(element => {
      element.Quantite = element.Quantite.replace(',', '.');
      if (element.Date_collecte === this.date[this.date.length - 1]) {
        let replace = parseFloat(element.Quantite) + parseFloat(this.quantite[this.quantite.length - 1]);
        this.quantite[this.quantite.length - 1] = replace;
      } else {
        this.quantite.push(element.Quantite);
        this.date.push(element.Date_collecte);
      }
    });
  }

  ngOnInit() {
    this.getYears();
  }
}
