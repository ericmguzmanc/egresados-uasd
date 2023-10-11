import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Egresado } from '../../interfaces/egresado.interface';
import { HelperService } from '../../services/helper.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';


@Component({
  selector: 'app-egresados-list',
  templateUrl: './egresados-list.component.html',
  styleUrls: ['./egresados-list.component.scss'],
})
export class EgresadosListComponent implements OnInit {
  @Input() egresados: Egresado[] = [];
  @Input() isLoading: boolean = true;
  page: number = 1;
  @Output() pageOfNumber: EventEmitter<number> = new EventEmitter<number>();
  constructor(public helperService: HelperService) {}

  ngOnInit() {}
  onIonInfinite(ev: any) {
      this.page++
      this.pageOfNumber.emit(this.page);
      setTimeout(() => {
        (ev as InfiniteScrollCustomEvent).target.complete();
      }, 500);
  }
}
