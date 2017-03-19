import { Component, Input } from '@angular/core';
import { APIService, File } from '../../services/api';

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

    constructor(private api: APIService) { }

    toggleOpen() {
        this.open = !this.open;
    }
}
