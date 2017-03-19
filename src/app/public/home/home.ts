import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService, Folder } from '../../services/api';
import { UserService } from '../../services/user';

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

  username: string = null;
  flash: Flash = new Flash();

  constructor(public router: Router, private api: APIService, private user: UserService) { }

  ngOnInit() {
    this.working = true;
    this.username = this.user.getUsername();
    // Load folders on page load
    this.api.getALLFolders().subscribe(folders => {
      this.folders = folders;
      this.working = false;
    }, error => {
      if (!this.user.isLoggedIn()) {
        this.router.navigate(['login']);
        this.user.setSessionExpired();
      } else {
        this.working = false;
        this.flash.error = error;
      }
    });

  this.working = true;
  }

  private logout() {
    this.user.unsetUser();
    this.router.navigate(['login']);
  }
}
