import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MyModalService } from '../../../../services/my-modal/my-modal.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { Period } from '../../../../models/period';
import { PeriodService } from '../../../../services/period.service';
import { Workplace } from '../../../../models/workplace';
import { WorkplaceService } from '../../../../services/workplace.service';
import { isNull } from 'util';

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.scss']
})
export class PeriodsComponent implements OnInit {

  listPeriods: Period[];
  listAdaptedPeriods: any[];
  listWorkplaces: Workplace[];

  periodForm: FormGroup;
  periodErrors: string[];
  selectedPeriodUrl: string;

  settings = {
    title: 'Périodes de réservation',
    clickable: true,
    addButton: true,
    editButton: true,
    removeButton: true,
    previous: false,
    next: false,
    numberOfPage: 0,
    page: 0,
    columns: [
      {
        name: 'name',
        title: 'Nom'
      },
      {
        name: 'start_date',
        title: 'Date de début'
      },
      {
        name: 'end_date',
        title: 'Date de fin'
      },
      {
        name: 'is_active',
        title: 'Active',
        type: 'boolean'
      }
    ]
  };

  constructor(private periodService: PeriodService,
              private myModalService: MyModalService,
              private notificationService: NotificationsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private workplaceService: WorkplaceService) { }

  ngOnInit() {
    this.refreshPeriodList();
    this.refreshWorkplaceList();

    this.periodForm = this.formBuilder.group(
      {
        name: null,
        start_date: null,
        end_date: null,
        workplace: null,
        price: null,
        is_active: false,
      }
    );
  }

  changePage(index: number) {
    this.refreshPeriodList(index);
  }

  refreshPeriodList(page = 1, limit = 20) {
    this.periodService.list(limit, limit * (page - 1)).subscribe(
      periods => {
        this.settings.numberOfPage = Math.ceil(periods.count / limit);
        this.settings.page = page;
        // todo: remove previous and next page on all pagined page.
        this.settings.previous = !isNull(periods.previous);
        this.settings.next = !isNull(periods.next);
        this.listPeriods = periods.results.map(p => new Period(p));
        this.listAdaptedPeriods = [];
        for (const period of this.listPeriods) {
          this.listAdaptedPeriods.push(this.periodAdapter(period));
        }
      }
    );
  }

  refreshWorkplaceList() {
    this.workplaceService.list().subscribe(
      workplaces => {
        this.listWorkplaces = workplaces.results.map(w => new Workplace(w));
      }
    );
  }

  OpenModalCreatePeriod() {
    this.periodForm.reset();
    this.periodForm.controls['is_active'].setValue(false);
    this.periodForm.controls['price'].setValue(1);
    this.selectedPeriodUrl = null;
    this.toogleModal('form_periods', 'Ajouter une période', 'Créer');
  }

  OpenModalEditPeriod(item) {
    for (const period of this.listPeriods) {
      if (period.id === item.id) {
        this.periodForm.controls['name'].setValue(period.name);
        this.periodForm.controls['start_date'].setValue(period.start_date);
        this.periodForm.controls['end_date'].setValue(period.end_date);
        this.periodForm.controls['workplace'].setValue(period.workplace);
        this.periodForm.controls['is_active'].setValue(period.is_active);
        this.periodForm.controls['price'].setValue(period.price);
        this.selectedPeriodUrl = period.url;
        this.toogleModal('form_periods', 'Éditer une période', 'Éditer');
      }
    }
  }

  submitPeriod() {
    if ( this.periodForm.valid ) {
      if (this.selectedPeriodUrl) {
        this.periodService.update(this.selectedPeriodUrl, this.periodForm.value).subscribe(
          data => {
            this.notificationService.success('Modifié');
            this.refreshPeriodList();
            this.toogleModal('form_periods');
          },
          err => {
            if (err.error.non_field_errors) {
              this.periodErrors = err.error.non_field_errors;
              console.log(this.periodErrors);
            }
            if (err.error.name) {
              this.periodForm.controls['name'].setErrors({
                apiError: err.error.name
              });
            }
            if (err.error.start_date) {
              this.periodForm.controls['start_date'].setErrors({
                apiError: err.error.start_date
              });
            }
            if (err.error.end_date) {
              this.periodForm.controls['end_date'].setErrors({
                apiError: err.error.end_date
              });
            }
            if (err.error.workplace) {
              this.periodForm.controls['workplace'].setErrors({
                apiError: err.error.workplace
              });
            }
            if (err.error.is_active) {
              this.periodForm.controls['is_active'].setErrors({
                apiError: err.error.is_active
              });
            }
          }
        );
      } else {
        this.periodService.create(this.periodForm.value).subscribe(
          data => {
            this.notificationService.success('Ajouté');
            this.refreshPeriodList();
            this.toogleModal('form_periods');
          },
          err => {
            if (err.error.non_field_errors) {
              this.periodErrors = err.error.non_field_errors;
              console.log(this.periodErrors);
            }
            if (err.error.name) {
              this.periodForm.controls['name'].setErrors({
                apiError: err.error.name
              });
            }
            if (err.error.start_date) {
              this.periodForm.controls['start_date'].setErrors({
                apiError: err.error.start_date
              });
            }
            if (err.error.end_date) {
              this.periodForm.controls['end_date'].setErrors({
                apiError: err.error.end_date
              });
            }
            if (err.error.workplace) {
              this.periodForm.controls['workplace'].setErrors({
                apiError: err.error.workplace
              });
            }
            if (err.error.is_active) {
              this.periodForm.controls['is_active'].setErrors({
                apiError: err.error.is_active
              });
            }
          }
        );
      }
    }
  }

  removePeriod(item) {
    this.periodService.remove(item).subscribe(
      data => {
        this.notificationService.success('Supprimé', 'La période a bien été supprimé.');
        this.refreshPeriodList();
      },
      err => {
        this.notificationService.error('Erreur', 'Echec de la tentative de suppression.');
      }
    );
  }

  toogleModal(name, title = '', button2 = '') {
    const modal = this.myModalService.get(name);

    if (!modal) {
      console.error('No modal named %s', name);
      return;
    }

    modal.title = title;
    modal.button2Label = button2;
    modal.toggle();
  }

  periodAdapter(period) {
    return {
      id: period.id,
      url: period.url,
      name: period.name,
      start_date: period.getStartDay(),
      end_date: period.getEndDay(),
      is_active: period.is_active
    };
  }

  goToPeriod(event) {
    this.router.navigate(['/admin/periods/' + event.id]);
  }
}
