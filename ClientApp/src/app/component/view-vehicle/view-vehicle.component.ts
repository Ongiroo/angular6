import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VehicleService } from '../../services/vehicle.service';
import { PhotoService } from '../../services/photo.service';
import { ProgressService } from '../../services/progress.service';
import { AuthService } from '../../services/auth.service';
import { BrowserXhr } from '@angular/http';
import { BrowserXhrWithProgressService } from '../../services/browser-xhr-with-progress.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css'],
  providers: [
    { provide: BrowserXhr, useClass: BrowserXhrWithProgressService },
    ProgressService
]
})
export class ViewVehicleComponent implements OnInit {
 @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  photos: any[];
  progress: any;

  constructor(
    private authService: AuthService,
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastrManager,
    private progressService: ProgressService,
    private photoService: PhotoService,
    private vehicleService: VehicleService) {

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });
  }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId)
      .subscribe(res => { this.photos = res; } );

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status === 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });
  }

  delete() {
/*     if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    } */

    if (confirm('Are you Sure?')) {
      this.vehicleService.delete(this.vehicle.id)
          .subscribe(x => {
              this.toasty.infoToastr('Vehicle deleted Successfully.', 'Delete', {
                  position: 'top-right',
                  showCloseButton: true

              });
              this.router.navigate(['/vehicles']);
          });
    }
  }
  uploadPhoto() {
    this.progressService.startTracking()
      .subscribe(progress => {
        this.zone.run(() => {
          this.progress = progress;
        });
      },
      null,
      () => { this.progress = null; });

    let nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    let file = nativeElement.files[0];
    nativeElement.value = '';
    this.photoService.upload(this.vehicleId, file)
      .subscribe(photo => {
        this.photos.push(photo);
      },
      err => {
        this.toasty.errorToastr(err.text(), 'Error', {
          position: 'top-right',
          showCloseButton: true,
          // toastTimeout: 5000
        });
      });
  }
}
