import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {data} from '../MockDataBase';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  private db: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    document.getElementById('wrong').style.display = 'none';//don't display wrong pass at the beginning
  }
  clearCache(){
    localStorage.removeItem("UserLoggedIn");
    console.log("Cache cleared");
  }
  check(username: string, password: string): void{
    this.db = data;
    if (this.db[0].username === username && this.db[0].password === password) { //check for valid usrname and password
      localStorage.setItem("UserLoggedIn","UserLoggedIn"); //adds to localstorage that the user logged in
      this.router.navigate(['/user-feed']);//navigate to next page
    } else{
      document.getElementById('wrong').style.display = 'block';//if pass wrong display wrong password
    }
  }
}
