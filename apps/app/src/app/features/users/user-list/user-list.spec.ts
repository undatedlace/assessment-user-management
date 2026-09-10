import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserList } from './user-list';
import { provideMockStore } from '@ngrx/store/testing';

describe('UserList', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;

   const initialState = {
    users: {
      ids: [],   
      entities: {},
      loading: false,
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserList],
      providers:[provideMockStore({initialState})]
    }).compileComponents();

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
