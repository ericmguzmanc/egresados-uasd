import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent  implements OnInit {
  isLoading = this.spinnerSvc.isLoading
  constructor(private spinnerSvc: SpinnerService) { }

  ngOnInit() {}

}
