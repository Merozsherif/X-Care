import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from "aos";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  customOptionslarge: OwlOptions = {
    items: 1,
    loop: true,
    // autoplay:true,

    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoHeight: true,
    stagePadding:150,
    autoplayTimeout:3000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,

      },
      400: {
        items: 1,

      },
      1024: {
        items: 1,

      },
      // 1200: {
      //   items: 1,
      //   // stagePadding: 150,
      // },


    },
    nav: false,
    center:true
  }
  customOptionssmall: OwlOptions = {
    items: 1,
    loop: true,
    // autoplay:true,

    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoHeight: true,
    stagePadding:0,
    autoplayTimeout:3000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,

      },
      400: {
        items: 1,

      },
      1024: {
        items: 1,

      },
      // 1200: {
      //   items: 1,
      //   // stagePadding: 150,
      // },


    },
    nav: false,
    center:true
  }
  constructor() { }

  ngOnInit(): void {

    AOS.init();
  }

}
