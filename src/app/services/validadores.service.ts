import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate{
  [s:string]: boolean
}

@Injectable({
  providedIn: 'root'
})

export class ValidadoresService {

  constructor() { }
  existeUsuario(control:FormControl): Promise<ErrorValidate> | Observable<ErrorValidate>{
    if(!control.value){
      return Promise.resolve({existe: false});
    }
  
    //validar si existe usuario raisen
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value === 'raizen'){
          resolve({existe:true});
        }else{
          resolve({existe:false});
        }
      },3500)
    });
  }
  noEsAdmin (control:FormControl): ErrorValidate{
    if(control.value?.toLowerCase() == 'admin'){
      return{noEsAdmin:true}
    }
    return{noEsAdmin:false}
  }

  passwordsIguales( pass1Name: string, pass2Name: string){
    return (formGroup : FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];
      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }
      else{
        pass2Control.setErrors({ noEsIgual: true});
      }
    }
  }
}
