import { Component, Input } from '@angular/core';
import { APIService, File, Folder } from '../../services/api';
import {Home} from '../../public/home/home';


@Component({
  selector: 'folder',
  templateUrl: 'folder.html',
  styleUrls: ['folder.css'],
  providers: [APIService]
})
export class FolderComponent {
    @Input() folder: Folder;

    @Input() open: boolean = false;
    @Input() files: File[] = null;
    @Input() loaded : boolean = false;


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
        let str : string = "";
        str += "Restoring: " + this.folder.path + "  { ";
          this.files = files;
          for (let f of this.files){
            str += f.name + " ";
            this.api.getFileDownload(f.id).subscribe(files => {
            });
        }
              str += "}"
              this.home.setMessage(str);
      });
    }
}
