import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave, faList, faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventarios-create',
  templateUrl: './inventarios-create.component.html',
  styleUrls: ['./inventarios-create.component.css']
})
export class InventariosCreateComponent implements OnInit {

  //Iconos para la pagina de grupos
  faList = faList;
  faTimes = faTimes;
  faSave = faSave;
  //Creación de la variable para formulario
  inventarioForm = new FormGroup({
    categoria: new FormControl('', Validators.required),
    linea: new FormControl('',),
    marca_id: new FormControl('0'),
    marca: new FormControl('0', Validators.required),
    stock: new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
