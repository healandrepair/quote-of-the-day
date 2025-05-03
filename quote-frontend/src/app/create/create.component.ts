import { Component } from '@angular/core';
import { QuoteService } from '../quote.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  constructor(private quoteService : QuoteService) {}

  myForm = new FormGroup({
    quote: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    source: new FormControl('')
  });

  addQuote() {
    if (this.myForm.valid) {
      const quote = this.myForm.get('quote')?.value ?? ""; 
      const author = this.myForm.get('author')?.value ?? ""; 
      const source = this.myForm.get('source')?.value ?? ""; 
      
      this.quoteService.postQuote(quote, author, source);
  
      console.log("Added quote")
    }
    else {
      console.log("Error, form is invalid")
    }
  }

}
