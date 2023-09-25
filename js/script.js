const nameInput = document.getElementById('name');
const jobSelect = document.getElementById('title');
const otherJobField = document.getElementById('other-job-role');
const colorSelectDiv = document.getElementById('shirt-colors');
const designSelect = document.getElementById('design');


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
//fixing t-shirt info section
colorSelectDiv.style.display = 'none';
const colorOptionDisplay = (shirtDesign) => {
    const shirtOptions = document.querySelectorAll('#color option');
    for (let i = 0; i < shirtOptions.length; i++) {
        if (shirtOptions[i].dataset.theme === shirtDesign) {
            shirtOptions[i].style.display = 'block';
        } else {
            shirtOptions[i].style.display = 'none';
        }
    }
}

designSelect.addEventListener('change', () => {
    colorSelectDiv.style.display = 'block';
    colorOptionDisplay(designSelect.value);
});