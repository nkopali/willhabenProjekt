import { Component, OnInit } from '@angular/core';
import {data} from '../MockDataBase'
import {Router} from '@angular/router';
import {ServerService} from '../server.service';
@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  private db : any[];

  constructor(private router : Router, private serverService: ServerService) { }

  ngOnInit() {
    this.db = data
  }

  signup(username: string, password: string, firstname:string, lastname:string, email:string) {
    const data = {
      'username':username,
      'userpassword': password,
      'surname': lastname,
      'firstname': firstname,
      'email':email
    }

    this.serverService.register(data).subscribe((data)=>{
      console.log(data);
    })

    /*
    let user = {username:username,password:password};
    this.db.push(user);
    this.router.navigate(['/user-login']);*/
  }
}
