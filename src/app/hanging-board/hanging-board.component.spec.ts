import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { By } from "@angular/platform-browser"

import { HangingBoardComponent } from './hanging-board.component';

describe('HangingBoardComponent', () => {
  let component: HangingBoardComponent;
  let fixture: ComponentFixture<HangingBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HangingBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HangingBoardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should works method show', fakeAsync(() => {
    component.show()
    expect(component.display).toBe('flex')
    tick(10)
    expect(component.transform).toBe('translateY(0%)')
    expect(component.shown).toBe(true)
  }))

  it('should works method hide', fakeAsync(() => {
    component.hide()
    expect(component.transform).toBe('translateY(-100%)')
    tick(300)
    expect(component.shown).toBe(false)
    expect(component.display).toBe('none')
  }))

  it('should input bucks', fakeAsync(() => {
    let input = fixture.debugElement.query(By.css('.content > .block > .inputwrap > .input')).nativeElement
    expect(component.cost).toBe(parseInt(input.value))
  }))
});
