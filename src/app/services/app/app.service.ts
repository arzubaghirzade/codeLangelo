import { Injectable, Injector } from '@angular/core';
import { HttpsService } from '../https/https.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService extends HttpsService {
  public REGISTER = 'auth/register';
  public LOGIN = 'auth/login';
  public REGISTER_COMPANY = 'auth/registerCompany';
  public LOGIN_COMPANY = 'auth/loginCompany';

  constructor(public http: HttpClient) {
    // @ts-ignore
    super();
  }

  public upload(file: any): Observable<any> {
    var f = new FormData();
    f.append('file', file);
    return this.http.post(
      'https://dev.api.veyseloglu.vac.az/api/' + 'Photo',
      f
    );
  }

  toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  public saveData(url, params): any {
    if (params.id) {
      const id = params.id;
      delete params['id'];
      return this.http.put(
        'https://dev.api.veyseloglu.vac.az/api/' + url + '/' + id,
        params
      );
    } else {
      delete params['id'];
      return this.http.post(
        'https://dev.api.veyseloglu.vac.az/api/' + url,
        params
      );
    }
  }

  public uploadFile(file: any): Observable<any> {
    var f = new FormData();
    f.append('file', file);
    return this.http.post(
      'https://dev.api.veyseloglu.vac.az/api/' + 'FileUpload',
      f
    );
  }

  public login(params: any = {}): Observable<any> {
    return this.post(this.http, this.LOGIN, params);
  }
  public registerCompany(params: any = {}): Observable<any> {
    return this.post(this.http, this.REGISTER_COMPANY, params);
  }
  public loginCompany(params: any = {}): Observable<any> {
    return this.post(this.http, this.LOGIN_COMPANY, params);
  }
  public register(params: any = {}): Observable<any> {
    return this.post(this.http, this.REGISTER, params);
  }
  public getParamList(route_url: string, params: any = {}): Observable<any> {
    return this.get(this.http, route_url, params);
  }
  public getFormById(route_url: string, id): Observable<any> {
    return this.get(this.http, `${route_url}/${id}`);
  }
  public updateForm(route_url: string, id, params): Observable<any> {
    return this.put(this.http, `${route_url}/${id}`, params);
  }
  public getForm(route_url: string, params): Observable<any> {
    return this.get(this.http, route_url, params);
  }
  public postForm(route_url: string, params): Observable<any> {
    return this.post(this.http, route_url, params);
  }
  public deleteFormById(route_url: string, id): Observable<any> {
    return this.delete(this.http, `${route_url}/${id}`);
  }
}
