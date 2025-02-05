import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsBotComponent } from './posts-bot.component';

describe('PostsBotComponent', () => {
  let component: PostsBotComponent;
  let fixture: ComponentFixture<PostsBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsBotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
