import { Component, OnInit } from '@angular/core';
import datajson from '../../assets/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data1: DataSource[];
  dataload: boolean = false;

  constructor() { }

  ngOnInit() {
    this.data1 = datajson;
    this.dataload = true;
  }

}

export class DataSource {
  Source: string;
  Date_collecte: string;
  Code_client: string;
  RS_client: string;
  Site: string;
  Type_collecte: string;
  Dechet: string;
  Quantite: string;
  Code_traitement: string;
  Annee: number;
  Mois: number;
}
