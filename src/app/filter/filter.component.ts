import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';

@Component({
    selector: 'app-filter',
    styleUrls: ['./filter.component.css'],
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit, OnChanges {
    @Input() config: any;
    @Input() numOfCardsInDeck: Number;
    @Output() configUpdate = new EventEmitter();

    minNumSelections = Array<Number|String>();
    maxNumSelections = Array<Number|String>();
    numCardsInHandSelections = Array<Number>();
    suitsSelection: Array<String> = [
        'Clubs',
        'Diamonds',
        'Hearts',
        'Spades'
    ];

    constructor() {}

    ngOnInit() {
        const determineValues: any = (x, i) => {
            switch (i + 2) {
                case 11:
                return {text: 'J', value: 11};
                case 12:
                return {text: 'Q', value: 12};
                case 13:
                return {text: 'K', value: 13};
                case 14:
                return {text: 'A', value: 14};
                default:
                return {text: i + 2, value: i + 2};
            }
        };


        this.minNumSelections = Array(13).fill(0).map(determineValues);
        this.maxNumSelections = Array(13).fill(0).map(determineValues);
        this.numCardsInHandSelections = Array(this.numOfCardsInDeck).fill(0).map((x, i) => i + 1);
    }

    ngOnChanges(c) {
        if (c.numOfCardsInDeck) {
            this.numCardsInHandSelections = Array(c.numOfCardsInDeck.currentValue).fill(0).map((x, i) => i + 1);
        }
    }

    handleMinValueChange(e) {
        if (Number(e.srcElement.value) > this.config.maxValue) {
            alert('Min value cannot be higher than max value, please change your settings');
            this.configUpdate.emit({error: true});
        } else {
            this.config.minValue = Number(e.srcElement.value);
            this.configUpdate.emit(this.config);
        }
    }

    handleMaxValueChange(e) {
        if (Number(e.srcElement.value) < this.config.minValue) {
            alert('Max value cannot be less than min value, please change your settings');
            this.configUpdate.emit({error: true});
        } else {
            this.config.maxValue = Number(e.srcElement.value);
            this.configUpdate.emit(this.config);
        }
    }

    handleNumOfCardsInHandChange(e) {
        this.config.numOfCardsInHand = e.srcElement.value;
        this.configUpdate.emit(this.config);
    }

    handleSuitsChange(e) {
        this.config.suits[e.srcElement.name] = e.srcElement.checked;
        this.configUpdate.emit(this.config);
    }
}
