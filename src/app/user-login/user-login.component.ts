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
    document.getElementById('wrong').style.display = 'none';
  }
  check(username: string, password: string): void{
    this.db = data;
    if (this.db[0].username === username && this.db[0].password === password) {
      this.router.navigate(['/user-feed']);
    } else{
      document.getElementById('wrong').style.display = 'block';
    }
  }
}
