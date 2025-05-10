import { Component, OnInit } from '@angular/core';
import { Quote } from '../models/quote';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { QuoteService } from '../quote.service';
import * as bootstrap from 'bootstrap'; // Import Bootstrap JavaScript

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {
  quoteList: Quote[] = [];

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.quoteService.getQuotesByTimestampDesc().subscribe((data) => {
      console.log('Successfully got the quotes');
      this.quoteList = data;
      console.log(this.quoteList);

      // Initialize Bootstrap tooltips
      const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });
    });
  }

  saveToClipboard(text: string, buttonId: string) {
    navigator.clipboard.writeText(text).then(() => {
      const button = document.getElementById(buttonId) as HTMLButtonElement;

      if (button) {
        // Remove and re-add the title attribute to refresh the tooltip
        button.removeAttribute('title');
        button.setAttribute('title', `Copied: ${text}`);

        // Refresh the tooltip
        const tooltip = bootstrap.Tooltip.getInstance(button) || new bootstrap.Tooltip(button);
        tooltip.show();

        // Hide the tooltip after a short delay
        setTimeout(() => {
          tooltip.hide();
        }, 2000);
      }

      console.log(`Copied: ${text}`);
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  }
}