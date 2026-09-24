# Priority Automotive Charities — Version 1

Open index.html in a browser. Upload index.html, styles.css, scripts.js, and the assets folder together to any static web host. No build tools are required.

## Included
- One responsive landing page with separate CSS and JavaScript.
- Content from 11 publicly linked source pages, complete 62-entry beneficiary directory, 33 published sponsorship packages, 10 homepage sponsor acknowledgments, 2024 sponsor poster, 19-photo 2024 gallery, Charity Bowl and community albums, archive news links, and original site imagery.
- User-supplied Priority Automotive Charities logo.
- Parallax imagery, scroll reveals, once-only impact counters, hover effects, expandable details, mobile menu, scroll progress, and keyboard-accessible photo viewer.
- Reduced-motion preferences are respected. Primary content remains readable without JavaScript.
- Images are stored locally as optimized WebP files; supplied logo remains PNG. Fonts are bundled locally with system fallbacks. No remote assets are required to render the page.
- asset-inventory.json maps source image URLs to local assets. source-content.txt preserves extracted original editorial text for reference.

## Existing services
Donate connects to the exact secure Deluxe payment URL linked on the original website. Sponsorship inquiries, contact submissions and 2027 applications link to their original forms. Sponsorship package inquiries also open a pre-addressed email to Troy Clifton. This static package does not implement a new payment or form-processing backend. Those existing URLs must remain available, or be replaced with new service URLs when the old website is retired.

## Content review before replacing the production website
- Both listed 2026 events are past as of September 24, 2026 and are labeled accordingly. No 2027 event dates were invented.
- Homepage reports $4,850,000 and 65 charities supported this year. The beneficiary page lists 62 named organizations; Charity Bowl copy also says 62. These separate source values are retained.
- Founder's letter contains older $3 million / 35 charity figures and is labeled historical. The donate page's old 35-charity claim was generalized in current-facing copy, with original wording preserved in source-content.txt.
- Golf event webpage lists 10:00 am registration, 10:50 am welcome, 11:00 am shotgun, and 4:00 pm awards. These are copied as the published 2026 schedule.
- Several sponsorship prices differ between the original visible package cards and its form dropdown. This redesign uses the visible package-card prices and asks visitors to confirm current pricing/availability. Examples: Music $50,000 vs $35,000; Apparel $25,000 vs $30,000; Putting Green $10,000 vs $15,000; Party Bar $10,000 vs $15,000; Party/Golf $15,000 vs $10,000.
- Existing news links are archived external coverage and may be moved by their publishers.

## Editing
Update page copy and dates in index.html. Set data-count on each impact number and update its readable fallback text together. Add photos as .gallery-button elements within .gallery-grid; scripts.js automatically enables the lightbox. Styles use red, black, white, and cool gray variables at the top of styles.css.
