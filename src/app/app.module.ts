import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { FullscreenComponent } from './fullscreen/fullscreen.component';
import { ButtonComponent } from './button/button.component';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { PopupComponent } from './popup/popup.component';
import { SliderGiftsComponent } from './slider-gifts/slider-gifts.component';
import { List2Component } from './list2/list2.component';
import { GreetingCardComponent } from './greeting-card/greeting-card.component';
import { EditOptionComponent } from './edit-option/edit-option.component';
import { TextareaComponent } from './textarea/textarea.component';
import { CroppingComponent } from './cropping/cropping.component';
import { ImageListArrayComponent } from './image-list-array/image-list-array.component';
import { Textarea2Component } from './textarea2/textarea2.component';
import { DrawComponent } from './draw/draw.component';
import { GameComponent } from './game/game.component';
import { ListComponent } from './list/list.component';
import { HangingBoardComponent } from './hanging-board/hanging-board.component';
import { BoxComponent } from './box/box.component';
import { ToolsComponent } from './tools/tools.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    FullscreenComponent,
    ButtonComponent,
    EmptyListComponent,
    PopupComponent,
    SliderGiftsComponent,
    List2Component,
    GreetingCardComponent,
    EditOptionComponent,
    TextareaComponent,
    CroppingComponent,
    ImageListArrayComponent,
    Textarea2Component,
    DrawComponent,
    GameComponent,
    ListComponent,
    HangingBoardComponent,
    BoxComponent,
    ToolsComponent,
    ContextMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
