// selected elements needed for later functionality
const nameInput = document.getElementById('name');
const jobSelect = document.getElementById('title');
const otherJobField = document.getElementById('other-job-role');
const colorSelect = document.getElementById('color');
const designSelect = document.getElementById('design');
const activityFieldset = document.getElementById('activities');
const activities = activityFieldset.querySelectorAll('input');
const paymentSelect = document.getElementById('payment');
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const ccNumInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvNumInput = document.getElementById('cvv');
const activitiesBox = document.getElementById('activities-box');
const activityHint = document.getElementById('activities-hint');

//adding focus to the first field to enhance ux
nameInput.focus();

//hiding other job text field until necessary
otherJobField.style.display = 'none';
jobSelect.addEventListener('change', () => {
    if (jobSelect.value === 'other') {
        otherJobField.style.display = 'block';
    } else {
        otherJobField.style.display = 'none';
    }
});

// disable color select until necessaary
colorSelect.setAttribute('disabled', true);

/***
 * Function to display/hide shirt color options
 * 
 * @param {string} shirtDesign - the user selected design
 */
const colorOptionDisplay = (shirtDesign) => {
    const shirtOptions = colorSelect.querySelectorAll('option');
    for (let i = 0; i < shirtOptions.length; i++) {
        if (shirtOptions[i].dataset.theme === shirtDesign) {
            shirtOptions[i].removeAttribute('disabled');
        } else {
            shirtOptions[i].setAttribute('disabled', true);
        }
    }
}
// display color options based on design selection
designSelect.addEventListener('change', () => {
    colorSelect.removeAttribute('disabled');
    colorOptionDisplay(designSelect.value);
});

// adding cost display and selection functionality to activities section
activityFieldset.addEventListener('change', (evt) => {
    let totalCost = 0;
    const dayAndTime = evt.target.getAttribute('data-day-and-time');
    for (let i = 0; i < activities.length; i++) {
        const currentActivity = activities[i];
        const parentLabel = currentActivity.parentNode;
        const disabledParents = []
        if (currentActivity.checked) {
            totalCost += parseInt(activities[i].dataset.cost);
        }
        if (currentActivity !== evt.target && currentActivity.getAttribute('data-day-and-time') === dayAndTime) {
            currentActivity.setAttribute('disabled', true)
            parentLabel.classList.add('disabled');
            disabledParents.push(parentLabel);
        }
        if (!evt.target.checked) {
            for (let i = 0; i < disabledParents.length; i++) {
                const currentParent = disabledParents[i]
                if (currentParent.firstElementChild.getAttribute('data-day-and-time') === dayAndTime) {
                    currentParent.firstElementChild.removeAttribute('disabled');
                    currentParent.classList.remove('disabled');
                    disabledParents.splice(i, 1);
                }
            }
        }
    }
    document.getElementById('activities-cost').innerText = `Total: $${totalCost}`;
});

// set default payment method
paymentSelect.value = "credit-card";
document.getElementById('paypal').style.display = 'none';
document.getElementById('bitcoin').style.display = 'none';

// update display based on user payment method
paymentSelect.addEventListener('change', () => {
    if (paymentSelect.value === 'paypal') {
        document.getElementById('paypal').style.display = 'block';
        document.getElementById('credit-card').style.display = 'none';
        document.getElementById('bitcoin').style.display = 'none';
    } else if (paymentSelect.value === 'bitcoin') {
        document.getElementById('paypal').style.display = 'none';
        document.getElementById('credit-card').style.display = 'none';
        document.getElementById('bitcoin').style.display = 'block';
    } else {
        document.getElementById('paypal').style.display = 'none';
        document.getElementById('credit-card').style.display = 'block';
        document.getElementById('bitcoin').style.display = 'none';
    }
});

// validator helper functions

const isValidName = () => {
    const nameRegEx = /^[a-z]+$/;
   return  nameRegEx.test(nameInput.value);
}
const isValidEmail = () => {
    const emailRegEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
    return emailRegEx.test(emailInput.value);
}

const isValidRegistration = () => {
    for (let i = 0; i < activities.length; i++) {
        if (activities[i].checked) {
            return true;
        }
    }
    return false;
}

