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

  // toggles whether constraints are valid
  public Constraint = new class {
    hasMaxWaterConstraint: boolean;
    hasMinWaterConstraint: boolean;
    hasMaxTimeConstraint: boolean;
    hasMinTimeConstraint: boolean;
    hasMaxTempConstraint: boolean;
    hasMinTempConstraint: boolean;
    hasMinIngredientConstraint: boolean;
    hasPoisonConstraint: boolean;

    // user-defined constraint values
    maxWater: number;
    minWater: number;
    minIngredient: number;
    minTime: number;
    maxTime: number;
    minTemp: number;
    maxTemp: number;
  }();

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
  cakeIngredients = 'ADD 2 Flour\nADD 1 Water\nADD 0.5 Sugar\n';
  breadIngredients = 'ADD 3 Flour\nADD 1 Water\nADD 0.25 Sugar\n';
  biscuitIngredients = 'ADD 2 Flour\nADD 1 Water\nADD 0.5 Sugar\n';
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
    // console.log('Entered bread recipe function');
    this.recipeInput.value = this.breadIngredients;
    this.recipeInput.value += this.bakeBase;
  }

  insertBiscuitRecipe() {
    this.recipeInput = document.getElementById('recipe_input') as HTMLTextAreaElement;
    // console.log('Entered biscuit recipe function');
    this.recipeInput.value = this.biscuitIngredients;
    this.recipeInput.value += this.bakeBase;
  }

  drawEnding(ending: string) {
    const i = new Image();
    switch (ending) {
      case 'success':
        i.src = 'img/success.png';
        alert('Congrats! You made a food!');
        break;
      case 'poison':
        i.src = 'img/poison.png';
        alert('Oh no! Your humans are dead!');
        break;
      case 'flood':
        i.src = 'img/flood.png';
        alert('You flooded the kitchen!');
        break;
      case 'spacetime':
        i.src = 'img/spacetime.png';
        alert('Oh no! You created a spacetime paradox!');
        break;
      case 'apocalypse':
        i.src = 'img/apocalypse.png';
        alert('Oh no! The food was in the oven so long that civilization has collapsed!');
        break;
      case 'fire':
        i.src = 'img/fire.png';
        alert('You caused a fire!');
        break;
      case 'dinosaurs':
        i.src = 'img/dinosaurs.png';
        alert('Oh no! You sent the robot into the past!');
        break;
      case 'frozen':
        i.src = 'img/frozen.png';
        alert('The kitchen froze!');
        break;
      default:
        console.log('not a valid ending string');
        i.src = 'img/kitchen.png';
    }
    // this.context.drawImage(i, 0, 0);
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
    const lines = input.split('\n'); // get string array of lines

    // checks that there is a valid baking line before parsing input
    const hasBakeLine = new RegExp(/bake /).test(lines[lines.length - 1]);
    let temp = '';
    let time = '';
    if (hasBakeLine) {
      temp = (lines[lines.length - 1].match(/bake[ at]* (\d*)/))[1];
      console.log(lines[lines.length - 1].match(/bake at (\d*)/));
      time = (lines[lines.length - 1].match(/(\d*[.]?\d*) minutes$/))[0];
    }  else { // (!hasBakeLine) {
      // person didn't enter BAKE line
      alert('You need to BAKE it!');
      return;
    }
    // checks for emergency conditions
    if (+temp < 0) {
      freeze = true;
    } else if (+temp > 500) { fire = true; }

    if (+time < 0) { dinosaurs = true; }
    if (this.parseTime(lines[lines.length - 1], +time) > 1000000) { apocalypse = true; }

    // a couple regexes and variable declarations for parsing ingredients
    const getIngredient = /([a-z]*)$/;
    const getQuantity = /add (\d*[.]?\d*)/;
    let ingredient: string;
    let quantity: number;
    for (let i = 0; i < lines.length - 1; i++) {
      ingredient = (lines[i].match(getIngredient))[0];
      quantity = +(lines[i].match(getQuantity)[0]);

      if (quantity < 0) { spacetimeParadox = true; }
      if (this.toxicIngredients.some(v => ingredient[0].includes(v))) {
        // ingredient is one of the defined toxic ingredients
        poison = true;
      }
      if (ingredient === 'water' && quantity > 10) { flood = true; }
    }
    const re = /^([A-Za-z]+) (\d*[.]?\d*) ([A-Z a-z])$/;
    // check that there is a baking line

    // const getNumber = new RegExp('s/^[AaDd]* (\d*[.]?\d*)/\1');
    console.log(temp[1]);

    // choose the ending
    if (spacetimeParadox) {
      this.drawEnding('spacetime');
      this.Constraint.hasMinIngredientConstraint = true;
    } else if (flood) {
      this.drawEnding('flood');
      this.Constraint.hasMaxWaterConstraint = true;
    } else if (fire) {
      this.drawEnding('fire');
      this.Constraint.hasMaxTempConstraint = true;
    } else if (freeze) {
      this.drawEnding('frozen');
      this.Constraint.hasMinTempConstraint = true;
    } else if (apocalypse) {
      this.drawEnding('apocalypse');
      this.Constraint.hasMaxTimeConstraint = true;
    } else if (dinosaurs) {
      this.drawEnding('dinosaurs');
      this.Constraint.hasMaxTimeConstraint = true;
    } else if (poison) {
      this.drawEnding('poison');
      this.Constraint.hasPoisonConstraint = true;
    } else {
      this.drawEnding('success');
    }
    // console.log((document.getElementById('recipe_input') as HTMLTextAreaElement).value);
  }

  /**
   * Returns a time value based on 'minutes', 'days', 'years', etc.
   * @param s String containing the time unit.
   * @param n Number associated with the time unit.
   */
  parseTime(s: string, n: number): number {
    const inYears = new RegExp('year[s]?$');
    if (inYears.test(s)) {
      // user specified years
      return 2147483647;
    }

    const inDays = new RegExp('day[s]?$');
    if (inDays.test(s)) { return 1000000; }

    const inHours = new RegExp('hour[s]?$');
    if (inHours.test(s)) { return n * 60; }

    const inMinutes = new RegExp('minute[s]?$');
    if (inMinutes.test(s)) { return n; }

  }


  ngOnInit() {

    const upperBoundTime = document.createElement('div');
    upperBoundTime.textContent = 'Time must be less than:';
    const upperTimeInput = document.createElement('input');
    upperBoundTime.appendChild(upperTimeInput);

    const lowerBoundTime = document.createElement('div');
    lowerBoundTime.textContent = 'Time must be more than: ';
    const lowerTimeInput = document.createElement('input');
    lowerBoundTime.appendChild(lowerTimeInput);

    const upperBoundTemp = document.createElement('div');
    upperBoundTemp.textContent = 'Temperature must be less than: ';
    const upperTempInput = document.createElement('input');
    upperBoundTemp.appendChild(upperTempInput);

    const lowerBoundTemp = document.createElement('div');
    lowerBoundTemp.textContent = 'Temperature must be more than: ';
    const lowerTempInput = document.createElement('input');
    lowerBoundTemp.appendChild(lowerTempInput);

    const upperBoundIngredient = document.createElement('div');
    upperBoundIngredient.textContent = 'Ingredients must be less than: ';
    const upperIngredientInput = document.createElement('input');
    upperBoundIngredient.appendChild(upperIngredientInput);

    const lowerBoundIngredient = document.createElement('div');
    lowerBoundIngredient.textContent = 'Ingredients must be more than: ';
    const lowerIngredientInput = document.createElement('input');
    lowerBoundIngredient.appendChild(lowerIngredientInput);

    const upperBoundWater = document.createElement('div');
    upperBoundWater.textContent = 'Water must be less than: ';
    const upperWaterInput = document.createElement('input');
    upperBoundWater.appendChild(upperWaterInput);
    // const lowerBoundWater = new HTMLDivElement();
    document.getElementById('constraints').appendChild(upperBoundTime);
    document.getElementById('constraints').appendChild(lowerBoundTime);
    document.getElementById('constraints').appendChild(upperBoundTemp);
    document.getElementById('constraints').appendChild(lowerBoundTemp);
    document.getElementById('constraints').appendChild(upperBoundIngredient);
    document.getElementById('constraints').appendChild(lowerBoundIngredient);
    document.getElementById('constraints').appendChild(upperBoundWater);
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
