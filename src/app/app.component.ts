import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { VersionCheckService } from './version-check.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'x_care';

  constructor(private router :Router , private versionCheckService: VersionCheckService){
    this.router.events.subscribe((event:any)=>{
      if(event instanceof NavigationEnd){
       window.scrollTo(0,0)
      }
    })

  }
  ngOnInit(): void {
    this.versionCheckService.checkVersion();
  }
}
