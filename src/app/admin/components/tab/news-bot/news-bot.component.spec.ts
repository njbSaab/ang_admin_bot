import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsBotComponent } from './news-bot.component';

describe('NewsBotComponent', () => {
  let component: NewsBotComponent;
  let fixture: ComponentFixture<NewsBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsBotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
