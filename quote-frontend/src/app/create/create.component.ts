import { Component } from '@angular/core';
import { QuoteService } from '../quote.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
declare var bootstrap: any;


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

      this.myForm.reset()
      this.showTemporaryModal();

    }
    else {
      console.log("Error, form is invalid")
    }
  }

  showTemporaryModal() {
    const modalElement = document.getElementById('exampleModal');
    if (!modalElement) return;

    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show(); 

    // Auto-close after 1.2 seconds
    setTimeout(() => {
      modalInstance.hide();
    }, 1200);
  }

}
