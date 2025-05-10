import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError, timestamp } from 'rxjs';
import { Quote } from './models/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  constructor(private http: HttpClient) { }

  postQuote(quote: string, author: string, source: string) {
    const body = {
      quote: quote,
      author: author,
      source: source
    };
    console.log("posting quote", body)


    return this.http.post<void>('http://127.0.0.1:5000/api/quotes', body).subscribe({
      next: () => console.log("Quote added successfully"),
      error: () => console.log("Error adding quote")
    });
  }

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>('http://127.0.0.1:5000/api/quotes');
  }

  getQuotesByTimestampDesc(): Observable<Quote[]> {
    return this.http.get<Quote[]>('http://127.0.0.1:5000/api/quotes').pipe(
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
