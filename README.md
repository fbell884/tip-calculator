# Frontend Mentor - Shortly URL shortening API Challenge solution

This is a solution to the [Shortly URL shortening API Challenge challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person
    - Bill Amount input throws an error if 0 or not a valid dollar amount
    - Number of people throws an error if 0 or not a whole number. 

### Links

- Solution URL: [Solution URL](https://www.frontendmentor.io/solutions/tip-calculator-app-using-bootstrap-5-and-vanilla-js-tXeOAYSXJK)
- Live Site URL: [Live Site URL](https://fbell884.github.io/tip-calculator/)

## My process

- I tried to build component by component
  1. Build out the form
  2. Styling
  3. JS Functionality
  4. Form Input Client-side Validation

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Bootstrap 5
- JavaScript

### What I learned

I was able to think logically & practice client-side form validation using Regular Expressions. Although this does not call an external API, this is a good skill to have when using an API that only accepts certain data types/formats. 

```js
const inputValidation = (calcValue) => {
    const isValidInput = (/^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/).test(calcValue) ? true : false;
    return isValidInput;
}

const replaceInvalidChars = (calc) => {
    return calc.id === 'bill-amount' ? calc.value = calc.value.replace(/[^0-9.]/g, '') : calc.value = calc.value.replace(/[^0-9]/g, '')
}

const displayError = (calcValue, inputId) => {
    let calcInput = document.getElementById(inputId);
    let errorText = calcInput.previousElementSibling.previousElementSibling; 
  
    if (!inputValidation(calcValue) || Number(calcValue) == 0) {
        radioButtons.forEach(radio => {
            radio.checked = false;
            radio.disabled = true;
        });
        errorText.classList.remove("d-none");
        calcInput.classList.add('error-box');
    }
    else {
        radioButtons.forEach(radio => {
            radio.disabled = false;
        });
        errorText.classList.add("d-none");
        calcInput.classList.remove('error-box');
    }

}
```

### Continued development

I want to continue learning and become more confident in my validation skills. 

## Author

- Website - [Portfolio Site](https://francisbellportfolio.netlify.app/)
- Frontend Mentor - [@fbell884](https://www.frontendmentor.io/profile/fbell884)
- LinkedIn - [@yourusername](https://www.linkedin.com/in/francis-bell/)
