# SHG Data Entry & Loan Calculator

A simple, mobile-friendly HTML calculator for Self Help Group (SHG) member data entry, savings, loans, installments, interest, balances, and totals.

## Features

- 20 member data-entry rows
- Member name and monthly transaction entry
- Automatic total calculations
- Loan balance calculation
- Interest total calculation
- Overall totals
- Save and Load data using browser local storage
- Print-friendly layout
- Works on mobile, tablet, and desktop
- Can be deployed as a static website on Vercel

## Calculation Rules

- **Column 4** = Column 2 + Column 3
- **Column 9 (Loan Balance)** = Column 5 + Column 7 - Column 6 - Column 8
- **Column 12 (Total Interest)** = Column 10 + Column 11

The calculator prevents the loan balance from going below zero.

## Files

- `index.html` — Main web application
- `README.md` — Project documentation

## Run Locally

Simply open `index.html` in Chrome, Edge, Firefox, or another modern browser.

No server or database is required.

## Deploy to Vercel

1. Put `index.html` and `README.md` in the project root.
2. Create/import the project in Vercel.
3. Deploy as a static site.
4. Make sure `index.html` is in the root directory.

## Data Storage

The **Save** button stores data in the browser's `localStorage`. Data is stored only in that browser/device.

Clearing browser site data may remove saved entries, so keep a backup when the records are important.

## Technology

- HTML5
- CSS3
- JavaScript
- Browser Local Storage

## License

For personal/project use. Modify and customize as needed.
