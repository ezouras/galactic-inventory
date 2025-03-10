import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostersPageComponent } from './posters-page.component';

describe('PostersPageComponent', () => {
  let component: PostersPageComponent;
  let fixture: ComponentFixture<PostersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostersPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
