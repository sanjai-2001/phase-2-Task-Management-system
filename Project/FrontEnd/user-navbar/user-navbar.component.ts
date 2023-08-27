import { Component } from '@angular/core';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent {
  constructor(
    // private sharedService: SharedService,
    private renderer: Renderer2, 
    private router: Router
  ) {}

  loggedInUsername: string = 'Sanjai'; // Initialize with an empty string

  // Simulating a login event
  login(username: string) {
    this.loggedInUsername = username;
  }

  logout() {
    // Implement your logout logic here
    this.router.navigate(['/login']);
    this.loggedInUsername = ''; // Reset the username on logout
  }

  @ViewChild('dropdownToggle') dropdownToggle!: ElementRef;

  ngAfterViewInit() {
    this.initializeDropdownToggle();
  }

  private initializeDropdownToggle() {
    const dropdownToggleElement = this.dropdownToggle.nativeElement;

    this.renderer.listen(dropdownToggleElement, 'click', (event: Event) => {
      event.preventDefault();
      
      const dropdownMenu = dropdownToggleElement.nextElementSibling as HTMLElement;
      if (dropdownMenu) {
        dropdownMenu.classList.toggle('show');
      }
    });
  }

 

  // darkMode = false;

  // toggleDarkLight() {
  //   this.sharedService.toggleDarkMode();
  //   this.darkMode = !this.darkMode;
  //   console.log('Dark Mode:', this.darkMode);
  
  //   const body: HTMLElement | null = document.querySelector("body");
  //   if (body) {
  //     body.classList.toggle("dark", this.darkMode);
  //     console.log('Body Class:', body.classList);
  //   }
  // }

}
