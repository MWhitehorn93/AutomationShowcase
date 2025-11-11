import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly mrRadioButton;
  readonly passwordInput;
  readonly daysDropdown;
  readonly monthsDropdown;
  readonly yearsDropdown;
  readonly newsletterCheckbox;
  readonly offersCheckbox;
  readonly firstNameInput;
  readonly lastNameInput;
  readonly companyInput;    
  readonly address1Input;
  readonly address2Input;
  readonly countryDropdown;
  readonly stateInput;
  readonly cityInput;
  readonly zipcodeInput;
  readonly mobileNumberInput;
  readonly createAccountButton;

  

  constructor(page: Page) {
    this.page = page;
    this.mrRadioButton = page.getByRole('radio', { name: 'Mr.' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
    this.daysDropdown = page.locator('#days');
    this.monthsDropdown = page.locator('#months');
    this.yearsDropdown = page.locator('#years');
    this.newsletterCheckbox = page.locator('div').filter({ hasText: 'Sign up for our newsletter!' }).nth(4);
    this.offersCheckbox = page.getByRole('checkbox', { name: 'Receive special offers from' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First name *' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' });
    this.companyInput = page.getByRole('textbox', { name: 'Company', exact: true });
    this.address1Input = page.getByRole('textbox', { name: 'Address * (Street address, P.' })
    this.address2Input = page.getByRole('textbox', { name: 'Address 2' });
    this.countryDropdown = page.getByLabel('Country *');
    this.stateInput = page.getByRole('textbox', { name: 'State *' });
    this.cityInput = page.getByRole('textbox', { name: 'City * Zipcode *' })
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.getByRole('textbox', { name: 'Mobile Number *' });
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
  }
}
