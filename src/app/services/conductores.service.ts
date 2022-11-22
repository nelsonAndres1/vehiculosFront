import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { global } from "./global";

@Injectable()
export class conductoresService {
    public url: string;
    public identity: any;
    public token: any;
    constructor(
        public _http: HttpClient
    ) {
        this.url = global.url;
    }
    register(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'Conductores/register', params, { headers: headers });
    }


    /*  */

    getConductores(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'Conductores/getConductores', params, { headers: headers });
    }

    getLicencias(user: any): Observable<any> {
        let json = JSON.stringify(user);
        let params = 'json=' + json;
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this.url + 'Conductores/getLicencias', params, { headers: headers });
    }

    
}