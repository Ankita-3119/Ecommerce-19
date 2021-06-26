import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
 
  public errMessage: any="";

  constructor(private snakebar:MatSnackBar,private authService:LoginService,private router:Router,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  onSubmit(f:NgForm){
    console.log(f.value);
    this.authService.signup(f.value).subscribe(
      (res)=>{
        console.log(res);
        this.openLoginDialog();
      },
      (err)=>{
        this.snakebar.open(err.error , 'Cancel');
        this.errMessage = err.error;
        console.log(err);
      }
    )
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  

}
