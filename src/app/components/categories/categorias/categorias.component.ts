import { Component, OnInit } from '@angular/core';
import { faCopy, faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  //Iconos para la pagina de grupos
  faCopy = faCopy;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
