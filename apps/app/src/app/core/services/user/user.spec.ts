import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user';
import { User } from '../../../shared/models/user.model';
import { environment } from '../../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/users`;
  const mockUser: User = { id: '1', username: 'johndoe', email: 'john@example.com', 'job-role': 'tech' };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should fetch all users', () => {
    service.getUsers().subscribe((users) => expect(users.length).toBe(1));
    httpMock.expectOne(apiUrl).flush([mockUser]);
  });

  it('should add a user', () => {
    const newUser = { username: 'jane', email: 'jane@example.com', 'job-role': 'qa' as const };
    service.addUser(newUser).subscribe((u) => expect(u.id).toBe('2'));
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ id: '2', ...newUser });
  });

  it('should update a user', () => {
    service.updateUser(mockUser).subscribe((u) => expect(u.username).toBe('johndoe'));
    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockUser);
  });

  it('should delete a user', () => {
    service.deleteUser('1').subscribe(() => expect(true).toBe(true));
    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});