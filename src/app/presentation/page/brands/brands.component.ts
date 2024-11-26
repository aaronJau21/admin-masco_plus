import { Component, inject, OnInit, signal } from '@angular/core';
import { TitleComponent } from '../../shared/title/title.component';
import { ModalComponent } from './components/modal/modal.component';
import { BrandsService } from '../../../use-case/services/brands.service';
import { IMarca } from '../../../domain/interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [TitleComponent, ModalComponent, CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
  host: {
    class: 'flex-1 p-5',
  },
})
export default class BrandsComponent implements OnInit {
  private readonly brandService = inject(BrandsService);
  private readonly router = inject(Router);
  private toastr = inject(ToastrService);
  public showModal = signal<boolean>(false);
  public brands = signal<IMarca[]>([]);
  public closeModal() {
    this.showModal.set(false);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.brandService.getBrands().subscribe({
      next: (r) => this.brands.set(r.marcas),
      error: (r) => {
        if (r.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.toastr.error('The session ended');
          return this.router.navigateByUrl('/auth/login');
        }

        return;
      },
    });
  }

  public onBrandCreated(newBrand: IMarca) {
    this.brands.update((currentBrands) => [...currentBrands, newBrand]);
  }

  toggleStatus(item: any): void {
    item.activate = !item.activate;
    this.brandService.activateBrand(item.activate, item.id).subscribe({
      next: (r) => {
        if (r.brand.activate === true) {
          return this.toastr.success('It was activated successfully');
        } else {
          return this.toastr.warning('It was successfully deactivated');
        }
      },
      error: () => this.toastr.error('Error changing status', 'Error'),
    });
  }
}
