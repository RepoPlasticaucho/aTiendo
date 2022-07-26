import { Component, OnInit } from '@angular/core';
import { faTimes, faUserFriends } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-grupos-edit',
  templateUrl: './grupos-edit.component.html',
  styleUrls: ['./grupos-edit.component.css']
})
export class GruposEditComponent implements OnInit {
  //Iconos para la pagina de grupos
  faTimes = faTimes;
  faUserFriends = faUserFriends;

  constructor() { }

  ngOnInit(): void {
  }

}
