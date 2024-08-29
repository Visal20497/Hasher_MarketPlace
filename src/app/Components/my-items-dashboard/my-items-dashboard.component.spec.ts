import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyItemsDashboardComponent } from './my-items-dashboard.component';

describe('MyItemsDashboardComponent', () => {
  let component: MyItemsDashboardComponent;
  let fixture: ComponentFixture<MyItemsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyItemsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyItemsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
