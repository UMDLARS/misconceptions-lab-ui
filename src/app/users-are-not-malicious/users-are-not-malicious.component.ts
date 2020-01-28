import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-users-are-not-malicious',
  templateUrl: './users-are-not-malicious.component.html',
  styleUrls: ['./users-are-not-malicious.component.css']
})

export class UsersAreNotMaliciousComponent implements OnInit {

  // canvas: ElementRef<HTMLCanvasElement>;

  public questions;
  // private context: CanvasRenderingContext2D;
  recipeInput: HTMLTextAreaElement;

  // user-defined constraint values
  maxWater: number;
  minWater: number;
  minIngredient: number;
  minTime: number;
  maxTime: number;
  minTemp: number;
  maxTemp: number;

  // toggles whether constraints are valid
  hasMaxWaterConstraint: boolean;
  hasMinWaterConstraint: boolean;
  hasMaxTimeConstraint: boolean;
  hasMinTimeConstraint: boolean;
  hasMaxTempConstraint: boolean;
  hasMinTempConstraint: boolean;
  hasMinIngredientConstraint: boolean;

  // holds result, used to determine how game ends
  result: string;

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

    // this.canvas.width = this.width * this.cellWidth;
    // this.canvas.height = this.height * this.cellHeight;

    // this.context.fillStyle = 'blue';
    // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // commenting the below out made the constructor work again

  }
  /* Defining recipe strings here */
  cakeIngredients = 'ADD Flour 2 cups\nADD Water 1 cups\nADD Sugar 0.5 cups\n';
  breadIngredients = 'ADD Flour 3 cups\nADD Water 1 cups\nADD Sugar 0.25 cups\n';
  biscuitIngredients = 'ADD Flour 2 cups\nADD Water 1 cups\nADD Sugar 0.5 cups\n';
  bakeBase = 'BAKE AT 350 DEGREES FOR 60 MINUTES';
  validIngredients = [
    'flour',
    'water',
    'salt',
    'sugar'
  ];
  toxicIngredients = [
    'knife',
    'bleach',
    'sponge'
  ];

  insertCakeRecipe() {
    this.recipeInput = document.getElementById('recipe_input') as HTMLTextAreaElement;
    this.recipeInput.value = this.cakeIngredients;
    this.recipeInput.value += this.bakeBase;
  }

insertBreadRecipe() {
    this.recipeInput = document.getElementById('recipe_input') as HTMLTextAreaElement;
    console.log('Entered bread recipe function');
    this.recipeInput.value = this.breadIngredients;
    this.recipeInput.value += this.bakeBase;
  }

insertBiscuitRecipe() {
    this.recipeInput = document.getElementById('recipe_input') as HTMLTextAreaElement;
    console.log('Entered biscuit recipe function');
    this.recipeInput.value = this.biscuitIngredients;
    this.recipeInput.value += this.bakeBase;
  }

  drawEnding(ending: string) {
    switch (ending) {
      case 'success':
        const s = new Image();
        s.src = 'img/success.png';
        // this.context.drawImage(s, 0, 0);
        alert('Congrats! You made a food!');
        break;
      case 'poison':
        const p = new Image();
        p.src = 'img/poison.png';
        alert('Oh no! Your humans are dead!');
        // this.context.drawImage(p, 0, 0);
        break;
      case 'flood':
        const flood = new Image();
        flood.src = 'img/flood.png';
        alert('You flooded the kitchen!');
        // this.context.drawImage(flood, 0, 0);
        break;
      case 'spacetime':
        const spacetime = new Image();
        spacetime.src = 'img/spacetime.png';
        alert('Oh no! You created a spacetime paradox!');
        // this.context.drawImage(spacetime, 0, 0);
        break;
      case 'apocalypse':
        const a = new Image();
        a.src = 'img/apocalypse.png';
        alert('Oh no! The food was in the oven so long that civilization has collapsed!');
        // this.context.drawImage(a, 0, 0);
        break;
      case 'fire':
        const fire = new Image();
        fire.src = 'img/fire.png';
        alert('You caused a fire!');
        // this.context.drawImage(a, 0, 0);
        break;
      case 'dinosaurs':
        const d = new Image();
        d.src = 'img/dinosaurs.png';
        alert('Oh no! You sent the robot into the past!');
        // this.context.drawImage(d, 0, 0);
        break;
      case 'frozen':
        const f = new Image();
        f.src = 'img/frozen.png';
        alert('The kitchen froze!');
        // this.context.drawImage(f, 0, 0);
        break;
      default:
        console.log('not a valid ending string');
    }
  }

  parseInput() {

    let apocalypse = false;
    let flood = false;
    let poison = false;
    let freeze = false;
    let spacetimeParadox = false;
    let dinosaurs = false;
    let fire = false;

    const input = (document.getElementById('recipe_input') as HTMLTextAreaElement).value.toLowerCase();
    poison = input.includes('knife') || input.includes('sponge') || input.includes('bleach');
    const lines = input.split('\n'); // get string array of lines
    for (const s of lines ) {

    }
    // const regex = new RegExp('^[AaDd]* (\d*[.]?\d*)');
    const re = /^([A-Za-z]+) (\d*[.]?\d*) ([A-Z a-z])$/;
    // get actions of each line
    const action = lines[3].match(/^[A-Za-z]+/); // extracts BAKE
    const quantity = input.match(/\d*[.]?\d*/);
    const ingredient = input.replace(re, '$3');
    const temp = lines[lines.length - 1].match(/bake[ at]* ([\d]*)/);
    if (temp[0] === '') {
      // person didn't enter BAKE line
      alert('You need to BAKE it!');
      return;
    }
    // const getNumber = new RegExp('s/^[AaDd]* (\d*[.]?\d*)/\1');
    console.log(temp[1]);

    // choose the ending
    if (spacetimeParadox) {
      this.drawEnding('spacetime');
    } else if (flood) {
      this.drawEnding('flood');
    } else if (fire) {
      this.drawEnding('fire');
    } else if (freeze) {
      this.drawEnding('frozen');
    } else if (apocalypse) {
      this.drawEnding('apocalypse');
    } else if (dinosaurs) {
      this.drawEnding('dinosaurs');
    } else if (poison) {
      this.drawEnding('poison');
    } else {
      this.drawEnding('success');
    }
    // console.log((document.getElementById('recipe_input') as HTMLTextAreaElement).value);
  }

  parseLine(s: string) {
    const getIngredient = /([a-z]*)$/;
    const ingredient = s.match(getIngredient);
    const getQuantity = /add (\d[.]?\d)/;
    const quantity = s.match(getQuantity);
    if (this.minIngredient) {
    }
    console.log(ingredient[0]);
  }


  ngOnInit() {

    const upperBoundTime = document.createElement('div');
    upperBoundTime.textContent = 'time bounds';
    // const lowerBoundTime = new HTMLDivElement();
    // const upperBoundTemp = new HTMLDivElement();
    // const lowerBoundTemp = new HTMLDivElement();
    // const upperBoundIngredient = new HTMLDivElement();
    // const lowerBoundIngredient = new HTMLDivElement();
    // const upperBoundWater = new HTMLDivElement();
    // const lowerBoundWater = new HTMLDivElement();
    document.getElementById('constraints').appendChild(upperBoundTime);

    // this.context = this.canvas.nativeElement.getContext('2d');

    // const kitchen = new Image();
    // kitchen.src = 'img/kitchen.png';
    //
    // kitchen.onload = () => {
    //   console.log('Drawing kitchen');
    //   this.context.drawImage(kitchen, 0, 0);
    // };
  }
}
