# AutomationShowcase  
### Professional Portfolio by **Matthew Whitehorn**

Welcome to my Automation Showcase — a curated collection of real-world automation examples designed to demonstrate my technical abilities, problem-solving approach, and readiness for roles involving automation, QA engineering, workflow optimization, scripting, or full-stack development.

This repository highlights my hands-on experience building reliable, scalable, and well-tested automation solutions using TypeScript and modern tooling.

---

## About Me

**Matthew Whitehorn**  
Automation Developer | QA Engineer | Software Developer  
Toronto, Canada  
whitehornmatthew@gmail.com  
+1 647-546-7728  

I’m passionate about building tools that remove repetitive work, strengthen reliability, and streamline operations.  
This showcase serves as a practical demonstration of how I approach automation engineering in real environments.

If you're hiring for automation, QA, or development roles — I’d love to chat.

---

## Technologies & Skills

- **Languages:** TypeScript, JavaScript  
- **Automation & Scripting:** Node.js, file processing, API integration  
- **Testing:** Jest / Mocha (or whatever you use)  
- **Tools & Practices:** Git, modular architecture, test-driven development, CI/CD readiness

## Purpose of This Repository

This project is intentionally built as a **technical portfolio** to show:

- My ability to design **clean, maintainable, production-ready automation code**
- Strong skills in **TypeScript**, Node.js, and structured project architecture
- Practical experience writing tests, processing data, and automating workflows
- How I think about **scalability, readability, and real-world constraints**
- My capability to contribute immediately to engineering, QA, or automation teams

---

## What You’ll Find Here

- **Reusable automation scripts** written in TypeScript  
- **Data processing utilities** and transformation workflows  
- **Testing examples** demonstrating how I validate automation logic  
- **Clear project architecture** reflecting real engineering practices  
- A foundation that can be extended to CI pipelines, API workflows, scraping tasks, etc.

This repo will continue to grow with additional modules as I expand my automation toolkit.

---

## Project Structure
/data         — sample datasets, inputs, and assets used by automation scripts
/pages        — generated outputs, reports, or demo pages created by scripts
/scripts      — core automation scripts, modularized by purpose or workflow
/tests        — test suites validating script functionality and reliability
/config       — configuration files, environment variables, or templates
package.json  — Node.js dependencies, scripts, and build/test commands
README.md     — this documentation file
.gitignore    — files and folders to ignore in Git

## Getting Started

### Install Dependencies

```bash
git clone https://github.com/MWhitehorn93/AutomationShowcase.git
cd AutomationShowcase
npm install

```
### Helpful commands

```bash
npx playwright test < script-name > 
you can add --headed on the end of the command if you want to see the test run with the UI
```
## Test cases and their respective tests

Test 1 - Register user 
registerUser.spec.ts
registerBeforeCheckout.spec.ts
registerWhileCheckout.spec.ts

Test 2 - Login in user with correct Username and password
logInLogOutUser.spec.ts
searchProductAddToCartLogin.spec.ts
loginBeforeCheckout.spec.ts

Test 3 - loginUser with incorrect Username and password
incorrectLogIn.spec.ts

Test 4 - LogOutUser
logInLogOutUser.spec.ts

Test 5 - Register with an Existing email
existingEmail.spec.ts

Test 6 - Contact us form
submitContactUs.spec.ts

Test 7 - Verify test cases page
verifyTestCase.spec.ts

Test 8 - Verify all products page
allProducts.spec.ts

Test 9 - Search Product 
searchProductAddToCartLogin.spec.ts
searchProduct.spec.ts

Test 10 - Verify Subscription in Home Page
homepageSubscription.spec.ts

Test 11 - Verify subscription in Cart Page
cartPageSubscription.spec.ts

Test 12 - Add products to cart 
addFirstTwoProducts.spec.ts

Test 13 - Verify cart quantity 
assertQuantity.spec.ts

Test 14 - Place Order: Register while checkout 
registerWhileCheckout.spec.ts

Test 15 - Place Order: Register before checkout 
registerBeforeCheckout.spec.ts

Test 16 - Place Order: Login in before checkout 
loginBeforeCheckout.spec.ts

Test 17 - Remove products from cart
registerBeforeCheckout.spec.ts

Test 18 - Verify category Products
categoryNavigation.spec.ts

Test 19 - Verify Brand products
brandNavigation.spec.ts

Test 20 - Search Products and Verify cart login
searchProductAddToCartLogin.spec.ts

Test 21 - Add review on Product 
addReview.spec.ts

Test 22 - Add cart from Recommended items
recommendItemsToCart.spec.ts

Test 23 - Verify addresses in Cart detail
registerWhileCheckout.spec.ts
loginBeforeCheckout.spec.ts
registerBeforeCheckout.spec.ts

Test 24 - Download invoice after purchase order 
registerWhileCheckout.spec.ts
loginBeforeCheckout.spec.ts
registerBeforeCheckout.spec.ts

