import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-bakebot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bakebot.component.html',
  styleUrls: ['./bakebot.component.css']
})
export class BakebotComponent implements OnInit {

  badDialogText = 'Try Again';
  welcomeMsg: string;
  hideSuccess = true;
  hideBad = true;
  hideConstraintLabel = true;
  successMsg = 'Congrats! You made a food!';
  hideWelcome = false;
  win = false;
  recipeInput: HTMLTextAreaElement;

  // toggles whether constraints are valid
  public Constraint = new class {
    firstConstraint = true;
    hasMaxWaterConstraint: boolean;
    hasMaxTimeConstraint: boolean;
    hasMinTimeConstraint: boolean;
    hasMaxTempConstraint: boolean;
    hasMinTempConstraint: boolean;
    hasMaxIngredientConstraint: boolean;
    hasMinIngredientConstraint: boolean;
    hasPoisonConstraint: boolean;

    // user-defined constraint values
    maxWater: number;
    maxIngredient: number;
    minIngredient: number;
    minTime: number;
    maxTime: number;
    minTemp: number;
    maxTemp: number;
    approvedIngredients: string;
  }();
  constructor() {}

  /* Defining recipe strings here */
  cakeIngredients = 'ADD 1 Flour\nADD 2 Water\nADD 1 Sugar\nBAKE AT 375 DEGREES FOR 35 MINUTES';
  breadIngredients = 'ADD 3 Flour\nADD 1 Water\nADD 0.25 Sugar\nBAKE AT 350 DEGREES FOR 60 MINUTES';
  biscuitIngredients = 'ADD 2 Flour\nADD 1 Water\nADD 0.5 Sugar\nBAKE AT 325 DEGREES FOR 25 MINUTES';

  validIngredients = [
    'flour',
    'water',
    'salt',
    'sugar',
    'milk',
    'egg'
  ];
  toxicIngredients = [
    'knife',
    'fork',
    'spoon',
    'bleach',
    'sponge',
    'poison',
    'asbestos'
  ];

  welcome = 'Behold the BakeBot 5000! It can bake anything in an automated fashion!\n' +
    'Press a button to enter a preset recipe, or you can modify ' +
    'the recipe pseudocode to bake something new!';

  // success = 'Congrats! You made a food!';
  poison = 'Oh no! Your humans are dead!';
  flood = 'You flooded the kitchen!\n' +
          'Set or adjust a constraint for the maximum amount of water.';
  spacetime = 'Negative ingredients?! You\'ve created a spacetime paradox!';
  future = 'Oh no! The food was in the oven so long that Bakebot has been transported to the distant future!';
  fire = 'You caused a fire!';
  past = 'Oh no! You sent the robot into the past!';
  cold = 'You set a negative temperature and froze everything!';
  tooMuchIngredient = 'That\'s way too much of a dry ingredient!  What a disaster!';
  winner = 'You found all the constraints! Now BakeBot is safe from harmful input!';

  // this displays first time someone gets a constraint
  firstConstraintMsg = 'Woah! Some serious nonsense just happened! If a user enters input like that, '
    + 'BakeBot could do dangerous things! '
    + 'To prevent users from entering dangerous data, we gave you a tool to check user input '
    + 'before sending it to BakeBot.';

  insertCakeRecipe() {
    this.recipeInput = document.getElementById('recipe_input') as HTMLTextAreaElement;
    this.recipeInput.value = this.cakeIngredients;
  }

  insertBreadRecipe() {
    this.recipeInput = document.getElementById('recipe_input') as HTMLTextAreaElement;
    this.recipeInput.value = this.breadIngredients;
  }

  insertBiscuitRecipe() {
    this.recipeInput = document.getElementById('recipe_input') as HTMLTextAreaElement;
    this.recipeInput.value = this.biscuitIngredients;
  }

