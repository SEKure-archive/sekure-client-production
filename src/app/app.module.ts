//Routes for Library Functions
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


// providers
import { AuthGuard } from './routes/authguard';
import { APIService } from './services/api';
import { UserService } from './services/user';
import { CookieService } from 'angular2-cookie/services/cookies.service';
// import { CookieService } from 'angular2-cookie';


//Routes for Components
import { AppComponent } from './app.component';
import { FileComponent } from './components/file/file';
import { FolderComponent } from './components/folder/folder';
import { SpinnerComponent } from './components/spinner/spinner';

// Pages
import { routing } from './routes/routes';
import { Home } from './public/home/home';
import { Login } from './public/login/login';

// Pipes
import { BytesPipe } from './pipes/bytes';
import { SearchPipe } from './pipes/search';

@NgModule({
  imports: [BrowserModule, HttpModule, routing, FormsModule],
  providers: [CookieService, AuthGuard, APIService, UserService],
  declarations: [AppComponent, FileComponent, FolderComponent, SpinnerComponent, Home, Login, BytesPipe, SearchPipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
