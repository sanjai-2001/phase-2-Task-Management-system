import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {
  constructor(private renderer: Renderer2) {}

  // navigateToAssignTask() {
  //   this.router.navigate(['/assign-task']);
  // }

  ngAfterViewInit() {
    const body: HTMLElement | null = document.querySelector("body");
    const darkLight: HTMLElement | null = document.querySelector("#darkLight");
    const sidebar: HTMLElement | null = document.querySelector(".sidebar");
    const submenuItems: NodeListOf<Element> = document.querySelectorAll(".submenu_item");
    const sidebarOpen: HTMLElement | null = document.querySelector("#sidebarOpen");
    const sidebarClose: HTMLElement | null = document.querySelector(".collapse_sidebar");
    const sidebarExpand: HTMLElement | null = document.querySelector(".expand_sidebar");

    
    if (sidebarOpen) {
      this.renderer.listen(sidebarOpen, 'click', () => {
        if (sidebar) {
          sidebar.classList.toggle("close");
          this.updateSidebarExpandCollapseText(sidebarExpand, sidebarClose, sidebar);
        }
      });
    }

    if (sidebarClose) {
      this.renderer.listen(sidebarClose, 'click', () => {
        if (sidebar) {
          sidebar.classList.add("close", "hoverable");
          this.updateSidebarExpandCollapseText(sidebarExpand, sidebarClose, sidebar);
        }
      });
    }

    if (sidebarExpand) {
      this.renderer.listen(sidebarExpand, 'click', () => {
        if (sidebar) {
          sidebar.classList.remove("close", "hoverable");
          this.updateSidebarExpandCollapseText(sidebarExpand, sidebarClose, sidebar);
        }
      });
    }

    if (sidebar) {
      sidebar.classList.add("close");
      this.updateSidebarExpandCollapseText(sidebarExpand, sidebarClose, sidebar);
    }
    if (sidebar) {
      this.renderer.listen(sidebar, 'mouseenter', () => {
        if (sidebar.classList.contains("hoverable")) {
          sidebar.classList.remove("close");
        }
      });

      this.renderer.listen(sidebar, 'mouseleave', () => {
        if (sidebar.classList.contains("hoverable")) {
          sidebar.classList.add("close");
        }
      });
    }

    if (darkLight) {
      this.renderer.listen(darkLight, 'click', () => {
        if (body) {
          body.classList.toggle("dark");
          if (body.classList.contains("dark") && darkLight.classList.contains("bx-sun")) {
            this.renderer.removeClass(darkLight, "bx-sun");
            this.renderer.addClass(darkLight, "bx-moon");
          } else {
            this.renderer.removeClass(darkLight, "bx-moon");
            this.renderer.addClass(darkLight, "bx-sun");
          }
        }
      });
    }

    submenuItems.forEach((item, index) => {
      this.renderer.listen(item, 'click', () => {
        item.classList.toggle("show_submenu");
        submenuItems.forEach((item2, index2) => {
          if (index !== index2) {
            item2.classList.remove("show_submenu");
          }
        });
      });
    });

    if (window.innerWidth < 768 && sidebar) {
      sidebar.classList.add("close");
    } else if (sidebar) {
      sidebar.classList.remove("close");
    }
}
updateSidebarExpandCollapseText(sidebarExpand: HTMLElement | null, sidebarClose: HTMLElement | null, sidebar: HTMLElement | null) {
  if (sidebarExpand && sidebarClose && sidebar) {
    if (sidebar.classList.contains("close")) {
      sidebarExpand.style.display = "block";
      sidebarClose.style.display = "none";
    } else {
      sidebarExpand.style.display = "none";
      sidebarClose.style.display = "block";
    }
  }
}
}
