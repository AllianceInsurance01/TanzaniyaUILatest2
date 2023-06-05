import { Component, OnInit, Input, Inject } from '@angular/core';


@Component({
  selector: 'app-Rating',
  templateUrl: './Rating.component.html',
  styleUrls: ['./Rating.component.scss']
})

export class RatingComponent implements OnInit {

    RatingList=[
        {Code:"PrivateComprehensive",CodeDesc:"PrivateComprehensive"}
    ]
    RatingValue:any;
    ngOnInit(): void {
        
    }
}
