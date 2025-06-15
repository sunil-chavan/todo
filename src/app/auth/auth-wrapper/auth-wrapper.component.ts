import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-auth-wrapper',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './auth-wrapper.component.html',
  styleUrl: './auth-wrapper.component.scss',
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ transform: 'translateX(-100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class AuthWrapperComponent implements OnInit {
  isLogin = true; // Default screen
  isReady = false; // Prevent flicker before component is ready

  ngOnInit() {
    // Ensure rendering happens only after Angular finishes init
    setTimeout(() => {
      this.isReady = true;
    }, 0);
  }

  toggleForm(showLogin: boolean) {
    this.isLogin = showLogin;
  }
}
