import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-texarea',
  templateUrl: './texarea.component.html',
  styleUrls: ['./texarea.component.scss'],

})

export class TexareaComponent  implements OnInit {
  @Input() contador: number = 0;
  @Input() maxLength: number = 0;
  
  @Output() onKey: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}
  
  
  onKeyH(event: any) {
    this.onKey.emit(this.contador = event.target.value.length);
  }
}
  
