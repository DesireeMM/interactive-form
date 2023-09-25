// selected elements needed for later functionality
const nameInput = document.getElementById('name');
const jobSelect = document.getElementById('title');
const otherJobField = document.getElementById('other-job-role');
const colorSelectDiv = document.getElementById('shirt-colors');
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

//hide color select until necessaary
colorSelectDiv.style.display = 'none';

/***
 * Function to display/hide shirt color options
 * 
 * @param {string} shirtDesign - the user selected design
 */
const colorOptionDisplay = (shirtDesign) => {
    const shirtOptions = colorSelectDiv.querySelectorAll('option');
    for (let i = 0; i < shirtOptions.length; i++) {
        if (shirtOptions[i].dataset.theme === shirtDesign) {
            shirtOptions[i].style.display = 'block';
        } else {
            shirtOptions[i].style.display = 'none';
        }
    }
}
// display color options based on design selection
designSelect.addEventListener('change', () => {
    colorSelectDiv.style.display = 'block';
    colorOptionDisplay(designSelect.value);
});

// adding cost display functionality to activities section
activityFieldset.addEventListener('change', () => {
    let totalCost = 0;
    for (let i = 0; i < activities.length; i++) {
        if (activities[i].checked) {
            totalCost += parseInt(activities[i].dataset.cost);
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