import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdSidenavModule, MdInputModule, MdButtonModule } from '@angular/material';
import 'hammerjs';
import '@angular/material/prebuilt-themes/deeppurple-amber.css';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UserComponent } from './components/user/user.component';
import { UserService } from './components/user/user.service';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { TwitterService } from './components/twitter/twitter.service';
import { TweetComponent } from './components/tweet/tweet.component';
import { TweetService } from './components/tweet/tweet.service';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    HeroComponent,
    NavBarComponent,
    UserComponent,
    AutocompleteComponent,
    TweetComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdSidenavModule,
    MdInputModule,
    MdButtonModule
  ],
  providers: [ UserService, TwitterService, TweetService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
