import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(
    private translateService: TranslateService,
    private router: Router,
    ) {  }

  ngOnInit(): void {

  }

  changeLanguage(): void {
    let cl = this.translateService.currentLang;
    if(cl=="pt")  this.translateService.use("en");
    else  this.translateService.use("pt");
  }


}
