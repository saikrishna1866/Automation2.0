import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataGenerationService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = 'http://49.249.87.18:8899/';

  //Get Data Type and options
  getDataTypeList(): Observable<any[]> {
    const url = `${this.baseUrl}data_type_list/`;
    return this.http.get<any[]>(url);
  }

  getDataTypeOptions(data_type: string): Observable<any> {
    const url = `${this.baseUrl}data_type/options/${data_type}/`;
    return this.http.get<any[]>(url);
  }


  //Data Generation
  generateData(requestBody: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: requestBody.data_format// Type assertion to specify 'text' as the responseType
    };
    const url = `${this.baseUrl}generate_data/`;

    return this.http.post(url, requestBody, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        return throwError('Error occurred while processing the request.');
      })
    );
  }

  //derive example
  deriveFromExample(requestBody: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = `${this.baseUrl}derive_from_example/`;
    console.log(requestBody);
    return this.http.post<any[]>(url, requestBody, httpOptions);
  }

}
