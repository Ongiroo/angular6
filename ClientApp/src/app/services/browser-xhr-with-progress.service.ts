import { Injectable } from '@angular/core';

import { ProgressService } from './progress.service';
import { BrowserXhr } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class BrowserXhrWithProgressService extends BrowserXhr {

    constructor(private service: ProgressService) {
        super();
    }

    build(): XMLHttpRequest {
        let xhr: XMLHttpRequest = super.build();

        // xhr.onprogress = (event) => {
        //    this.service.downloadProgress.next(this.CreateProgress(event));
        // }

        xhr.upload.onprogress = (event) => {
            // this.service.uploadProgress.next(this.CreateProgress(event));
            this.service.notify(this.CreateProgress(event));
        };

        xhr.upload.onloadend = () => {
            this.service.endTracking();
        };

        return xhr;
    }

    private CreateProgress(event) {
        return {
            total: event.total,
            percentage: Math.round(event.loaded / event.total * 100)
        };
    }
}
