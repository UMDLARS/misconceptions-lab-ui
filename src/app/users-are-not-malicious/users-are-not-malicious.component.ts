import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-users-are-not-malicious',
  templateUrl: './users-are-not-malicious.component.html',
  styleUrls: ['./users-are-not-malicious.component.css']
})

export class UsersAreNotMaliciousComponent implements OnInit {

  canvas: HTMLCanvasElement;

  public questions;
  private context: CanvasRenderingContext2D;
  recipeInput: HTMLTextAreaElement;
  upperBoundTime: HTMLDivElement;
  lowerBoundTime: HTMLDivElement;
  upperBoundTemp: HTMLDivElement;
  lowerBoundTemp: HTMLDivElement;
  upperBoundIngredient: HTMLDivElement;
  lowerBoundIngredient: HTMLDivElement;
  upperBoundWater: HTMLDivElement;

  // toggles whether constraints are valid
  public Constraint = new class {
    hasMaxWaterConstraint: boolean;
    // min water is probably same as min ingredient
    // hasMinWaterConstraint: boolean;
    hasMaxTimeConstraint: boolean;
    hasMinTimeConstraint: boolean;
    hasMaxTempConstraint: boolean;
    hasMinTempConstraint: boolean;
    hasMaxIngredientConstraint: boolean;
    hasMinIngredientConstraint: boolean;
    hasPoisonConstraint: boolean;

    // user-defined constraint values
    maxWater: number;
    minWater: number;
    maxIngredient: number;
    minIngredient: number;
    minTime: number;
    maxTime: number;
    minTemp: number;
    maxTemp: number;
  }();

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
    this.recipeInput.value = this.breadIngredients;
    this.recipeInput.value += this.bakeBase;
  }

  insertBiscuitRecipe() {
    this.recipeInput = document.getElementById('recipe_input') as HTMLTextAreaElement;
    this.recipeInput.value = this.biscuitIngredients;
    this.recipeInput.value += this.bakeBase;
  }

  drawEnding(ending: string) {
    const i = new Image();
    i.src = 'assets/images/robot/kitchen.jpg';

    switch (ending) {
      case 'success':
        i.src = 'assets/images/robot/success.jpg';
        // alert('Congrats! You made a food!');
        break;
      case 'poison':
        i.src = 'assets/images/robot/poison.jpg';
        alert('Oh no! Your humans are dead!');
        break;
      case 'flood':
        i.src = 'assets/images/robot/flooded.jpg';
        // alert('You flooded the kitchen!');
        break;
      case 'spacetime':
        i.src = 'assets/images/robot/spacetime.jpg';
        // alert('Oh no! You created a spacetime paradox!');
        break;
      case 'apocalypse':
        i.src = 'assets/images/robot/apocalypse.jpg';
        // alert('Oh no! The food was in the oven so long that civilization has collapsed!');
        break;
      case 'fire':
        i.src = 'assets/images/robot/fire.jpg';
        // alert('You caused a fire!');
        break;
      case 'dinosaurs':
        i.src = 'assets/images/robot/dino.jpg';
        // alert('Oh no! You sent the robot into the past!');
        break;
      case 'frozen':
        i.src = 'assets/images/robot/cold.jpg';
        // alert('The kitchen froze!');
        break;
      default:
        console.log('not a valid ending string');
    }

    i.onload = () => {
      this.context.drawImage(i, 0, 0, this.canvas.width, this.canvas.height);
    };
  }
  parseInput() {

    this.getConstraints();

    let apocalypse = false;
    let flood = false;
    let poison = false;
    let freeze = false;
    let spacetimeParadox = false;
    let dinosaurs = false;
    let fire = false;
    let invalidIngredient = false;

    const input = (document.getElementById('recipe_input') as HTMLTextAreaElement).value.toLowerCase();
    const lines = input.split('\n'); // get string array of lines

    // checks that there is a valid baking line before parsing input
    const hasBakeLine = new RegExp(/bake /).test(lines[lines.length - 1]);
    let temp = '';
    let time;

    if (hasBakeLine) {
      temp = (lines[lines.length - 1].match(/bake[ at]* (-?\d+)/))[1];
      // console.log(temp);
      time = this.parseTime(lines[lines.length - 1]);
      if (isNaN(time)) {
        alert('You want me to bake this for how long?');
        return;
      }
      // console.log('time is: ' + time);
    }  else { // (!hasBakeLine) {
      // person didn't enter BAKE line
      alert('You need to BAKE it!');
      return;
    }

    // checks for emergency conditions in baking line
    if (this.Constraint.hasMinTempConstraint && +temp < this.Constraint.minTemp) {
      alert('The oven can\'t be that cold!');
      return;
    }
    if (this.Constraint.hasMaxTempConstraint && +temp > this.Constraint.maxTemp) {
      alert('That\'s too hot!');
      return;
    }
    if (+temp < 0) {
      freeze = true;
    } else if (+temp > 500) { fire = true; }

    console.log('Min ingredient: ' + +this.Constraint.minIngredient);
    if (this.Constraint.hasMinTimeConstraint && time < this.Constraint.minTime) {
      alert('You need to bake it longer than that!');
      return;
    }
    if (this.Constraint.hasMaxTimeConstraint && time > this.Constraint.maxTime) {
      alert('You can\'t bake it that long!');
      return;
    }
    if (time < 0) {
      dinosaurs = true;
    } else if (time > 100000) {
      apocalypse = true;
    }

    // a couple regexes and variable declarations for parsing ingredients
    const getIngredient = /([a-z]+)$/;
    const getQuantity = /add (-?\d*[.]?\d*)/;
    let ingredient: string;
    let quantity: number;

    // loop through lines checking ingredients and quantities
    for (let i = 0; i < lines.length - 1; i++) {
      ingredient = (lines[i].match(getIngredient))[0];
      quantity = parseFloat((lines[i].match(getQuantity))[1]);
      console.log('quantity is: ' + lines[i].match(getQuantity)[1]);

      if (isNaN(quantity)) {
        alert('How much ' + ingredient + ' did you want?');
        return;
      }

      if (this.validIngredients.some(v => ingredient.includes(v))) {
        if (ingredient === 'water' && quantity > 10) {
          if (this.Constraint.hasMaxWaterConstraint && quantity > this.Constraint.maxWater) {
            alert('That\'s too much water!');
            return;
          }
          flood = true;
        }
      } else if (this.toxicIngredients.some(v => ingredient.includes(v))) {
        // ingredient is one of the defined toxic ingredients
        poison = true;
      } else { // ingredient doesn't exist
        invalidIngredient = true;
        alert (ingredient + ' is not a valid ingredient :(');
        return;
      }
      if (this.Constraint.hasMinIngredientConstraint && quantity < this.Constraint.minIngredient) {
        alert('You need to add more ' + ingredient + '!');
        return;
      }
      if (quantity < 0) { spacetimeParadox = true; }
    }

    // choose the ending
    if (spacetimeParadox) {
      this.drawEnding('spacetime');
      this.Constraint.hasMinIngredientConstraint = true;
      document.getElementById('minIngredient').style.visibility = 'visible';
    } else if (flood) {
      this.drawEnding('flood');
      this.Constraint.hasMaxWaterConstraint = true;
      document.getElementById('maxWater').style.visibility = 'visible';
    } else if (fire) {
      this.drawEnding('fire');
      this.Constraint.hasMaxTempConstraint = true;
      document.getElementById('maxTemp').style.visibility = 'visible';
    } else if (freeze) {
      this.drawEnding('frozen');
      this.Constraint.hasMinTempConstraint = true;
      document.getElementById('minTemp').style.visibility = 'visible';
    } else if (apocalypse) {
      this.drawEnding('apocalypse');
      this.Constraint.hasMaxTimeConstraint = true;
      document.getElementById('maxTime').style.visibility = 'visible';
    } else if (dinosaurs) {
      this.drawEnding('dinosaurs');
      this.Constraint.hasMinTimeConstraint = true;
      document.getElementById('minTime').style.visibility = 'visible';
    } else if (poison) {
      this.drawEnding('poison');
      this.Constraint.hasPoisonConstraint = true;
    } else if (!invalidIngredient) {
      this.drawEnding('success');
    }
    // console.log((document.getElementById('recipe_input') as HTMLTextAreaElement).value);
  }

  /**
   * Returns a time value based on 'minutes', 'days', 'years', etc.
   * @param s String containing the time unit.
   * @return n Number associated with the time unit.
   */
  parseTime(s: string): number {
    const inYears = new RegExp('year[s]?$');
    const time = new RegExp(/(-?\d*[.]?\d*) [a-z]*$/);
    let n: number;
    if (time.test(s)) {
      n = parseFloat(s.match(time)[1]);
      if (n < 0) {
        return -1;
      }
      if (isNaN(n)) {
        return NaN;
      }
      // console.log('time is: ' + n);
      // console.log('time thinks it is: ' + s.match(time));
    } else {
      alert('Invalid time input');
      return NaN;
    }

    if (inYears.test(s)) {
      // user specified years
      return 2147483647;
    }

    const inDays = new RegExp('day[s]?$');
    if (inDays.test(s)) { return 1000000; }

    const inHours = new RegExp('hour[s]?$');
    if (inHours.test(s)) { return +n * 60; }

    const inMinutes = new RegExp('minute[s]?$');
    if (inMinutes.test(s)) { return +n; }

  }

  getConstraints() {
    if (this.Constraint.hasMaxTimeConstraint) {
      this.Constraint.maxTime = parseFloat((document.getElementById('maxTimeInput') as HTMLInputElement).value);
    }
    if (this.Constraint.hasMinTimeConstraint) {
      this.Constraint.minTime = parseFloat((document.getElementById('minTimeInput') as HTMLInputElement).value);
    }
    if (this.Constraint.hasMaxTempConstraint) {
      this.Constraint.maxTemp = parseFloat((document.getElementById('maxTempInput') as HTMLInputElement).value);
    }
    if (this.Constraint.hasMinTempConstraint) {
      this.Constraint.minTemp = parseFloat((document.getElementById('minTempInput') as HTMLInputElement).value);
    }
    if (this.Constraint.hasMaxWaterConstraint) {
      this.Constraint.maxWater = parseFloat((document.getElementById('maxWaterInput') as HTMLInputElement).value);
    }
    if (this.Constraint.hasMinIngredientConstraint) {
      // console.log((document.getElementById('minIngredientInput') as HTMLInputElement).value);
      this.Constraint.minIngredient = parseFloat((document.getElementById('minIngredientInput') as HTMLInputElement).value);
    }
    if (this.Constraint.hasPoisonConstraint) {
      // okay something good needs to go here
    }
  }

  updateMaxTime(e) {
    this.Constraint.maxTime = e.target.value;
  }

  ngOnInit() {

    // this.upperBoundTime = document.createElement('div');
    // this.upperBoundTime.textContent = 'Time must be less than:';
    // const upperTimeInput = document.createElement('input');
    // upperTimeInput.setAttribute('type', 'number');
    // // finish the below later
    // // upperTimeInput.addEventListener('input', updateMaxTime);
    // this.upperBoundTime.appendChild(upperTimeInput);

    this.lowerBoundTime = document.createElement('div');
    this.lowerBoundTime.textContent = 'Time must be more than: ';
    const lowerTimeInput = document.createElement('input');
    this.lowerBoundTime.appendChild(lowerTimeInput);

    this.upperBoundTemp = document.createElement('div');
    this.upperBoundTemp.textContent = 'Temperature must be less than: ';
    const upperTempInput = document.createElement('input');
    this.upperBoundTemp.appendChild(upperTempInput);

    this.lowerBoundTemp = document.createElement('div');
    this.lowerBoundTemp.textContent = 'Temperature must be more than: ';
    const lowerTempInput = document.createElement('input');
    this.lowerBoundTemp.appendChild(lowerTempInput);

    this.upperBoundIngredient = document.createElement('div');
    this.upperBoundIngredient.textContent = 'Ingredients must be less than: ';
    const upperIngredientInput = document.createElement('input');
    this.upperBoundIngredient.appendChild(upperIngredientInput);

    this.lowerBoundIngredient = document.createElement('div');
    this.lowerBoundIngredient.textContent = 'Ingredients must be more than: ';
    const lowerIngredientInput = document.createElement('input');
    lowerIngredientInput.setAttribute('id', 'minIngredientInput');
    this.lowerBoundIngredient.appendChild(lowerIngredientInput);

    this.upperBoundWater = document.createElement('div');
    this.upperBoundWater.textContent = 'Water must be less than: ';
    const upperWaterInput = document.createElement('input');
    this.upperBoundWater.appendChild(upperWaterInput);

    this.canvas = document.getElementById('robot') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');

    // this.context.fillStyle = 'blue';
    // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const kitchen = new Image();
    kitchen.src = 'assets/images/robot/kitchen.jpg';

    kitchen.onload = () => {
      // console.log('Drawing kitchen');
      this.context.drawImage(kitchen, 0, 0, this.canvas.width, this.canvas.height);
    };
  }
}
