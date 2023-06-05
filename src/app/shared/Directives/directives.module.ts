import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropFileUploadDirective } from './drag-drop.directive';
import { SeparatorDirective } from './seperator.directive';



@NgModule({
  declarations: [
    DragDropFileUploadDirective,
    SeparatorDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DragDropFileUploadDirective,
    SeparatorDirective
  ],
})
export class DirectivesModule { }
