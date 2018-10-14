import { KeyValuePair } from './../../models/vehicle';
import * as _ from 'underscore';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { SaveVehicle, Vehicle } from '../../models/vehicle';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
 makes: any[];
 models: any[];
 features: any[];

 vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      phone: '',
      email: '',
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrManager,
    private vehicleService: VehicleService, ) {
      route.params.subscribe(p => {
        this.vehicle.id = +p['id'] || 0;
      });
     }

  ngOnInit() {
    let sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if (this.vehicle.id) {
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    }
    forkJoin(...sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];

      if (this.vehicle.id) {
        this.setVehicle(data[2]);
        this.populateModels();
      }
    /* , err => {
      if (err.status === 404) {
        this.router.navigate(['/home']);
      } */
    });

    /* this.vehicleService.getMakes().subscribe(makes =>
      this.makes = makes);

    this.vehicleService.getFeatures().subscribe(features =>
      this.features = features); */
  }
  private setVehicle(v: Vehicle) {
  this.vehicle.id = v.id;
  this.vehicle.makeId = v.make.id;
  this.vehicle.modelId = v.model.id;
  this.vehicle.isRegistered = v.isRegistered;
  this.vehicle.contact = v.contact;
  this.vehicle.features = _.pluck(v.features, 'id');
  }
  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }
  // Implementation detail
  private populateModels() {
    let selectedMake = this.makes.find(m => m.id === this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }
  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      let index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }
  submit() {
    var result$ = (this.vehicle.id) ? this.vehicleService.update(this.vehicle) : this.vehicleService.create(this.vehicle);
    var msg = (this.vehicle.id) ? 'Vehicle Record updated successfully' : 'Vehicle record created successfully';

    result$.subscribe(vehicle => {
          this.toastr.successToastr(msg, 'Saved', {
            position: 'top-right',
            showCloseButton: true
          });
          this.router.navigate(['/vehicles/', vehicle.id]);
    });
  }
  delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.toastr.infoToastr('Vehicle deleted Successfully.', 'Delete', {
            position: 'top-right',
            showCloseButton: true

          });
          this.router.navigate(['/vehicles']);
        });
    }
  }
}
