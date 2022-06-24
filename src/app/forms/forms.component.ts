import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormArray,Validators } from '@angular/forms';
import { ValidadoresService } from '../services/validadores.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  forma! : FormGroup;

  constructor(private fb: FormBuilder, private validadores : ValidadoresService) {
    this.crearFormulario();
    this.CargarDatAlForm();
    this.crearListeners();
  }

  ngOnInit(): void {
  }
  get pasaTiempos(){
    return this.forma.get('pasaTiempos') as FormArray;
  }
  get nombreNoValido(){
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
  }

  get apellidoNoValido(){
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
  }

  get correoNoValido(){
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
  }

  get usuarioNoValido(){
    return this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched
  }

  get direccionNoValido(){
    return this.forma.get('direccion')?.invalid && this.forma.get('direccion')?.touched
  }

  get pass1NoValido(){
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched
  }

  get pass2NoValido(){
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;
    return (pass1 === pass2) ? false : true;
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre : ['',[Validators.required, Validators.minLength(5)]],
      apellido : ['',[Validators.required, this.validadores.noEsAdmin]],
      correo : ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$')]],
      usuario : ['',,this.validadores.existeUsuario],
      pass1 : ['',Validators.required],
      pass2 : ['', Validators.required],
      direccion : ['', Validators.required],
      pasaTiempos : this.fb.array([])
    }),
    {
      Validators : this.validadores.passwordsIguales('pass1','pass2')
    }
  }
  CargarDatAlForm(){
    this.forma.reset({
    nombre : 'Daniela',
    apellido : 'Monkey',
    correo : 'dani@gmail.com',
    usuario : 'DaMo25',
    pass1 : 'Sony_Mo',
    pass2 : 'Sony_Mo',
    direccion : 'Avenida Paz'
    });
  }
  crearListeners(){
    this.forma.get('nombre')?.valueChanges.subscribe(console.log);
  }
}
