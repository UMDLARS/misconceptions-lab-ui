import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-users-are-not-malicious',
  templateUrl: './users-are-not-malicious.component.html',
  styleUrls: ['./users-are-not-malicious.component.css']
})
export class UsersAreNotMaliciousComponent implements OnInit {

  public questions;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  recipeInput: HTMLTextAreaElement;

  constructor() {
    this.questions = [

      {prompt: '1) Question one?',
        options: [
          'Answer 0.',
          'Answer 1.',
          'Answer 2.',
          'Answer 3.'
        ],
        answer: '3',
        result: ' '},
      {prompt: '2) Question two?',
        options: [
          'Answer 0.',
          'Answer 1.',
          'Answer 2.',
          'Answer 3.'
        ],
        answer: '0',
        result: ' '}
    ];

    // this.canvas = document.getElementById('robot') as HTMLCanvasElement;
    // this.context = this.canvas.getContext('2d');
    // this.canvas.width = this.width * this.cellWidth;
    // this.canvas.height = this.height * this.cellHeight;

    // this.context.fillStyle = 'blue';
    // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // const kitchen = new Image();
    // kitchen.src = 'img/kitchen.png';

    // kitchen.onload = () => {
    //   this.context.drawImage(kitchen, 0, 0);
    // };

  }
  /* Defining recipe strings here */
  addIngredientsBase = 'ADD Flour 2 cups;\nADD Water 1 cups;\nADD Sugar 0.5 cups;';
  bakeBase = 'BAKE oven AT 350 DEGREES FOR 60 MINUTES';

  insertCakeRecipe() {
    this.recipeInput = document.getElementById('recipe_input') as HTMLTextAreaElement;
    // console.log('Entered cake recipe function');
    this.recipeInput.setRangeText('text');
  }

insertBreadRecipe() {
    this.recipeInput = document.getElementById('recipe_input') as HTMLTextAreaElement;
    console.log('Entered bread recipe function');
  }

insertBiscuitRecipe() {
    this.recipeInput = document.getElementById('recipe_input') as HTMLTextAreaElement;
    console.log('Entered biscuit recipe function');
  }


ngOnInit() {
  }

}
