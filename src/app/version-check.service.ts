import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VersionCheckService {
  private readonly localStorageVersionKey = 'appVersion';

  constructor() { }

  checkVersion(): void {
    const storedVersion = localStorage.getItem(this.localStorageVersionKey);

    if (storedVersion !== environment.appVersion) {
      this.clearLocalStorage();
      localStorage.setItem(this.localStorageVersionKey, environment.appVersion);
    }
  }

  private clearLocalStorage(): void {
    localStorage.clear();
  }
}
