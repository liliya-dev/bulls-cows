/* eslint-disable no-undef */
/* eslint-disable no-console */
'use strict';

const input = document.querySelector('.input_number');
const attemptsList = document.querySelector('.attempts');
let attemptsNumber = 0;
const button = document.querySelector('.btn');
let enteredNumber = '';
const generatedNumber = numberGenerating();

function numberGenerating() {
  let noRepeatedNumbers = '';
  let number;

  while (noRepeatedNumbers.length < 4) {
    number = Math.floor((Math.random() * (0.99 - 0.11) + 0.1) * 10);

    if (!noRepeatedNumbers.includes(number)) {
      noRepeatedNumbers += number;
    }
  }

  return noRepeatedNumbers;
}

button.addEventListener('click', function(ev) {
  enteredNumber = input.value;

  if (attemptsNumber === 10) {
    alert('you lose, try again!');
    input.value = '';
    attemptsList.innerHTML = '';
    attemptsNumber = 0;

    return;
  }

  if (validation(enteredNumber)) {
    const cowsNum = bullsAndCows(enteredNumber).cows;
    const bullsNum = bullsAndCows(enteredNumber).bulls;

    if (bullsNum === 4) {
      alert('congratulations, you are winner!');
    } else {
      attemptsNumber++;
      generateAttempt(enteredNumber, bullsNum, cowsNum);
    }
  } else {
    alert('it should be a four-digit number with non-repeat symbols');
  }
});

function validation(number) {
  const listOfNumbers = number.split('').sort();

  for (let i = 0; i < 4; i++) {
    if (listOfNumbers[i] === listOfNumbers[i + 1]) {
      return false;
    }
  }

  return (number.length === 4 && !isNaN(number));
}

function generateAttempt(number, bulls, cows) {
  const attempt = document.createElement('li');

  attempt.textContent = `your ${attemptsNumber}
  try is ${number} here ${bulls} bulls and ${cows} cows`;

  attemptsList.prepend(attempt);
}

function bullsAndCows(entered) {
  let bulls = 0;
  let cows = 0;

  for (let i = 0; i < generatedNumber.length; i++) {
    if (generatedNumber[i] === entered[i]) {
      bulls++;
    } else {
      if (generatedNumber.includes(entered[i])) {
        cows++;
      }
    }
  }

  return {
    bulls,
    cows,
  };
}
