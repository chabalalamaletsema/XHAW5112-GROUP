# Next Level Gaming & Esports Arena: Website (XHAW5112)

A responsive, multi-page website for Next Level Gaming & Esports Arena in Johannesburg. It matches the mobile app: same colours, logo, packages, discount rules and contact details.

## Pages

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Hero, featured packages, testimonials |
| About Us | `about.html` | Story, mission, vision, services, leadership |
| Packages | `packages.html` | Filter and sort drop-downs, package cards, comparison table |
| Package Detail | `package-detail.html?id=1` | Price, rating, inclusions, add/remove booking, related offerings |
| Calculate Fees | `calculate.html` | Checkbox selection, discount, 15% VAT, live invoice, validated customer details |
| Booking Summary | `summary.html` | Full invoice and booking confirmation |
| Contact Us | `contact.html` | Contact details, validated message form, embedded map, social links |

The booking cart and customer details are kept between pages in the browser (`localStorage`).

## Design

- **Colours** (presentation colour slide): navy `#111217`, electric cyan `#16E0D6`, white `#F4F5FA`, muted grey `#AAAFBE`, green `#2E6B4F`, orange `#F15A24`. Logo purple `#6C2BD9` and lime `#B6FF3C` are used for small highlights.
- **Logo:** the hiker logo chosen in the presentation (`assets/logo.png`).
- **Font:** Montserrat (Google Fonts).
- **Responsive:** works on desktop, tablet and phone, with a hamburger menu on small screens.

## Pricing rules

| Bookings | Discount |
|---|---|
| 1 | 0% |
| 2 | 5% |
| 3 | 10% |
| More than 3 | 15% |

`total = (subtotal - discount) + 15% VAT`. Example: R1,550 + VAT = R1,782.50.

## Validation

- Name: letters only, at least 2 characters
- Email: standard email format
- Phone: `0821234567` or `+27821234567`
- Contact message: at least 10 characters
- Fee calculator: at least one package must be selected

## Run it

Open `index.html` in a browser, or run `npm run dev` (uses `npx serve .`).
`node build.js` checks that all files exist and tests the pricing and validation logic.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings > Pages**, choose the `main` branch and the `/ (root)` folder, then save.
3. The site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Structure

```
index.html  about.html  packages.html  package-detail.html
calculate.html  summary.html  contact.html
style.css   script.js   build.js
assets/logo.png
presentation/
```

## Sample content

Ratings, testimonials and leadership names other than Jason Naidoo are placeholders from the wireframes. Replace them with real details before final submission.
