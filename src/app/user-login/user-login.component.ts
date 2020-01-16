import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServerService} from '../server.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  private db: any[];

  constructor(private router: Router, private serverService: ServerService) {
  }

  ngOnInit() {
    document.getElementById('wrong').style.display = 'none'; //don't display wrong pass at the beginning
  }

  clearCache() {
    localStorage.removeItem('UserLoggedIn');
    console.log('Cache cleared');
  }

  redirect() {
    console.log('Sign up');
    this.router.navigate(['/user-signup']);
  }

  check(username: string, password: string): void {

    /* for (let i = 0; i < this.db.length ; i++) {
       if (this.db[i].username === username && this.db[i].password === password) { //check for valid usrname and password
         localStorage.setItem("UserLoggedIn","UserLoggedIn"); //adds to localstorage that the user logged in
         this.router.navigate(['/user-feed']);//navigate to next page
       } else if(i === this.db.length-1){
         document.getElementById('wrong').style.display = 'block';//if pass wrong display wrong password
       }
     }*/

    const data = {
      user: username,
      pass: password
    };

    this.serverService.login(data).subscribe((data) => {
      console.log(data);
    });

  }
}
