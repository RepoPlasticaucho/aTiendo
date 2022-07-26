import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faAngleDoubleLeft, faTimes, faUserFriends } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-grupos-create',
  templateUrl: './grupos-create.component.html',
  styleUrls: ['./grupos-create.component.css']
})
export class GruposCreateComponent implements OnInit {
  //Iconos para la pagina de grupos
  faTimes = faTimes;
  faUserFriends = faUserFriends;
  //Creación de la variable para formulario
  constructor() { }

  ngOnInit(): void {
  }

}
