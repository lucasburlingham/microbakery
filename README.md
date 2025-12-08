# microbakery

This was originally designed for my wife, but all are free to use it. Please note that none of the images except the nutrition label are my own. 

## Licensing 
This site is licensed under the [Creator's License](https://lucasburlingham.me/LICENSE.md), a custom "Copy-left" usage-based, free-as-in-beer (Gratis) license. Please read it BEFORE USE as you are likely not familiar with it.

## Setup
Fork, make your changes, and push to GitHub Pages or your choice of static site hosting platforms, most for free. To generate a menu/product listing, follow the steps below:

1. Create a new [Google Sheet](https://docs.google.com/spreadsheets/u/0/create)
2. Use a header **exactly** like this:
   ```text
   title	cost	sku	labor	batch_size	description	image_url	image_alt
   ```
3. Go to `File` > `Share` > `Publish to web`. Make sure `Link`, **NOT** `Embed` is selected.
4. From the first dropdown, (Default: `Entire Document`), choose the sheet you want to share. It probably will be the first one (Sheet 1).
5. From the second dropdown, (Default: `Web page`), select `Comma-separated values (.csv)`.
6. Expand the arrow menu labeled, `Published content & settings`, and make sure the checkbox labeled `Automatically republish when changes are made` is selected. This will allow you to change the menu/products from within the Google Sheet and not need to push a new link to the site. Because the data is pulled at the webpage load, it will be updated nearly instantly (cache may need to be purged but in my experience this has only taken about 30 seconds).
7. Click the blue `Publish` button, and copy the link given.

## ADA Compliance

So I have feelings about ADA Compliance. I want to give the maximum number of people access to the site, but then with the 2.5:1 and 4:1 contrast ratio requirements goes any artistic styles my wife liked. For now, the site is pretty good, and gets above 80% on most free online tests, and fails the rest because of little things like the "About" links not being contrasty enough. The purpose of the site is to allow you to see the options of macaroons my wife offers, not how to start a microbakery, so please, if you require accomidations, use Siri or Google to see how to start your own. You shouldn't be taking my advice on how to become a Home Based Vendor anyways, we've not even done it yet. 

## Todo
- Payment processor integration
- "Cart" feature (`GET` request to append to the current URL?)
- Nutrition label generator
- Move information into config file (`.json`?)
