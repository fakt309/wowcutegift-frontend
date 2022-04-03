import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ListOfGiftsComponent } from './list-of-gifts/list-of-gifts.component';
import { ListOfWrapsComponent } from './list-of-wraps/list-of-wraps.component';
import { ListOfTapesComponent } from './list-of-tapes/list-of-tapes.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PaymentComponent } from './payment/payment.component';
import { ReadyComponent } from './ready/ready.component';
import { RestoreWindowComponent } from './restore-window/restore-window.component';
import { LoadingComponent } from './loading/loading.component';
import { GiftComponent } from './gift/gift.component';
import { Box2Component } from './box2/box2.component';
import { BottomButtonsComponent } from './bottom-buttons/bottom-buttons.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MenuGiftComponent } from './menu-gift/menu-gift.component';
import { ArchiveButtonComponent } from './archive-button/archive-button.component';
import { ArchiveComponent } from './archive/archive.component';
import { DemoComponent } from './demo/demo.component';
import { DemoMenuComponent } from './demo-menu/demo-menu.component';
import { ReadyPageComponent } from './ready-page/ready-page.component';
import { MessageComponent } from './message/message.component';
import { HomeComponent } from './home/home.component';
import { SkipComponent } from './skip/skip.component';
import { ContinueComponent } from './continue/continue.component';
import { TitleComponent } from './title/title.component';
import { ChatComponent } from './chat/chat.component';
import { ButtonsHomeComponent } from './buttons-home/buttons-home.component';
import { TranslateComponent } from './translate/translate.component';
import { AnalyticComponent } from './analytic/analytic.component';
import { TestComponent } from './test/test.component';
import { ListTouchComponent } from './list-touch/list-touch.component';
import { MenuTouchComponent } from './menu-touch/menu-touch.component';
import { ListAddTouchComponent } from './list-add-touch/list-add-touch.component';

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
    ContextMenuComponent,
    ColorPickerComponent,
    ListOfGiftsComponent,
    ListOfWrapsComponent,
    ListOfTapesComponent,
    NavigationComponent,
    PaymentComponent,
    ReadyComponent,
    RestoreWindowComponent,
    LoadingComponent,
    GiftComponent,
    Box2Component,
    BottomButtonsComponent,
    WelcomeComponent,
    MenuGiftComponent,
    ArchiveButtonComponent,
    ArchiveComponent,
    DemoComponent,
    DemoMenuComponent,
    ReadyPageComponent,
    MessageComponent,
    HomeComponent,
    SkipComponent,
    ContinueComponent,
    TitleComponent,
    ChatComponent,
    ButtonsHomeComponent,
    TranslateComponent,
    AnalyticComponent,
    TestComponent,
    ListTouchComponent,
    MenuTouchComponent,
    ListAddTouchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TranslateComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
