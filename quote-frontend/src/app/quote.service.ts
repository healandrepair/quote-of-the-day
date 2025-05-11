import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError, timestamp } from 'rxjs';
import { Quote } from './models/quote';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  postQuote(quote: string, author: string, source: string) {
    const body = {
      quote: quote,
      author: author,
      source: source
    };
    console.log("posting quote", body)


    return this.http.post<void>(`${this.apiUrl}/quotes`, body).subscribe({
      next: () => console.log("Quote added successfully"),
      error: () => console.log("Error adding quote")
    });
  }

  getQuotes(): Observable<Quote[]> {
    console.log("api url "+ this.apiUrl)
    return this.http.get<Quote[]>(`${this.apiUrl}/quotes`);
  }

  getQuotesByTimestampDesc(): Observable<Quote[]> {
    console.log("api url "+ this.apiUrl)

    return this.http.get<Quote[]>(`${this.apiUrl}/quotes`).pipe(
      map((quotes) =>
        quotes.sort((a, b) => {
          const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0; // Default to 0 if timestamp is missing
          const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0; // Default to 0 if timestamp is missing
          return timeB - timeA; // Sort in descending order
        })
      )
    );
  }
}
