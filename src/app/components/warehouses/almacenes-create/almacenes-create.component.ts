import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave, faTimes, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { GruposEntity } from 'src/app/models/grupos';
import { SociedadesEntity } from 'src/app/models/sociedades';
import { GruposService } from 'src/app/services/grupos.service';
import { SociedadesService } from 'src/app/services/sociedades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-almacenes-create',
  templateUrl: './almacenes-create.component.html',
  styleUrls: ['./almacenes-create.component.css']
})
export class AlmacenesCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
