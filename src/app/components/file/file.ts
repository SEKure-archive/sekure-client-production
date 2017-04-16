import { Component, Input } from '@angular/core';
import { APIService, File } from '../../services/api';
import {Home} from '../../public/home/home';

@Component({
  selector: 'file',
  templateUrl: 'file.html',
  styleUrls: ['file.css'],
  providers: [APIService],
})
export class FileComponent {
    @Input() file: File;
    @Input() even: boolean;
    open: boolean = false;

    constructor(private api: APIService, private home: Home) { }

    toggleOpen() {
        this.open = !this.open;

    }
    public restoreFile(e) {
      e.preventDefault();
        this.api.getFileDownload(this.file.id).subscribe(files => {
        });
        this.home.setMessage(this.file.name);
    }
}
