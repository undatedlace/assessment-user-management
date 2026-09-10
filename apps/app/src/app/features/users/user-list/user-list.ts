import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

// ✅ Switched API services and types to @openng/optimus-ui/api
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';

// ✅ Switched layout and input modules to @openng/optimus-ui/*
import { Table, TableModule } from '@openng/optimus-ui/table';
import { ButtonModule } from '@openng/optimus-ui/button';
import { TagModule } from '@openng/optimus-ui/tag';
import { TooltipModule } from '@openng/optimus-ui/tooltip';
import { ConfirmDialogModule } from '@openng/optimus-ui/confirmdialog';
import { ToastModule } from '@openng/optimus-ui/toast';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { SelectModule } from '@openng/optimus-ui/select';
import { IconFieldModule } from '@openng/optimus-ui/iconfield';
import { InputIconModule } from '@openng/optimus-ui/inputicon';

import { UsersActions } from '../../../store/users/users.actions';
import { AuthActions } from '../../../store/auth/auth.actions';
import { selectAllUsers, selectUsersLoading } from '../../../store/users/users.selectors';
import { User, JobRole } from '../../../shared/models/user.model';
import { UserFormComponent } from '../user-form/user-form';

import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import { toSignal } from '@angular/core/rxjs-interop'
import { map, shareReplay } from 'rxjs/operators'

interface RoleOption {
  label: string;
  value: JobRole | null;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    TagModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    SelectModule,
    IconFieldModule,
    InputIconModule,
    UserFormComponent,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './user-list.html',
})
export class UserList implements OnInit {
  @ViewChild('dt') dt!: Table;

  private breakpointObserver = inject(BreakpointObserver);

  isMobile = toSignal(
    this.breakpointObserver.observe(['(max-width: 767px)']).pipe(
      map(result => result.matches),
      shareReplay()
    ),
    { initialValue: false }
  );

  private store = inject(Store);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  users$ = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectUsersLoading);

  showDialog = false;
  selectedUser: User | null = null;

  // Global search
  globalFilter = '';

  // Column filters
  columnFilters = {
    username: '',
    email: '',
    jobRole: null as JobRole | null,
  };

  globalFilterFields = ['username', 'email', 'job-role'];

  roleFilterOptions: RoleOption[] = [
    { label: 'All Roles', value: null },
    { label: 'Tech', value: 'tech' },
    { label: 'QA', value: 'qa' },
    { label: 'Graphic Design', value: 'gd' },
    { label: 'Interior Design', value: 'id' },
  ];

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  onGlobalFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(value, 'contains');
  }

  onColumnFilter(value: string | null, field: string): void {
    this.dt.filter(value ?? '', field, 'contains');
  }

  onRoleFilter(value: JobRole | null): void {
    this.dt.filter(value ?? '', 'job-role', value ? 'equals' : 'contains');
  }

  clearAllFilters(): void {
    this.globalFilter = '';
    this.columnFilters = { username: '', email: '', jobRole: null };
    this.dt.clear();
  }

  openAddDialog(): void {
    this.selectedUser = null;
    this.showDialog = true;
  }

  openEditDialog(user: User): void {
    this.selectedUser = { ...user };
    this.showDialog = true;
  }

  confirmDelete(user: User): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete <strong>${user.username}</strong>?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.store.dispatch(UsersActions.deleteUser({ id: user.id }));
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: `${user.username} was removed`,
          life: 3000,
        });
      },
    });
  }

  onDialogClose(): void {
    this.showDialog = false;
    this.selectedUser = null;
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  getRoleSeverity(role: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    const map: Record<string, 'success' | 'info' | 'warn' | 'danger' | 'secondary'> = {
      tech: 'info',
      qa: 'warn',
      gd: 'success',
      id: 'secondary',
    };
    return map[role] ?? 'secondary';
  }

  getRoleLabel(role: string): string {
    const map: Record<string, string> = {
      tech: 'Tech',
      qa: 'QA',
      gd: 'Graphic Design',
      id: 'Interior Design',
    };
    return map[role] ?? role;
  }
}
