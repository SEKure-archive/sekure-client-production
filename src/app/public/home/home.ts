import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { APIService, Folder, File } from '../../services/api';
import { UserService } from '../../services/user';
import {FileComponent} from '../../components/file/file';

/** Any currently displayed messages. */
export class Flash {
  error: string = null;
  notification: string = null;
}

@Component({
  selector: 'home',
  templateUrl: 'home.html',
  styleUrls: ['home.css'],
  providers: [APIService]
})
export class Home implements OnInit {
  private working: boolean;
  private folders: Folder[];
  private results : File[];
  open: boolean = false;



  username: string = null;
  flash: Flash = new Flash();


  loadresults : boolean = false;

  constructor(public router: Router, private api: APIService, private user: UserService) {
    // this.searchFolder.path = "Search Folder";
  }

  ngOnInit() {
    this.working = true;
    this.username = this.user.getUsername();
    // Load folders on page load
    this.api.getALLFolders().subscribe(folders => {
      console.log(folders);
      this.folders = folders;
      this.working = false;
    }, error => {
      if (!this.user.isLoggedIn()) {
        this.router.navigate(['login']);
        var isExpired = this.user.isSessionExpired();
        if (isExpired){
          this.user.setSessionExpired();
        }
        console.log("Your out of time, please log in again")
      } else {
        this.working = false;
        this.flash.error = error;
      }
    });

    // this.working = true;
    //   this.api.postFileByQuery('txt').subscribe(files => {
    //     this.results = files;
    //     console.log(this.results);
    //     this.loadresults= true;
    //     this.working = false;
    //     this.open = true;
    //   });
  }

  public setMessage(message : string){
    this.flash.notification = message;
  }


  query(input: string){
    this.loadresults = false;

    console.log(input);
    if(input.length > 0){
      this.working = true;
        this.api.postFileByQuery(input).subscribe(files => {
          this.results = files;
          console.log(this.results);
          this.loadresults= true;
          this.working = false;
          this.open = true;
        });
    }
  }

  toggleSearchOpen() {
      this.open = !this.open;
  }

  private logout(e) {
    e.preventDefault();
    this.user.unsetUser();
    this.router.navigate(['login']);
  }
}