const isValidCCNum = () => {
    const creditCardRegEx = /^\d{13,16}$/;
    return creditCardRegEx.test(ccNumInput.value);
}

const isValidZip = () => {
    const zipRegEx = /^\d{5}$/;
    return zipRegEx.test(zipInput.value);
}

const isValidCVV = () => {
    const cvvRegEx = /^\d{3}$/;
    return cvvRegEx.test(cvvNumInput.value)
}

// form validation
form.addEventListener('submit', (evt) => {
    const validator = (testElement, validatorFunction) => {
        if (validatorFunction()) {
            testElement.closest('label').classList.add('valid');
            testElement.closest('label').classList.remove('not-valid')
            testElement.nextElementSibling.style.display = 'none';
        } else {
            evt.preventDefault();
            testElement.closest('label').classList.add('not-valid');
            testElement.closest('label').classList.remove('valid');
            testElement.nextElementSibling.style.display = 'inline';
        }
    }
    validator(nameInput, isValidName);
    validator(emailInput, isValidEmail);
    
    if (isValidRegistration()) {
        activitiesBox.classList.add('valid');
        activitiesBox.classList.remove('not-valid');
        activityHint.style.display = 'none';
    } else {
        activitiesBox.classList.add('not-valid');
        activitiesBox.classList.remove('valid');
        activityHint.style.display = 'inline';
    }

    if (paymentSelect.value === 'credit-card') {
        validator(ccNumInput, isValidCCNum);
        validator(zipInput, isValidZip);
        validator(cvvNumInput, isValidCVV);
    }
});

// adding event listeners to checkboxes
const checkboxFocus = (checkbox) => {
    checkbox.parentNode.classList.add('focus');
}
const checkboxBlur = (checkbox) => {
    checkbox.parentNode.classList.remove('focus');
}
for (let i = 0; i < activities.length; i++) {
    activities[i].addEventListener('focus', (evt) => {
        checkboxFocus(evt.target);
    });
    activities[i].addEventListener('blur', (evt) => {
        checkboxBlur(evt.target);
    });
}

// name input real-time validation
// create HTML strings for hints and dynamically add them
const capsHintP = '<p id="caps-hint" className="name-hint hint">Name cannot contain capital letters.</p>'
const numsHintP = '<p id="nums-hint" className="name-hint hint">Name cannot contain digits.</p>'
const nameParentLabel = nameInput.parentNode;
nameParentLabel.insertAdjacentHTML('beforeend', capsHintP);
nameParentLabel.insertAdjacentHTML('beforeend', numsHintP);
// hide hints by default
const capsHintEl = document.getElementById('caps-hint')
capsHintEl.style.display = 'none';
const numsHintEl = document.getElementById('nums-hint')
numsHintEl.style.display = 'none';

// validator functions to check user input
/***
 * function to check whether the user name input contains capital letters
 * 
 * @returns {boolean} - true if input has capitals
 */
const hasCapsValidator = () => {
    const capsRegEx = /[A-Z]+/;
    return capsRegEx.test(nameInput.value);
}
/***
 * function to check whether the user name input contains numbers
 * 
 * @returns {boolean} - true if input has numerals
 */
const hasNumsValidator = () => {
    const numsRegEx = /\d+/;
    return numsRegEx.test(nameInput.value);
}

// update input field based on live user input
nameInput.addEventListener('keyup', () => {
    if (hasCapsValidator() || hasNumsValidator()) {
        nameParentLabel.classList.add('not-valid');
        nameParentLabel.classList.remove('valid');
    } else {
        nameParentLabel.classList.add('valid');
        nameParentLabel.classList.remove('not-valid');
        capsHintEl.style.display = 'none';
    }
    if (hasCapsValidator()) {
        capsHintEl.style.display = 'block';
    } else {
        capsHintEl.style.display = 'none';
    }
    if (hasNumsValidator()) {
        numsHintEl.style.display = 'block';
    } else {
        numsHintEl.style.display = 'none';
    }
    if (!nameInput.value) {
        nameParentLabel.classList.remove('valid');
    }
});