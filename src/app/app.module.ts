import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TodosComponent } from './todos/todos.component';
import { UserService } from './shared/user.service';
import { NoteService } from './shared/note.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuard } from './guard/auth-guard.service';
import { TokenInterceptor } from './shared/http-Interceptor';
// import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // NgbModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),

  ],
  providers: [HttpClient,  AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
