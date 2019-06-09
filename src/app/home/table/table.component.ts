import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '../home.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {element} from 'protractor';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input('dataSource') source: DataSource[];
  displayedColumns: string[] = ['Dechet', 'Date_collecte', 'Code_client', 'Quantite'];
  Code_client = ['ID1A', 'ID2C', 'ID1B', 'ID3C', 'ID2B'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    this.dataSource.data = this.source;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.typeSorter();
  }
  typeSorter() {
    //const dechets = ['Canettes', 'Cartons', 'DIB BCG', 'Gobelets plastique', 'Palettes', 'Papiers mélangés', 'Bouteilles plastique', 'Piles et batteries', 'Capsules Nespresso', 'D3E', 'Cartouches', 'Ferraille', 'DIB Papiers', 'Ampoules', '2. PEHD', 'DIB', 'Verre', 'Gobelets carton', 'Bio déchet', 'Papiers confidentiels', 'DIB Cartons', 'Papiers blancs'];
    let sortedYear = [];
    let sortedQuantite = [];
    this.source.forEach(element => {
      if (sortedYear.includes(element.Annee) === false) {
          sortedYear.push(element.Annee);
      } else {
          if (JSON.stringify(sortedQuantite).includes(element.Date_collecte.substring(3, 10)) === false) {
              sortedQuantite.push([element.Date_collecte.substring(3, 10)]);
          } else {
              if ([sortedQuantite[element.Date_collecte.substring(3, 10)]].includes(element.Dechet) === false) {
                  [sortedQuantite[element.Date_collecte.substring(3, 10)]] = element.Dechet;
                  //console.log(element.Dechet);
              }
          }
      }
    });
    [sortedQuantite].forEach(item => {
           console.log(item);
    });
  }

  cutDate(str) {
      return str.substring(3, 10);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  convertInt(str) {
    return parseFloat(str.replace(',', '.'));
  }
}
