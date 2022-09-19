import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddIceCreamComponent } from './components/add-ice-cream/add-ice-cream.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'QualityMinds';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  // Open dialog after clicking Add Ice-Cream
  openDialog() {
    this.dialog.open(AddIceCreamComponent, {
      width: '50%',
    });
  }
}
