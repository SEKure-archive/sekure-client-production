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

    open: boolean = false;
    files: File[] = null;
    loaded : boolean = false;


    constructor(private api: APIService, private home: Home) { }

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
        str +=  this.folder.path + "  { ";
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
