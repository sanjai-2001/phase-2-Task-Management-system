import { Component, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit{
  loggedInUsername: string = '';

  constructor(
    private renderer: Renderer2, 
    private router: Router,
    private elementRef: ElementRef
  ) {} 

  logout() {
    sessionStorage.clear();
    // Implement your logout logic here
    this.router.navigate(['']);
     // Reset the username on logout
  }

  @ViewChild('dropdownToggle') dropdownToggle!: ElementRef;

  ngAfterViewInit() {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');
  this.loggedInUsername = userDetails.empName; 
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
}
