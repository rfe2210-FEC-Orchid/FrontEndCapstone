# Orchid

Orchid is a minimalistic yet elegant single-page shopping website designed to promote an intuitive, straightforward user experience. This project was completed over the course of three weeks by a team of 4 students for the front end capstone portion of Hack Reactor’s software engineering immersive program.


## Tech Stack
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Node](https://img.shields.io/badge/-Node-9ACD32?logo=node.js&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/-Express-DCDCDC?logo=express&logoColor=black&style=for-the-badge)
![Axios](https://img.shields.io/badge/-Axios-671ddf?logo=axios&logoColor=black&style=for-the-badge)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)


## Demo
[Demo video](https://drive.google.com/file/d/1wLdJBAAHJ47SlWK1v0Px5dhedl-X-7Kl/view?usp=share_link)


## Component Details
### Product Overview
This component will guide the customer through selecting a specific style and size to add to their cart. For each product, an image gallery, the product information, a style/size selector, and an add to cart button is displayed.
<img src="./demos/overview.gif" height=500 />

### Related Items & Comparison
This component displays a related product list consisting of products related to the currently viewed product and an outfit list consisting of the products that the user added. Each related product card renders a comparison modal window, and each outfit card can be deleted from the outfit list. For both lists, clicking on a card navigates to the detail page for that product.
<img src="./demos/related.gif" height=500 />

### Questions & Answers
This component gives the user the ability to view and search questions, ask questions, answer questions, and provide feedback on questions about the current product.
<img src="./demos/QnA.gif" height=500 />

### Ratings & Reviews
This component gives users the ability to see ratings breakdown and all reviews for the product chosen. Reviews can be filtered by stars, searching keywords or choosing a sort by value. Users can also write a new review or provide feedback (vote as helpful or report) on existing reviews by interacting with the action buttons.
<img src="./demos/RnR.gif" height=500 />


## Installation & Use
1. Clone the repo
    ```
    git clone https://github.com/rfe2210-FEC-Orchid/FrontEndCapstone.git
    ```
2. Install all required packages
    ```
    npm install
    ```
3. Rename `example.config.js` to `config.js`
4. Create a github personal access token to acquire access to the API and insert the token into `config.js`
5. Compile the client-side code with webpack
   ```
   npm run client-dev
   ```
6. Start the server
   ```
   npm run server-dev
   ```
7. Navigate to localhost:3001
