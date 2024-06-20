import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private userSource = new BehaviorSubject<any>(null);
  user$ = this.userSource.asObservable();

  updateUser(user: any) {
    this.userSource.next(user);
  }
}
