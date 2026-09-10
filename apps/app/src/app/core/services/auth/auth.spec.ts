import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth';
import { environment } from '../../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should return true for valid credentials', () => {
    service.login('admin', 'admin123').subscribe((result) => {
      expect(result).toBe(true);
    });
    const req = httpMock.expectOne(
      `${environment.apiUrl}/credentials?username=admin&password=admin123`
    );
    req.flush([{ id: '1', username: 'admin', password: 'admin123' }]);
  });

  it('should throw error for invalid credentials', () => {
    service.login('wrong', 'wrong').subscribe({
      error: (err) => expect(err.message).toBe('Invalid username or password'),
    });
    const req = httpMock.expectOne(
      `${environment.apiUrl}/credentials?username=wrong&password=wrong`
    );
    req.flush([]);
  });
});