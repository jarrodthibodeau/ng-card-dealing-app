import { Component, Input } from '@angular/core';
import Card from './card/card.interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() numOfDecks = 1; // Future builds would allow for this to be configured

  deck: Array<Card> = [];
  hand: Array<Card> = [];
  error: Boolean = false;
  cardsInDeck = 52 * this.numOfDecks;
  config = {
    minValue: 2,
    maxValue: 14,
    numOfCardsInHand: 7,
    suits: {
      'Clubs': true,
      'Diamonds': true,
      'Hearts': true,
      'Spades': true
    }
  };

  constructor() {
    this.buildDeck();
  }

  buildDeck() {
    const suits = Object.keys(this.config.suits).filter(s => this.config.suits[s] === true);
    const loopLength =  suits.length * ((this.config.maxValue - this.config.minValue) + 1) * this.numOfDecks;
    let suitPosition = 0;
    let cardValue = this.config.minValue;

    for (let i = 0; i < loopLength; i++) {
      if (cardValue % (Number(this.config.maxValue) + 1) === 0 && i !== 0) {
        suitPosition++;

        if (suitPosition >= suits.length) {
          suitPosition = 0;
        }

        cardValue = this.config.minValue;
      }

      switch (cardValue) {
        case 11:
          this.deck.push({suit: suits[suitPosition], value: 'J'});
          break;
        case 12:
          this.deck.push({suit: suits[suitPosition], value: 'Q'});
          break;
        case 13:
          this.deck.push({suit: suits[suitPosition], value: 'K'});
          break;
        case 14:
          this.deck.push({suit: suits[suitPosition], value: 'A'});
          break;
        default:
          this.deck.push({suit: suits[suitPosition], value: cardValue});
          break;
      }

      cardValue++;
    }

    //Now we shuffle our built deck
    const shuffledDeck = [];
    const deckLength = this.deck.length;

    for (let i = 0; i < deckLength; i++) {
      shuffledDeck.push(this.deck.splice(Math.floor(Math.random() * this.deck.length), 1));
    }

    this.deck = shuffledDeck;
  }

  drawCards() {
    if (this.deck.length < this.config.numOfCardsInHand) {
      alert('There are not enough cards in the deck, please reshuffle the deck');
    } else {
      this.hand = [];

      for (let i = 0; i < this.config.numOfCardsInHand; i++) {
        const {value, suit} = this.deck.pop()[0];
        this.hand.push({value: value, suit: suit});
      }
    }
  }

  shuffleDeck() {
    this.hand = [];
    this.deck = [];

    this.buildDeck();
  }

  onConfigUpdate(config) {
    if (config.error) {
      this.error = true;
    } else {
      this.error = false;
      this.config = config;
      this.deck = [];
      this.hand = [];
      this.cardsInDeck = Object.keys(this.config.suits)
                        .filter(s => this.config.suits[s] === true)
                        .length * ((this.config.maxValue - this.config.minValue) + 1) * this.numOfDecks;
  
      this.buildDeck();
    }
  }
}
