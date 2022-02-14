import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BoxComponent } from './box.component';

describe('BoxComponent', () => {
  let component: BoxComponent;
  let fixture: ComponentFixture<BoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('test Inputs', () => {
    component.width = 50
    component.height = 400
    component.depth = 320
    component.color = "#ee33dd"
    component.unbox = true
    expect(component.width).toEqual(50)
    expect(component.height).toEqual(400)
    expect(component.depth).toEqual(320)
    expect(component.unbox).toEqual(true)
  })

  it('should unpack works', fakeAsync(async () => {
    component.width = 50
    component.height = 100
    component.depth = 150
    component.unpack()
    tick(350)
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    expect(compiled.querySelector(".side.front").style.transform).toEqual("translateZ(75px) rotateX(-90deg)")
    expect(compiled.querySelector(".side.back").style.transform).toEqual("translateZ(-75px) rotateY(180deg) rotateX(-90deg)")
    expect(compiled.querySelector(".side.left").style.transform).toEqual("translateX(-25px) rotateY(-90deg) rotateX(-90deg)")
    expect(compiled.querySelector(".side.right").style.transform).toEqual("translateX(25px) rotateY(90deg) rotateX(-90deg)")
    expect(compiled.querySelector(".side.top").style.transform).toEqual("translateX(25px) translateY(-50px) rotateX(0deg) rotateZ(-90deg)")
    expect(compiled.querySelector(".side.bottom").style.transform).toEqual("translateY(50px) rotateX(-90deg)")
  }))

  it('should pack works', fakeAsync(async () => {
    component.width = 50
    component.height = 100
    component.depth = 150
    component.pack()
    tick(350)
    component.unpack()
    fixture.detectChanges()
    tick(350)
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    expect(compiled.querySelector(".side.front").style.transform).toEqual("translateZ(75px) rotateX(-90deg)")
    expect(compiled.querySelector(".side.back").style.transform).toEqual("translateZ(-75px) rotateY(180deg) rotateX(-90deg)")
    expect(compiled.querySelector(".side.left").style.transform).toEqual("translateX(-25px) rotateY(-90deg) rotateX(-90deg)")
    expect(compiled.querySelector(".side.right").style.transform).toEqual("translateX(25px) rotateY(90deg) rotateX(-90deg)")
    expect(compiled.querySelector(".side.top").style.transform).toEqual("translateX(25px) translateY(-50px) rotateX(0deg) rotateZ(-90deg)")
    expect(compiled.querySelector(".side.bottom").style.transform).toEqual("translateY(50px) rotateX(-90deg)")
  }))
});
