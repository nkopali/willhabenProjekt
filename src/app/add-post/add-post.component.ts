import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServerService} from '../server.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  private username:any;
  private searchText: string;

  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit() {
  }

  createPost(subject: string, descrip: string, category: string, location:string){
    this.username = localStorage.getItem("userID");
    const data = {
      userID : this.username,
      subject : subject,
      descrip : descrip,
      category : category,
      latitude : "1",                                  // !!!!!!!!!!!!!!!!!!!!!!!!! add coordinates
      longitude : "1"
   };

   this.serverService.createEvent(data).subscribe((data)=>{
     console.log(data)
   })
  }

  searchFeed(searchText:string){
    localStorage.setItem("searchInput", searchText)
    this.router.navigate(['/search-feed'])
  }

  clearCache(){
    localStorage.clear();
    console.log("Cache cleared");
    this.router.navigate(['/user-login']);
  }

}
