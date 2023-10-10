import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Egresado } from '../../interfaces/egresado.interface';
import { HelperService } from '../../services/helper.service';


@Component({
  selector: 'app-egresados-list',
  templateUrl: './egresados-list.component.html',
  styleUrls: ['./egresados-list.component.scss'],
})
export class EgresadosListComponent implements OnInit {
  @Input() egresados: Egresado[] = [];
  @Input() isLoading: boolean = true;
  @Output() numberPage: EventEmitter<number> = new EventEmitter<number>();
  page: number = 1;
  constructor(public helperService: HelperService) {}

  ngOnInit() {}

  onIonInfinite(ev: any) {
    this.page += 1;
    this.numberPage.emit(this.page);

    //console.log(this.page);
  }
}
