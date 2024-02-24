import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-article-reader',
  templateUrl: './article-reader.component.html',
  styleUrls: ['./article-reader.component.css']
})
export class ArticleReaderComponent {
  constructor(public dialog: MatDialog) {}

  // Open dialog method
  openDialog() {
    this.dialog.open(DialogContentExampleDialog, {
      height: '80%',
      width: '80%',
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<iframe width="100%" height="100%" [src]="data.url | safe"></iframe>`,
})
export class DialogContentExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { url: string }) {}
}