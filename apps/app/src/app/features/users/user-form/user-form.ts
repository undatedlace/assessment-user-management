import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

// ✅ Switched from 'primeng/*' to '@openng/optimus-ui/*'
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { SelectModule } from '@openng/optimus-ui/select';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { DividerModule } from '@openng/optimus-ui/divider';

import { User, JobRole } from '../../../shared/models/user.model';
import { UsersActions } from '../../../store/users/users.actions';

interface RoleOption {
  label: string;
  value: JobRole;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    DialogModule,
    DividerModule,
  ],
  templateUrl: './user-form.html',
})
export class UserForm implements OnChanges {
  @Input() visible = false;
  @Input() user: User | null = null;
  @Output() closed = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private store = inject(Store);

  roleOptions: RoleOption[] = [
    { label: 'Tech', value: 'tech' },
    { label: 'QA', value: 'qa' },
    { label: 'Graphic Design', value: 'gd' },
    { label: 'Interior Design', value: 'id' },
  ];

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    jobRole: [null as JobRole | null, Validators.required],
  });

  get isEditMode(): boolean { return !!this.user; }
  get dialogTitle(): string { return this.isEditMode ? 'Edit User' : 'Add User'; }
  get f() { return this.form.controls; }

  ngOnChanges(): void {
    if (this.user) {
      this.form.patchValue({
        username: this.user.username,
        email: this.user.email,
        jobRole: this.user['job-role'],
      });
    } else {
      this.form.reset();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, email, jobRole } = this.form.value;

    if (this.isEditMode && this.user) {
      this.store.dispatch(
        UsersActions.updateUser({
          user: {
            id: this.user.id,
            username: username!,
            email: email!,
            'job-role': jobRole!,
          },
        })
      );
    } else {
      this.store.dispatch(
        UsersActions.addUser({
          user: {
            username: username!,
            email: email!,
            'job-role': jobRole!,
          },
        })
      );
    }

    this.close();
  }

  close(): void {
    this.form.reset();
    this.closed.emit();
  }
}
