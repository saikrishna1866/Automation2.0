import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'


@Injectable({
  providedIn: 'root'
})
export class DatagenerationService {

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
      responseType: 'text' as 'json' // Change this to the desired type
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
    // console.log(requestBody); 
    return this.http.post<any[]>(url, requestBody, httpOptions);
  }

  //Download Json
  downloadJson(data: any) {
    const jsonContent = JSON.stringify(data, null, 2); // Convert data to JSON string with indentation
  
    // Create a Blob with the JSON content
    const blob = new Blob([jsonContent], { type: 'application/json' });
  
    // Trigger file download
    const fileName = 'generatedFile.json';
    this.saveBlobAsFile(blob, fileName); // Custom function to save blob as a file
  }

  saveBlobAsFile(blob: Blob, fileName: string) {
    // Check if the browser supports the 'download' attribute
    if ('download' in document.createElement('a')) {
      // Create a link element
      const link = document.createElement('a');
  
      // Set link's attributes
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
  
      // Programmatically click the link to trigger the download
      document.body.appendChild(link);
      link.click();
  
      // Remove the link element from the document
      document.body.removeChild(link);
    } else {
      // For browsers that do not support the 'download' attribute
      const blobURL = window.URL.createObjectURL(blob);
      window.open(blobURL); // Opens the file in a new tab if download attribute is not supported
    }
  }

  downloadCSV(response: any) {
    const lines = response.split('\n');
    const csvContent = lines.join('\n');

    // Convert the CSV content to a Blob
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Trigger file download
    const fileName = 'generatedFile.csv';
    saveAs(blob, fileName);
  }
  
  

}

