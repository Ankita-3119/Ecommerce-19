import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/Ilogin';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public err:any = ""
  loginForm:FormGroup;
  user = {} as User;  //instance
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private loginService: LoginService, 
    private fb: FormBuilder,
    private router: Router,
    private snakeBar:MatSnackBar ) {}

    ngOnInit() {
      this.loginForm = this.fb.group({
        email: [''],
        password: ['']
      })
    }
    login(){
      if (this.loginForm.valid){
        console.log(this.loginForm.value);
        this.loginService.login(this.loginForm.value).subscribe((res)=>{
          console.log(res)
          localStorage.setItem('token' , res.token);
          this.onNoClick();
          this.router.navigate(['/home'])
        } , 
          (err)=>{
            console.log(err.error)
            this.err = err.error
            this.snakeBar.open(err.error , 'Cancel')
          })
        // this.loginService.loggedIn.next(this.user);
      
      }else{
        console.log('Error')
      }
      
    }
    hide(){
      this.onNoClick();
    }
 
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
