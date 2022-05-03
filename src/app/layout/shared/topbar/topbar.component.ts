import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/helpers/language.service';
import { CartModelServer } from 'src/app/core/models/cart';
import { CartService } from 'src/app/core/services/api-calls/cart.service';
import { AuthService } from 'src/app/core/services/api-calls/auth.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: Number;
  user;
  element: any;
  configData: any;
  cookieValue;
  flagvalue;
  countryName;
  valueset: string;
  isLogedIn: boolean;

  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  // tslint:disable-next-line: max-line-length
  constructor(@Inject(DOCUMENT)
  private document: any,
    private router: Router,
    private authService: AuthService,
    public cookiesService: CookieService,
    private languageService: LanguageService,
    private cartService: CartService,
  ) {
    this.user = this.authService.userValue;
    if (this.user !== null) {
      this.isLogedIn = this.user.is_loggedin;
    }

  }

  @Output() mobileMenuButtonClicked = new EventEmitter();
  @Output() settingsButtonClicked = new EventEmitter();

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    this.element = document.documentElement;
    this.configData = {
      suppressScrollX: true,
      wheelSpeed: 0.3
    };

    this.cookieValue = this.cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
  }
  /* *
  * Remove item from cart
  */
  removeCartItem(i) {
    console.log('ITEM REMOVED')
    this.cartService.DeleteProductFromCart(i)
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  /**
   * Translate language
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }


  /**
   * Logout the user from server
   */
  logout() {

    this.router.navigate(['/auth/login']);

  }

  /**
   * Logout the user
   */
  serverLogout() {
    this.authService.logout({ refresh: this.user.refresh }, (error, result) => {
      if (result.status_code === "100") {
        this.router.navigate(['/auth/login']);
      }
    })
  }

}
