# T2 Lifestyle Checker Web App - Kyle Morris

This is the repository for my T2 Lifestyle Checker Web App created for the AireLogic tech test. The live site can be found [here](https://Crypto84.github.io/t2-lifestyle-checker).

## Frameworks and Technologies

The frameworks and technologies used are as follows: [React](https://react.dev/), [Create React App](https://github.com/facebook/create-react-app), [Gh-pages](https://github.com/tschaub/gh-pages) with Github Actions, and [Reactjs-popup](https://github.com/yjose/reactjs-popup).

I decided to build this web app in React, because recently I completed a course in the framework and wanted to put my new knowledge to the test. I think plain HTML, CSS, and JavaScript would have also been a fine choice, it's just that I prefer the higher level coding that React provides i.e. not having to interact with the DOM. To develop the app I used "Create React App", a popular tool for initialising blank React projects. I decided to go for this since I figured the requirements of the specification could be met using a single page application. With no routing required, things could be kept much simpler. Create React App installs all the necessary dependencies and provides commands for running locally, building, testing, and even ejecting for use with different frameworks.

To deploy, I used Gh-pages, a general-purpose tool for deploying code to a GitHub Pages site. Originally, I implemented this as a command line utility, but eventually I needed to set up a custom deployment script since I needed to insert an environment variable during the build step. As such, I decided to switch to using GitHub Actions, where I could configure a custom workflow and insert the environment variable. This was my first time using Github Actions, with my only previous experience being in Azure DevOps. I found it to be a good interface for implementing CI/CD pipelines and it proved to be very simple to work with.

## Application Structure

The application is split into five components.

- `App` is the main "container" component that houses the other three.
- `Header` is the component that sits at the top of the screen during Parts 1 and 2. It contains the logo, title, and subtitle.
- `SignIn` is the component containing the inital sign in form. In addition to the inputs themselves, this component also contains the submit function, which calls the API and performs the necessary calculations to format the data received, calculate the patient's age, and compare the details received from the API to the ones inputted by the user. If there are any issues, a separate div is displayed under the form giving the appropriate error message. Otherwise, the Questionnaire component is displayed.
- `Questionnaire` is the component representing Part 2 of the specification. It contains all three questions as part of a form and a function that calculates the score based on the user's answers when the form is submitted.
- `Popup` is the component displayed after the calculation is performed in Questionnaire. It contains an informative message based on the user's score. This component was imported from the Reactjs-popup package, a tiny library that serves a specific but commonly encountered use case in web design.

## Notable Features and Design

The majority of the notable features in this application are contained within the SignIn and Questionnaire components.

An interesting part of the SignIn block is the formatting of data. Since we need to compare data received from the user and data received from the API, they need to be in the same format. In my implementation, I decided to format the surname received from the user into all caps to match the surname received from the API. However, for the date of birth, I decided to format the date received from the API to match the date received from the user. This is because the JS Date() object expects the date to be in a yyyy-mm-dd format, and I wanted to use this object to calculate the user's age. It might have been nicer to be more consistent and exclusively format the data received from the user to match the data received from the API, but it would have led to unnecessary steps in calculating the age and may have ended up making the code less readable.

Another important part of this code is the API call itself. The specification states that the API key must not be referenced in the code. Checking this key into the repository is a potential security risk because the repo is currently public. So, as referenced above, instead of checking the key in, I inserted it as an environment variable during the build step. This is not something I have had experience with before, but it was an interesting experience, and I am happy with the result. It also allowed me to set up the pipeline to run every time I pushed to main, so the main branch and the gh-pages branch will never get out of sync.

The most interesting part of Questionnaire is probably the calculation. I decided to save the answers not as an object, as I normally might, but as an array. This is because, in order to perform the calculation, iteration over each question is necessary, and while doing that, one can also iterate over the weights applied to each question. Furthermore, one can remove even more repetition by also iterating over a list of "boundary ages", and if the user's age is less than said age, perform the calcualtion with that combination of weights. I am happy with the lack of repetition in my solution, but I hope I have not sacrificed readability for it.

## Future improvements

As alluded to in Part 3, if the weights for each question were to change, we would have to build and deploy our code again, and if this application grew to a larger size, we would generally want to avoid unnecessary deployments. As such, the logical option would be to store the weights outside of the code base and instead serve them to the application via an API. One could potentially store them in a database, and if the questionnaire grew, this could be a good option. However, in the app's current state a database would probably be unnecessary due to the small number of questions. Having the application make a request for the weights to some web server that stores the weights locally would be sufficient and probably wouldn't be too difficult to implement. Then if the weights change, you would only have to deploy your web server, and if you keep it light weight, you could save considerable time.

The styling is another area that could potentially be improved. Using plain CSS can be a time-consuming and fiddly process, I made a good effort to get the formatting looking good, but I still think it could look a bit more professional. I think if I were to do this project again or if a similar requirement had to be met, I would try using a CSS framework like Bootstrap or Tailwind.

Thank you for reading! Any feedback and improvements are greatly appreciated.
