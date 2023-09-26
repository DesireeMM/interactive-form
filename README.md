# Treehouse FSJS Techdegree Unit 3 Project

Learn more about the developer on [LinkedIn](https://www.linkedin.com/in/desiree-morimoto-9470481b0/)

## Table of Contents
- [Project Description](#overview)
- [Technologies Used](#technologiesused)
- [Added Features](#addedfeatures)
- [Real Time Validation](#realtime)

## Project Information

#### <a name="overview"></a>Description
This project involved taking a template for a conference registration form and adding interactivity, as well as form validation.

#### <a name="technologiesused"></a>Technologies Used
- CSS (project file provided by Treehouse)
- HTML (project file provided by Treehouse)
- JavaScript

#### <a name="addedfeatures"></a>Added Features
- Name Field
  - Used the focus method to default to the name field on page load.
- Job Role Section
  - Hid the "Other job role" input field unless user selects "Other".
- T-Shirt Info Section
  - Hid the color selection drop-down until needed.
  - Only display appropriate color options based on user design choice.
- Activites Section
  - Display appropriate total cost based on user selections.
  - Added focus and blur event handlers to increase accessibility.
  - Disable conflicting activites based on user selections.
- Payment Info Section
  - Only display relevant information/fields based on user selection.
- Form Validation
  - Upon submit, checks for valid:
    - Name
    - Email
    - Activites (users must select at least one)
    - Credit Card information (if this is the user's payment type)
      - Card number
      - Zip code
      - CVV
- General
  - Added visual validation errors to user inputs.

#### <a name="realtime"></a>Real Time Validation
As an added challenge, I've added real time validation to the name input field.
- If the user types a capital letter, a hint will display "Name cannot contain capital letters"
- If the user types a digit, a hint will display "Name cannot contain digits"