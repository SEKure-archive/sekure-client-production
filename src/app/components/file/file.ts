import { Component, Input } from '@angular/core';
import { APIService, File } from '../../services/api';
import { Home } from '../../public/home/home';

@Component({
  selector: 'file',
  templateUrl: 'file.html',
  styleUrls: ['file.css'],
  providers: [APIService],
})
export class FileComponent {
    @Input() file: File;
    @Input() even: boolean;

    @Input() open: boolean = false;
    // loaded: boolean = false;

    constructor(private api: APIService) { }

    toggleOpen() {
        this.open = !this.open;

    }
    public restoreFile(e) {
      e.preventDefault();
        this.api.getFileDownload(this.file.id).subscribe(files => {
        });
    }
}
