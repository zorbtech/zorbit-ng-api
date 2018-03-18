import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { ApiService } from './api/api.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ApiService]
})
export class ApiModule { }
