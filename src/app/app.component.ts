import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { RoutePartsService } from './shared/services/route-parts.service';

import { filter } from 'rxjs/operators';
import { UILibIconService } from './shared/services/ui-lib-icon.service';
import { ThemeService } from './shared/services/theme.service';
import { LayoutService } from './shared/services/layout.service';
// import {AngularFireStorage} from "@angular/fire/compat/storage"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  appTitle = 'GG-Business';
  pageTitle = '';
  BrandLogoUrl:any;
  constructor(
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routePartsService: RoutePartsService,
    private iconService: UILibIconService,
    private layoutService: LayoutService,
    // private fireStorage:AngularFireStorage
  ) {
    iconService.init()
  }

  ngOnInit() {
    this.changePageTitle();
    // this.themeService.applyMatTheme(this.layoutService.layoutConf.matTheme);
  }
  // async onFileChange(event: any){
  //   const file =event.target.files[0]
  //   if(file){
  
  //     const path= `yt/${file.name}`
  //     const uploadTask =await this.fireStorage.upload(path,file);
  //     const url = await uploadTask.ref.getDownloadURL()
     
  //     this.BrandLogoUrl=url
  //   }
  
  // }
  ngAfterViewInit() {
  }

  changePageTitle() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((routeChange) => {
      const routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
      if (!routeParts.length) {
        return this.title.setTitle(this.appTitle);
      }
      // Extract title from parts;
      this.pageTitle = routeParts
                      .reverse()
                      .map((part) => part.title )
                      .reduce((partA, partI) => {return `${partA} > ${partI}`});
      this.pageTitle += ` | ${this.appTitle}`;
      this.title.setTitle(this.pageTitle);
    });
  }
}
