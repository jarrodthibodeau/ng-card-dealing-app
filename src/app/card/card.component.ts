import { Component, Input, OnInit } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    animations: [
        trigger('appearDisappear', [
            state('appear', style({
                opacity: 1
            })),
            state('disappear', style({
                opacity: 0
            })),
            transition('disappear => appear', [
                animate('0.5s')
            ]),
            transition('appear => disappear', [
                animate('0.5s')
            ])
        ])
    ]
})
export class CardComponent implements OnInit {
    @Input() suit: string;
    @Input() value: number;
    symbol: String;
    color: String;
    isAppearing = false;

    constructor() {}

    ngOnInit() {
        this.determineSymbol(this.suit);
        setTimeout(() => {
            this.isAppearing = true;
        }, 250);
    }

    determineSymbol(s) {
        switch (s) {
            case 'Clubs':
                this.symbol = '♣';
                this.color = 'black';
                break;
            case 'Diamonds':
                this.symbol = '♦';
                this.color = 'red';
                break;
            case 'Hearts':
                this.symbol = '♥';
                this.color = 'red';
                break;
            case 'Spades':
                this.symbol = '♠';
                this.color = 'black';
                break;
        }
    }
}
