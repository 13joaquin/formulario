import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';


@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  forma!: FormGroup;
  constructor(private fb: FormBuilder,private validadores : ValidadoresService) {
    //Crear Formularios
    this.crearFormulario();
    //Cargar data ala formulario nombre:'David'
    this.CargarDataAlFormulario();
    //Crear listeners
   this.crearListeners(); 
   }
   crearListeners(){
    //This.forma.valueChanges.subscribe(data => console.log(data);)
    //this.forma.statursChanges..subscribe(data => console.log(data);
   }
crearFormulario(){
  this.forma = this.fb.group({
    nombre: ['',[Validators.required, Validators.minLength(5)]],
    apellido : ['',[Validators.required, this.validadores.noEsAdmin]],
    correo : ['',[Validators.required, Validators.pattern('[a-z0-9._%+-[a-z0-9.-]+\.[a-z]{2,3}$')]],
    usuario : ['',,this.validadores.existeUsuario],
    pass1 : ['', Validators.required],
    pass2 : ['', Validators.required],
    direccion : this.fb.group({
      municipio : ['', Validators.required],
      ciudad : ['', Validators.required],
    }),
   pasaTiempos : this.fb.array([])
  }),{
    validadores : this.validadores.passwordsIguales('pass1','pass2')
  }
}
CargarDataAlFormulario(){
this.forma.reset({
  nombre: 'David',
  apellido: 'Muñoz',
  correo: 'david.muñoz13@gmail.com',
  usuario: 'david',
  pass1: 'AtackOnTitan',
  pass2: 'AtackOnTitan',
  direccion: {
    municipio: 'San Jose Pinula',
    ciudad: 'Guatemala'
  }
});
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
  get municipioNoValido(){
    return this.forma.get('municipio')?.invalid && this.forma.get('direccion.municipio')?.touched
  }
  get cuidadNoValido(){
    return this.forma.get('cuidad')?.invalid && this.forma.get('direcccion.cuidad')?.touched
  }
  get pass1NoValido(){
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched
  }
  get pass2NoValido(){
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;

    return (pass1 === pass2) ? false : true;
  }
}
