import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>🧩 Memory Game – Овошје</h2>

    <table class="game-table">
      <tr *ngFor="let row of [0,1,2]">
        <td
          *ngFor="let col of [0,1,2,3]"
          class="card-cell"
          (click)="flipCard(cards[row * 4 + col])"
        >
          <span class="emoji">
            {{
              cards[row * 4 + col]?.flipped ||
              cards[row * 4 + col]?.matched
                ? cards[row * 4 + col]?.front
                : back
            }}
          </span>
        </td>
      </tr>
    </table>

    <p>🔄 Обиди: <strong>{{ obidi }}</strong></p>
    <button (click)="restartGame()">🔁 Рестарт</button>
  `,
  styles: [`
    h2 {
      text-align: center;
    }

    .game-table {
      margin: 20px auto;
      border-collapse: collapse;
    }

    .card-cell {
      width: 80px;
      height: 80px;
      border: 2px solid #333;
      text-align: center;
      vertical-align: middle;
      font-size: 40px;
      cursor: pointer;
      user-select: none;
      transition: background-color 0.2s;
    }

    .card-cell:hover {
      background-color: #f2f2f2;
    }

    button {
      display: block;
      margin: 10px auto;
      padding: 6px 14px;
      font-size: 16px;
      cursor: pointer;
    }
  `]
})
export class AppComponent {

  back: string = '❓';

  sliki: string[] = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍍'];

  cards: any[] = [];
  obidi: number = 0;
  firstCard: any = null;
  lockBoard: boolean = false;

  constructor() {
    this.restartGame();
  }

  flipCard(card: any) {
    if (this.lockBoard || !card || card.flipped || card.matched) return;

    card.flipped = true;

    if (!this.firstCard) {
      this.firstCard = card;
      return;
    }

    this.lockBoard = true;
    this.obidi++;

    if (this.firstCard.front === card.front) {
      this.firstCard.matched = true;
      card.matched = true;
      this.resetBoard();
      this.checkWin();
    } else {
      setTimeout(() => {
        this.firstCard.flipped = false;
        card.flipped = false;
        this.resetBoard();
      }, 1000);
    }
  }

  resetBoard() {
    this.firstCard = null;
    this.lockBoard = false;
  }

  checkWin() {
    if (this.cards.every(c => c.matched)) {
      setTimeout(() => {
        alert(`Браво! Ги најде сите парови за ${this.obidi} обиди.`);
        this.restartGame();
      }, 300);
    }
  }

  restartGame() {
    this.obidi = 0;
    this.firstCard = null;
    this.lockBoard = false;

    this.cards = [...this.sliki, ...this.sliki]
      .map(emoji => ({
        front: emoji,
        flipped: false,
        matched: false
      }))
      .sort(() => 0.5 - Math.random());
  }
}
