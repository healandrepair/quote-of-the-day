import { Component, OnInit } from '@angular/core';
import { Quote } from '../models/quote';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { QuoteService } from '../quote.service';


@Component({
  selector: 'app-view',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{
  quoteList: Quote[] = [];

  constructor(private quoteService : QuoteService) {}
  ngOnInit(): void {
    this.quoteService.getQuotes().subscribe((data)=> {
      console.log("Successfully get the quotes")
      this.quoteList = data;
    })
  }
}
