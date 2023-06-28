import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseurl: any;
  constructor(private httpClient: HttpClient) {
    this.baseurl = environment.BASE_URL;
   }

  validateUser(data:any){
    return this.httpClient.post(this.baseurl + '/login', {
      "userEmail": data?.userEmail,
      "password": data?.password,
      "role": data?.role
    });
  }

  getAllUsers(){
    return this.httpClient.get(this.baseurl + '/getUsers');
  }

  updateUser(data: any){
    return this.httpClient.put(this.baseurl + '/updateUser', data);
  }

  createUser(data: any){
    return this.httpClient.post(this.baseurl + '/createUser', data);
  }

  deleteUser(data: any){
    return this.httpClient.delete(this.baseurl + '/deleteUser', {
      body: data
   });
  }
}
