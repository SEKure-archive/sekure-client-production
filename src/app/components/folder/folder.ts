import { Component, Input } from '@angular/core';
import { APIService, File, Folder } from '../../services/api';

@Component({
  selector: 'folder',
  templateUrl: 'folder.html',
  styleUrls: ['folder.css'],
  providers: [APIService]
})
export class FolderComponent {
    @Input() folder: Folder;

    open: boolean = false;
    files: File[] = null;
    loaded : boolean = false;


    constructor(private api: APIService) { }

    loadContents() {
        this.api.getFolder(this.folder.id).subscribe(files => {
            this.files = files;
            console.log(files);
        });
    }

    toggleOpen() {
        if (!this.open && !this.files) {
            this.loadContents();
        }
        this.open = !this.open;
    }

    private restoreFolder(e) {
      e.preventDefault();
      this.api.getFolder(this.folder.id).subscribe(files => {
          this.files = files;
          for (let f of this.files){
            this.api.getFileDownload(f.id).subscribe(files => {
            });
        }
      });
    }
}
