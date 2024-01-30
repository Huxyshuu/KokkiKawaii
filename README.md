<img src="https://i.imgur.com/EHvPTjq.png" align="right"
     alt="Size Limit logo by Anton Lovchikov" width="304" height="178">

# KokkiKawaii
### _Homemade recipe archive for the best delicacies_

[![Powered by Vercel](https://raw.githubusercontent.com/abumalick/powered-by-vercel/master/powered-by-vercel.svg)](https://vercel.com?utm_source=powered-by-vercel)

KokkiKawaii is a recipe website that I built for me and my partner to use as an archive to store delicious homemade recipes.
Instead of hammering our heads against the wall trying to come up with something to eat, we can just open up the site and 
pick our favorite recipes that are certified to satisfy! 👨‍🍳😋

## Features 💡

- Newest recipe display on the landing page
- A searchbar for instantly looking up recipes
- Built-in UI for adding and editing recipes
- Recipe manager for deleting, viewing and editing recipes
- A list view of all recipes below the initial landing page

## Tech

KokkiKawaii is built with realtively simple stack

- [React](https://react.dev/) - For rendering UI components and state management!
- [MongoDB](https://www.mongodb.com/ja-jp) - For storing recipe data in a JSON format as well as the url for the high quality images.
- [Cloudinary](https://cloudinary.com/) - An SaaS Image API for requesting and storing the actual recipe images uploaded on the site.
- [NodeJs](https://nodejs.org/en) - Eventing I/O requests for the backend.
- [Express](https://expressjs.com/) - Fast NodeJs network app framework for building a RESTFul API.
- [NPM](https://www.npmjs.com/) - For package management

And of course KokkiKawaii itself is open source with a [public repository](https://github.com/Huxyshuu/reclib) on GitHub.

## Usage 
Opening KokkiKawaii website at [https://reclib.vercel.app/](https://reclib.vercel.app/) will bring you to the landing page
![Landing Page](https://i.imgur.com/zQfHGlE.png)

### Viewing a recipe
Opening a recipe by searching for it through the searchbar or scrolling down for a more extensive list will open up the recipe page with details on what ingredients are required and what the cooking process involves.
![Recipe page](https://i.imgur.com/ltvvn29.png)

### Managing recipes
Currently, recipes can only be added, edited and removed by logging in from the top right corner. In the future, the website could be scaled up to allow for individual users to create accounts and have their own specialized recipe archives online.

Logging in bring you to the recipe management page from where you can add, edit, view and remove recipes. Removing a recipe requires the user to re-enter the login password for confirmation, after which a request is sent to the backend for removal. 
![Management page](https://i.imgur.com/V4gOuXA.jpeg)

### Adding and editing recipes
Adding and editing a recipe is as simple as filling a form with all the required and optional information about ingredients, image, cooking time and etc. Properly filled forms will be updated to the database upon request.
![Adding page](https://i.imgur.com/PAq6gix.png)



