import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricePipe } from './price.pipe';
import { RemoveUnderScorePipe } from './remove-under-score.pipe';
import { ReplaceWhiteSpacePipe } from './replace-white-space.pipe';
 
@NgModule({
  declarations: [
    PricePipe, 
    RemoveUnderScorePipe, 
    ReplaceWhiteSpacePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PricePipe, 
    RemoveUnderScorePipe, 
    ReplaceWhiteSpacePipe,
 
  ]
})
export class SharedPipesModule { }