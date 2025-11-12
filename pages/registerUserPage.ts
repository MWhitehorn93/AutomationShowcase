import { Page } from '@playwright/test';

export class RegisterUserPage {
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
  readonly accountCreatedMessage;
  readonly continueButton;
  readonly loggedInAsUser;
  readonly deleteAccountButton;
  readonly deleteAccountConfirmationMessage;
  

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
    this.accountCreatedMessage = page.getByText('Account Created!');
    this.continueButton = page.getByRole('link', { name: 'Continue' });
    this.loggedInAsUser = page.getByText('Logged in as TestUser');
    this.deleteAccountButton = page.getByRole('link', { name: ' Delete Account' });
    this.deleteAccountConfirmationMessage = page.getByText('Account Deleted!');
  }

  async fillRegistrationForm(data: any) {
    await this.passwordInput.fill(data.password);
    await this.daysDropdown.selectOption(data.day);
    await this.monthsDropdown.selectOption(data.month);
    await this.yearsDropdown.selectOption(data.year);
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.companyInput.fill(data.company);
    await this.address1Input.fill(data.address1);
    await this.address2Input.fill(data.address2);
    await this.countryDropdown.selectOption(data.country);
    await this.stateInput.fill(data.state);
    await this.cityInput.fill(data.city);
    await this.zipcodeInput.fill(data.zipcode);
    await this.mobileNumberInput.fill(data.mobile);
  }

  async submitForm() {
    await this.createAccountButton.click();
  }
}
