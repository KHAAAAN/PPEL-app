/* tslint:disable:no-unused-variable */
import { FrontContentComponent } from './front-content.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

////////  SPECS  /////////////
describe('FrontContentComponent', function () {
  let de: DebugElement;
  let comp: FrontContentComponent;
  let fixture: ComponentFixture<FrontContentComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
      declarations: [ FrontContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontContentComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have expected <h1> text', () => {
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch(/angular app/i,
      '<h1> should say something about "Angular App"');
  });
});