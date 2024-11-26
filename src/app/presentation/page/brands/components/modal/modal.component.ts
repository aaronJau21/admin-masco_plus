import { Component, inject, input, output } from '@angular/core';
import { BrandsService } from '../../../../../use-case/services/brands.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ICreateBrandRequest, IMarca } from '../../../../../domain/interface';

@Component({
  selector: 'brand-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  private readonly brandService = inject(BrandsService);
  private fb = inject(FormBuilder);

  public showModal = input.required();
  public closeModal = output<boolean>();
  public brandCreated = output<IMarca>();

  public createBrandForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  public createBrand() {
    const data: ICreateBrandRequest = this.createBrandForm.value;
    return this.brandService.createBrand(data).subscribe({
      next: (r) => {
        console.log(r);
        this.brandCreated.emit(r);
        this.closeModal.emit(false);
        this.createBrandForm.reset();
      },
      error: console.log,
    });
  }
}
