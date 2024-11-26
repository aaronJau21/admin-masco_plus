import { Component, inject, OnInit, signal } from '@angular/core';
import { routes } from '../../../app.routes';
import { Route, RouterLink, RouterLinkActive, Routes } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  public itemRouter = signal<Routes>([]);
  private sanitizer = inject(DomSanitizer);

  public user = JSON.parse(localStorage.getItem('user')!);

  ngOnInit(): void {
    this.getItemsRoutes();
  }

  getItemsRoutes() {
    const items = routes[1].children?.filter((r) => r.title) as Route[];
    items.forEach((item) => {
      if (item.data!['icon']) {
        // Sanitizamos el SVG para evitar riesgos de XSS
        item.data!['icon'] = this.sanitizer.bypassSecurityTrustHtml(
          item.data!['icon']
        );
      }
    });
    return this.itemRouter.set(items);
  }
}
