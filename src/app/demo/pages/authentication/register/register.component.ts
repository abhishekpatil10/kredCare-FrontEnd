import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  registerForm: FormGroup;
  step: number = 1;
  otpSent: boolean = false;
  stepError: boolean = true;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      businessName: ['', [Validators.required]],
      businessEmail: ['', [Validators.required, Validators.email]],
      businessPAN: ['', [Validators.required, Validators.pattern(/^.{10}$/)]], // 10 characters
      businessGST: ['', [Validators.required, Validators.pattern(/^.{15}$/)]], // 15 characters
      businessLogo: [null, [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]] // 6-digit OTP
    });
  }

  submitEmail() {
    this.checkFieldValidity('businessEmail');
  }

  checkFieldValidity(fieldName: string) {
    const field = this.registerForm.get(fieldName);
    if (field) {
      this.stepError = field.invalid && field.touched;
    }
  }

  nextStep() {
    if (this.step < 4) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({
        businessLogo: file
      });
    }
  }

  sendOTP() {
    const mobileNumber = this.registerForm.get('mobileNumber')?.value;
    if (mobileNumber) {
      this.otpSent = true;
      // Add logic to send OTP here
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.stepError = true; // Set stepError flag to true if there's an error in the form
      return; // Stop further execution if form is invalid
    }

    // Handle form submission
    const formData = new FormData();
    formData.append('businessName', this.registerForm.get('businessName')?.value);
    formData.append('businessEmail', this.registerForm.get('businessEmail')?.value);
    formData.append('businessPAN', this.registerForm.get('businessPAN')?.value);
    formData.append('businessGST', this.registerForm.get('businessGST')?.value);
    formData.append('businessLogo', this.registerForm.get('businessLogo')?.value);
    formData.append('mobileNumber', this.registerForm.get('mobileNumber')?.value);
    formData.append('otp', this.registerForm.get('otp')?.value);
    console.log('Form Data:', formData);
    // Add logic to submit form data
  }
}
