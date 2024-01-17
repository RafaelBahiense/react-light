# React Light

React Light is a simplified version of React, developed for educational purposes. This project was created as part of a class I taught to introduce the core concepts of React. It features a lightweight implementation of key React functionalities like JSX, components, state management, and basic rendering logic.

## Features

- JSX-like syntax: Enables writing HTML-like code inside JavaScript.
- Components: Functional components with props.
- State Management: Custom useState hook to manage state within components.
- Simple Rendering Logic: A minimal render method to mount components into the DOM.
- Asynchronous Components: Support for components that fetch and display data asynchronously.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Yarn or npm

### Installation

1. Clone the repo
```sh
git clone https://github.com/RafaelBahiense/react-light.git
```
2. Install NPM packages
```sh
yarn install
```

### Running the project

To run the project locally
```sh
yarn dev
```
This will start the development server and open the project in your default web browser.

## Usage

Here's a quick overview of how you can use React Light in your projects.

### Creating a Component

Components are simple functions that return JSX. Here's an example:
```jsx
const MyComponent = ({ title }) => {
  return <div>{title}</div>;
};
```

### Using State

React Light includes a custom useState hook:
```jsx
const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

### Rendering Components

Use the render function to mount your component into the DOM:
```jsx
render(<MyComponent title="Hello, React Light!" />, document.querySelector('#app'));
```

## Contributing

Contributions are what make the open source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

## License

Distributed under the MIT License. See LICENSE for more information.
