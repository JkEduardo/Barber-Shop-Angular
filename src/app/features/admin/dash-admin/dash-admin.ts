import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  templateUrl: './dash-admin.html',
  styleUrls: ['./dash-admin.css']
})
export class DashAdmin {
  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate([`/${path}`]); 
  }
}