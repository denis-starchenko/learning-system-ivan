import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from "../login.service";
import { User } from "../interfaces/user";
import { messages } from "../constants/messages";

@Component({
  selector: 'ls-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private userEmail: string;
  private userPassword: string;
  private validMessages = messages;
  private loginForm: FormGroup;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    })
  }

  getControl(input: string): AbstractControl {
    return this.loginForm.get(input);
  }

  onSubmit(): void {
   this.loginService.login(this.loginForm.getRawValue());
  }
}
