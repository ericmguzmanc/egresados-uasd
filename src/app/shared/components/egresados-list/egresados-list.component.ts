import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Egresado } from '../../interfaces/egresado.interface';
import { HelperService } from '../../services/helper.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-egresados-list',
  templateUrl: './egresados-list.component.html',
  styleUrls: ['./egresados-list.component.scss'],
})
export class EgresadosListComponent implements OnInit {
  @Input() egresados: Egresado[] = [];
  @Input() isLoading: boolean = true;
  @Input() isUserAdmin: boolean = false;
  @Output() pageNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output() egresadoClicked: EventEmitter<number> = new EventEmitter<number>();

  page: number = 1;

  constructor(
    public helperService: HelperService,
    public authService: AuthService,
  ) {}

  ngOnInit() {
  }

  onIonInfinite(ev: any) {
    this.page++;
    this.pageNumber.emit(this.page);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  onEgresadoClick(egresadoId: number) {
    this.egresadoClicked.emit(egresadoId);
  }
}
