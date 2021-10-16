import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export const RequestType = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT"
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  /**
   * Sends a GET/POST/DELETE/PUT request synchronously to a website
   * @param type GET/POST/DELETE/PUT
   * @param url Url of the Website
   * @param data Data for body request
   * @returns The return of the Website in json
   */
  public async sendHttpRequest(type: string, url: string, data: any = null) {
    return await fetch(url,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: type,
        body: data ? JSON.stringify(data) : null
      }).then(res => res.json()).catch((e) => ({ error: true, message: "Unable to connect" }));
  }

  public async getAllScores(){
    let result = await this.sendHttpRequest(RequestType.GET, environment.apiGetScore);
    return result;
  }

  public async getScoresByContinent(type: string){
    let result = await this.sendHttpRequest(RequestType.GET, environment.apiGetScore + "/" + type);
    return result;
  }

  public async createScore(data: any){
    let result: any = await this.sendHttpRequest(RequestType.POST, environment.apiGetScore, data);
    return result;
  }

}
