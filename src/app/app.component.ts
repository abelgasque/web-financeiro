import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Financeiro-web';
  constructor(public http: HttpClient) { }

  ngOnInit(){
    this.ping();
  }

  ping() {
    this.http.get(`${environment.apiUrl}/pessoas`).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
  }
}
