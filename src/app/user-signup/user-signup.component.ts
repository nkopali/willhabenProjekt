import { Component, OnInit } from '@angular/core';
import {data} from '../MockDataBase'
import {Router} from '@angular/router';
@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  private db : any[];

  constructor(private router : Router) { }

  ngOnInit() {
    this.db = data
  }

  signup(username: string, password: string) {
    let user = {username:username,password:password};
    this.db.push(user);
    this.router.navigate(['/user-login']);
  }
}
