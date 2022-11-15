import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  today: number = Date.now();
  constructor(
    private authService: AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }
  logout() {
    this.router.navigate(['/login']);
    return this.authService.logout();
  }
  get name() {
    return this.authService.name;
  }
}
