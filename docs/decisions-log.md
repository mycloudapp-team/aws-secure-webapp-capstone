# decisions-log
Region: us-east-1, chosen because CloudFront ACM certs must be there and to keep everything in one Region
_bright._
added Philipa to the capstone-infra group and Michael to capstone-monitoring group.
_Bright._


# Decision Log — Restaurant Ordering System

## Decision 001: Selection of Web Application
 
**Date:** 2026-11-02  
**Department:** Frontend Engineer 
**Project:** AWS Secure Web App Capstone

### 1. Decision Summary

The selected application for this capstone project is a Restaurant Ordering System.

The application will provide a modern, responsive interface that allows customers to explore a restaurant's menu, select meals, add items to a shopping cart, and place orders through a simulated checkout process.

The application will be developed using HTML5, CSS3, JavaScript, and React.

The initial implementation will focus exclusively on the frontend. No backend, database, payment gateway, or AWS infrastructure integration will be implemented during the frontend development phase.

### 2. Problem Statement

Many restaurants need an accessible and convenient way for customers to browse their menus and place food orders online.

Traditional ordering methods may require customers to call the restaurant or visit the premises to view available meals and prices.

This project aims to demonstrate how a modern web application can improve the customer ordering experience through an intuitive interface, interactive menu, cart management, and order tracking.

### 3. Project Objectives

The project will:

- Develop a professional and responsive restaurant ordering interface.
- Demonstrate practical React component development.
- Implement interactive menu browsing and category filtering.
- Allow customers to manage shopping cart items and quantities.
- Provide a simulated checkout and order confirmation experience.
- Demonstrate frontend state management and browser storage.
- Apply clean coding practices, reusable components, and explanatory comments.
- Maintain clear project documentation in the existing GitHub repository.

### 4. Target Users

**Customers**

Customers will browse meals, search for food, view meal details, add items to their cart, and place simulated orders.

**Restaurant Administrators — Interface Demonstration**

An optional frontend administration interface may demonstrate menu management and order overview functionality.

Administrative changes will not be persisted to a server or shared across users.

### 5. Functional Requirements

#### 5.1 Home Page

- Display restaurant branding and navigation.
- Present featured meals and popular food categories.
- Include a prominent menu browsing or ordering action.
- Display restaurant information and opening hours.

#### 5.2 Menu Management Interface

- Display meals with images, names, descriptions, and prices.
- Organize meals by categories.
- Allow users to search for meals.
- Filter meals by category.
- Display meal details and availability indicators.

#### 5.3 Shopping Cart

- Add meals to the cart.
- Increase or decrease item quantities.
- Remove items from the cart.
- Calculate item subtotals and the order total.
- Display the number of items in the cart.
- Preserve cart contents using browser localStorage.

#### 5.4 Checkout

- Collect customer name and contact information.
- Collect delivery address or pickup preference.
- Display an order summary.
- Validate required fields.
- Simulate order submission.
- Display an order confirmation with a generated order reference.

No actual payment will be processed.

#### 5.5 Order Tracking

- Display simulated order statuses such as:
  - Order received
  - Preparing
  - Ready for pickup
  - Completed
- Allow customers to view their locally stored order history.

#### 5.6 Responsive Design

The application will support:

- Desktop computers
- Tablets
- Mobile phones

The interface will adapt to different screen sizes without horizontal overflow.

### 6. Technology Decisions

| Technology | Purpose |
|---|---|
| HTML5 | Semantic application structure |
| CSS3 | Styling, layouts, animations, and responsiveness |
| JavaScript ES6+ | Application logic and interactions |
| React | Reusable UI components and state management |
| Vite | Development server and production build |
| React Router | Navigation between application pages |
| Lucide React | Consistent interface icons |
| localStorage | Browser-based persistence for demo data |
| Git and GitHub | Version control and project collaboration |

### 7. Application Architecture

The application will follow a component-based frontend architecture.

The main application areas will include:

- Home page
- Menu page
- Meal details
- Shopping cart
- Checkout
- Order confirmation
- Order history

Shared components will include the navigation bar, footer, meal cards, category filters, cart summary, and reusable form controls.

Sample menu data will be maintained separately from the UI components.

The application will use React state for interactive behavior and localStorage for limited browser persistence.

### 8. Scope and Limitations

**Included in the initial scope:**

- Frontend implementation
- Sample restaurant and menu data
- Interactive shopping cart
- Simulated checkout
- Local order history
- Responsive UI
- Form validation
- Documentation and testing

**Excluded from the initial scope:**

- Backend API development
- Database integration
- Real user authentication
- Real payment processing
- Live order synchronization
- Restaurant delivery partner integration
- SMS and email notifications
- AWS deployment and infrastructure configuration

These features may be considered in a future project phase.

### 9. Security and Privacy Considerations

The application will not collect real payment details or sensitive personal information.

Customer information entered during checkout will be used only for demonstration purposes.

No passwords, AWS credentials, API keys, or other secrets will be stored in the frontend source code or committed to GitHub.

The application will clearly indicate that checkout and order tracking are simulated.

### 10. Acceptance Criteria

The project will be considered complete when:

- The application runs successfully using the Vite development server.
- All primary navigation links work.
- Menu items can be searched and filtered.
- Customers can add, remove, and update cart items.
- Order totals are calculated correctly.
- Checkout forms validate required information.
- A simulated order can be placed and confirmed.
- The interface works on desktop and mobile devices.
- The source code includes useful explanatory comments.
- The README contains project information and setup instructions.
- The completed code is committed and pushed to the existing GitHub repository.

### 11. Risks and Mitigation

| Risk | Mitigation |
|---|---|
| Project scope becomes too large | Complete the core customer ordering flow before optional features |
| Browser storage is cleared | Clearly document that demo data is stored locally |
| Incorrect order calculations | Implement and test cart calculations separately |
| Responsive layout issues | Test at multiple screen sizes |
| Accidental exposure of secrets | Exclude credentials and environment files from Git |

### 12. Decision Rationale

The Restaurant Ordering System was selected because it provides a practical opportunity to demonstrate frontend development skills through a realistic business application.

The project combines reusable React components, interactive forms, state management, responsive design, and user-centered workflows.

It is achievable within the available frontend-only scope while providing a foundation for future backend and AWS integration.

### 13. Review Conditions

This decision may be reviewed if:

- The project requirements change.
- Backend integration becomes necessary.
- Real payment processing is introduced.
- Additional restaurant administration features are required.
- The current technology stack no longer meets the project requirements.
