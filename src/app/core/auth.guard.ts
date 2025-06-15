import { CanActivateFn } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export const authGuard: CanActivateFn = (route, state) => {
 constructor(private auth: AuthService, private router: Router) {}

 canActivate(): boolean {
  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/login']);
    return false;
  }
  return true;
}
  }