  drawEnding(ending: string) {
    const i = new Image();
    i.src = 'assets/images/robot/bakebot5000-base.svg';

    switch (ending) {
      case 'success':
        i.src = 'assets/images/robot/bakebot5000-success-a-thing.svg';
        this.hideSuccess = false;
        this.hideBad = true;
        this.hideWelcome = true;
        break;
      case 'success_cake':
        i.src = 'assets/images/robot/bakebot5000-success-cake.svg';
        this.hideSuccess = false;
        this.hideBad = true;
        this.hideWelcome = true;
        break;
      case 'success_bread':
        i.src = 'assets/images/robot/bakebot5000-success-bread.svg';
        this.hideSuccess = false;
        this.hideBad = true;
        this.hideWelcome = true;
        break;
      case 'success_biscuits':
        i.src = 'assets/images/robot/bakebot5000-success-biscuits.svg';
        this.hideSuccess = false;
        this.hideBad = true;
        this.hideWelcome = true;
        break;
      case 'poison':
        i.src = 'assets/images/robot/poison.jpg';
        this.badDialog(this.poison);
        break;
      case 'flood':
        i.src = 'assets/images/robot/bakebot5000-water.svg';
        this.badDialog(this.flood);
        break;
      case 'spacetime':
        i.src = 'assets/images/robot/bakebot5000-spacetime.svg';
        this.badDialog(this.spacetime);
        break;
      case 'future':
        i.src = 'assets/images/robot/bakebot5000-future.svg';
        this.badDialog(this.future);
        break;
      case 'fire':
        i.src = 'assets/images/robot/bakebot5000-fire.svg';
        this.badDialog(this.fire);
        break;
      case 'past':
        i.src = 'assets/images/robot/bakebot5000-prehistoric.svg';
        this.badDialog(this.past);
        break;
      case 'cold':
        i.src = 'assets/images/robot/bakebot5000-frozen.svg';
        this.badDialog(this.cold);
        break;
      case 'tooMuchIngredient':
        i.src = 'assets/images/robot/bakebot5000-too-much-dry.svg';
        this.badDialog(this.tooMuchIngredient);
        break;
      default:
        console.log('not a valid ending string');
    }

    i.onload = () => {
      (document.getElementById('robot') as HTMLImageElement).src = i.src;
    };
  }
  deleteMsg(msg: string, data: string[]) {
    const index: number = data.indexOf(msg);
    if (index !== -1) {
      data.splice(index, 1);
    }
  }
  parseInput() {

    this.getConstraints();

    let future = false;
    let flood = false;
    let poison = false;
    let cold = false;
    let spacetimeParadox = false;
    let past = false;
    let fire = false;
    let invalidIngredient = false;
    let tooMuchIngredient = false;

    const input = (document.getElementById('recipe_input') as HTMLTextAreaElement).value.toLowerCase();
    const lines = input.split('\n'); // break input into array of lines
    this.deleteMsg('', lines); // remove empty lines

    // checks that there is a valid baking line before parsing input
    const hasBakeLine = new RegExp(/bake /).test(lines[lines.length - 1]);
    let temp = '';
    let time;
    const getBake = /bake( at)? (-?\d+)/;

    if (hasBakeLine) {
      // short circuit when incorrect bake line
      if (! getBake.test(lines[lines.length - 1])) {
        this.displayAlert('The last line must be a BAKE instruction!');
        this.nopeBackground();
        return;
      }
      temp = (lines[lines.length - 1].match(/bake[ at]* (-?\d+)/))[1];
      // console.log(temp);
      time = this.parseTime(lines[lines.length - 1]);
      if (isNaN(time)) {
        this.displayAlert('You want me to bake this for how long?');
        this.nopeBackground();
        return;
      }
      // console.log('time is: ' + time);
    }  else { // (!hasBakeLine) {
      // person didn't enter BAKE line
      this.displayAlert('The last line must be a BAKE instruction!');
      this.nopeBackground();
      return;
    }

    // checks for emergency conditions in baking line
    if (this.Constraint.hasMinTempConstraint && +temp < this.Constraint.minTemp) {
      this.displayAlert('The oven can\'t be that cold!');
      this.nopeBackground();
      return;
    }
    if (this.Constraint.hasMaxTempConstraint && +temp > this.Constraint.maxTemp) {
      this.displayAlert('That\'s too hot!');
      this.nopeBackground();
      return;
    }
    if (+temp < 0) {
      cold = true;
    } else if (+temp > 500) { fire = true; }

    if (this.Constraint.hasMinTimeConstraint && time < this.Constraint.minTime) {
      this.displayAlert('You need to bake it longer than that!');
      this.nopeBackground();
      return;
    }
    if (this.Constraint.hasMaxTimeConstraint && time > this.Constraint.maxTime) {
      this.displayAlert('You can\'t bake it that long!');
      this.nopeBackground();
      return;
    }
    if (time < 0) {
      past = true;
    } else if (time > 100000) {
      future = true;
    }

    // a couple regexes and variable declarations for parsing ingredients
    const getIngredient = /([a-z]+)$/;
    const getQuantity = /add (-?\d*[.]?\d*)/;
    let ingredient: string;
    let quantity: number;

    // loop through lines checking ingredients and quantities
    for (let i = 0; i < lines.length - 1; i++) {
      ingredient = (lines[i].match(getIngredient))[0];
      if (! getQuantity.test(lines[i])) {
        this.displayAlert('Not sure what line ' + +(i + 1) + ' is supposed to be...');
        this.whatBackground();
        return;
      }
      quantity = parseFloat((lines[i].match(getQuantity))[1]);

      if (isNaN(quantity)) {
        this.displayAlert('How much ' + ingredient + ' did you want?');
        this.whatBackground();
        return;
      }

      /* Check for ingredient in approved list */
      if (this.Constraint.hasPoisonConstraint) {
        if (!this.Constraint.approvedIngredients.match(ingredient)) {
          this.displayAlert(ingredient + ' is not approved!');
          this.nopeBackground();
          return;
        }
      }

      if (this.validIngredients.some(v => ingredient.includes(v))) {
        if (ingredient === 'water') {
          if (this.Constraint.hasMaxWaterConstraint && quantity > this.Constraint.maxWater) {
            this.displayAlert('That\'s too much water!');
            this.nopeBackground();
            return;
          } else if (quantity > 10) {
            flood = true;
          }
        } else if (this.Constraint.hasMaxIngredientConstraint && quantity > this.Constraint.maxIngredient) {
              this.displayAlert('That\'s too much ' + ingredient + '!');
              this.nopeBackground();
              return;
        } else if (quantity > 20) {
              tooMuchIngredient = true;
        }
      } else if (this.toxicIngredients.some(v => ingredient.includes(v))) {
        // ingredient is toxic!
        poison = true;
      } else { // ingredient doesn't exist
        invalidIngredient = true;
        this.displayAlert(ingredient + ' is not a valid ingredient :(');
        this.nopeBackground();
        return;
      }
      if (this.Constraint.hasMinIngredientConstraint && quantity < this.Constraint.minIngredient) {
        this.displayAlert('You need to add more ' + ingredient + '!');
        this.nopeBackground();
        return;
      }
      if (quantity < 0) { spacetimeParadox = true; }
    }

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
    } else if (cold) {
      this.drawEnding('cold');
      this.Constraint.hasMinTempConstraint = true;
    } else if (future) {
      this.drawEnding('future');
      this.Constraint.hasMaxTimeConstraint = true;
    } else if (past) {
      this.drawEnding('past');
      this.Constraint.hasMinTimeConstraint = true;
    } else if (poison) {
      this.drawEnding('poison');
      this.Constraint.hasPoisonConstraint = true;
    } else if (tooMuchIngredient) {
      this.drawEnding('tooMuchIngredient');
      this.Constraint.hasMaxIngredientConstraint = true;
    } else if (!invalidIngredient && input === this.cakeIngredients.toLowerCase()) {
      this.drawEnding('success_cake');
    } else if (!invalidIngredient && input === this.breadIngredients.toLowerCase()) {
      this.drawEnding('success_bread');
    } else if (!invalidIngredient && input === this.biscuitIngredients.toLowerCase()) {
      this.drawEnding('success_biscuits');
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
      this.badDialog('Invalid time input');
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
      this.Constraint.minIngredient = parseFloat((document.getElementById('minIngredientInput') as HTMLInputElement).value);
    }
    if (this.Constraint.hasMaxIngredientConstraint) {
      this.Constraint.maxIngredient = parseFloat((document.getElementById('maxIngredientInput') as HTMLInputElement).value);
    }
    if (this.Constraint.hasPoisonConstraint) {
      this.Constraint.approvedIngredients = (document.getElementById('approvedIngredientInput') as HTMLInputElement).value;
    }
  }

  displayAlert(s: string) {
    this.welcomeMsg = s;
    this.hideWelcome = false;
    this.hideBad = true;
    this.hideSuccess = true;
  }
  badDialog(s: string) {
    this.badDialogText = s;
    if (this.Constraint.firstConstraint) {
      this.Constraint.firstConstraint = false;
      this.hideConstraintLabel = false;
      this.badDialogText = this.firstConstraintMsg;
    }
    this.hideBad = false;
    this.onCloseSuccess();
    this.hideWelcome = true;
  }

  ngOnInit() {
    this.welcomeMsg = this.welcome;
  }

  resetBackground() {
    const i = new Image();
    i.src = 'assets/images/robot/bakebot5000.jpg';
    i.onload = () => {
      (document.getElementById('robot') as HTMLImageElement).src = 'assets/images/robot/bakebot5000.jpg';
    };
  }

  nopeBackground() {
    const i = new Image();
    i.src = 'assets/images/robot/bakebot5000-nope.svg';
    i.onload = () => {
      (document.getElementById('robot') as HTMLImageElement).src = 'assets/images/robot/bakebot5000-nope.svg';
    };
  }

  whatBackground() {
    const i = new Image();
    i.src = 'assets/images/robot/bakebot5000-what.svg';
    i.onload = () => {
      (document.getElementById('robot') as HTMLImageElement).src = 'assets/images/robot/bakebot5000-what.svg';
    };
  }

  onCloseBad() {
    this.hideBad = true;
    const i = new Image();
    i.src = 'assets/images/robot/bakebot5000-base.svg';
    i.onload = () => {
      (document.getElementById('robot') as HTMLImageElement).src = 'assets/images/robot/bakebot5000-base.svg';
    };
    if (!this.win && this.Constraint.hasPoisonConstraint && this.Constraint.hasMaxWaterConstraint
      && this.Constraint.hasMaxIngredientConstraint && this.Constraint.hasMinIngredientConstraint
      && this.Constraint.hasMaxTimeConstraint && this.Constraint.hasMinTimeConstraint
      && this.Constraint.hasMaxTempConstraint && this.Constraint.hasMinTempConstraint) {
      // this.hideBad = true;
      this.successMsg = this.winner;
      this.hideSuccess = false;
      this.win = true;
    }
  }
  onCloseWelcome() {
    this.hideWelcome = true;
  }
  onCloseSuccess() {
    this.hideSuccess = true;
  }
}
