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
  displayedColumns: string[] = ['Source', 'Date_collecte', 'Code_client', 'RS_client', 'Site', 'Type_collecte', 'Dechet', 'Quantite', 'Code_traitement', 'Annee', 'Mois'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.data = this.source;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //console.log(parseFloat(this.dataSource.data[0].Quantite.replace(',', '.')));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  convertInt(str) {
    return parseFloat(str.replace(',', '.'));
  }
}
