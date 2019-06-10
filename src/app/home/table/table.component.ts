import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '../home.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input('dataSource') source: DataSource[];
  displayedColumns: string[] = ['Dechet', 'Date_collecte', 'Code_client', 'Quantite'];
  Code_client = ['ID1A', 'ID2C', 'ID1B', 'ID3C', 'ID2B'];
  dataSorted = [];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    this.dataSource.data = this.source;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSorted = this.typeSorter();
  }

  typeSorter() {
      // const dechets = ['Canettes', 'Cartons', 'DIB BCG', 'Gobelets plastique', 'Palettes', 'Papiers mélangés', 'Bouteilles plastique', 'Piles et batteries', 'Capsules Nespresso', 'D3E', 'Cartouches', 'Ferraille', 'DIB Papiers', 'Ampoules', '2. PEHD', 'DIB', 'Verre', 'Gobelets carton', 'Bio déchet', 'Papiers confidentiels', 'DIB Cartons', 'Papiers blancs'];
          const sortedMonth = [];
          this.source.forEach(element => {
              const month = element.Date_collecte.substring(3, 10);
              if (!sortedMonth[month]) {
                  sortedMonth[month] = [];
              }
              if (!sortedMonth[month][element.Dechet]) {
                  sortedMonth[month][element.Dechet] = this.convertInt(element.Quantite);
              } else {
                  sortedMonth[month][element.Dechet] = sortedMonth[month][element.Dechet] + this.convertInt(element.Quantite);
              }

          });
          console.log(sortedMonth);
          return sortedMonth;
      }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  convertInt(str) {
    return Math.round(parseFloat(str.replace(',', '.')));
  }
}
