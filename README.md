# React Dynamic Carousel Component

A versatile and customizable carousel component for React applications, supporting automatic scrolling, manual drag/swipe interaction, infinite looping, and dynamic content.
*(Suggestion: Replace the placeholder above with an actual GIF showcasing your carousel's features!)*

## Features

-   **Automatic Scrolling**: Smoothly animates items horizontally.
    -   Configurable speed.
    -   Selectable initial scroll direction (left-to-right or right-to-left).
-   **Manual Interaction**:
    -   Drag with mouse or swipe on touch devices to control the carousel.
    -   Carousel stops automatic scrolling during drag/swipe.
    -   Resumes automatic scrolling in the direction of the last manual drag/swipe.
-   **Infinite Looping**: Option to seamlessly loop through items.
-   **Dynamic Content**: Display any array of React elements or components as carousel items.
-   **Responsive Design**:
    -   Takes 100% width of its parent container.
    -   Customizable height.
-   **Customizable**:
    -   Pass a `className` prop for custom styling.
    -   Minimal built-in styles for easy theming.
-   **Lightweight**: Uses `requestAnimationFrame` for smooth animations without heavy dependencies.

## Installation / Setup

Currently, this component is provided as a single `.jsx` file. To use it in your project:

1.  Copy the `Carousel.jsx` (or the file containing the `Carousel` component code) into your project's components directory (e.g., `src/components/Carousel.jsx`).
2.  Import it into the file where you want to use it:
    ```jsx
    import Carousel from './path/to/your/components/Carousel';
    ```

## How to Use

Import the `Carousel` component and provide an array of `children` to display.

## Props

| Prop              | Type                                  | Default           | Description                                                                                                |
| :---------------- | :------------------------------------ | :---------------- | :--------------------------------------------------------------------------------------------------------- |
| `children`        | `ReactNode[]`                         | `[]`              | An array of React elements or components to display in the carousel.                                       |
| `speed`           | `number`                              | `50`              | Speed of automatic scrolling in pixels per second. Set to `0` to disable automatic scrolling (manual drag only). |
| `initialDirection`| `'right-to-left' \| 'left-to-right'`  | `'right-to-left'` | Initial direction of automatic scrolling. `'right-to-left'` means content moves from right to left.            |
| `isInfinite`      | `boolean`                             | `true`            | Whether the carousel should loop infinitely.                                                               |
| `containerHeight` | `string`                              | `'200px'`         | The height of the carousel container (e.g., `'200px'`, `'50vh'`).                                          |
| `className`       | `string`                              | `''`              | An optional CSS class name to apply to the main carousel viewport element for custom styling.             |

## Basic Example (Simple Items)

```jsx
import React from 'react';
import Carousel from './Carousel';

const App = () => {
  const simpleItems = colors.map((color, index) => (
    <div
      key={`simple-item-${index}`}
      style={{
        backgroundColor: color,
        width: '280px', // Items should have their own width
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.8rem',
        borderRight: '2px solid white',
        boxSizing: 'border-box',
        color: '#333',
      }}
    >
      Item {index + 1}
    </div>
  ));

  return (
    <div>
      <h2>My Awesome Carousel</h2>
      <Carousel speed={60} containerHeight="200px">
        {simpleItems}
      </Carousel>
    </div>
  );
};

export default App;
```

## Example with Complex Custom Components

```jsx
import React from 'react';
import Carousel from './Carousel';

const MyCustomCard = ({ title, text, backgroundColor }) => (
  <div style={{
    width: '300px', // Items should have their own width
    height: '100%',
    background: backgroundColor,
    padding: '20px',
    boxSizing: 'border-box',
    borderRight: '2px solid white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
);

const App = () => {
  const complexItems = [
    <MyCustomCard key="card1" title="Card 1" text="This is the first custom card." backgroundColor="lightblue" />,
    <MyCustomCard key="card2" title="Card 2" text="Another interesting card here." backgroundColor="lightgreen" />,
    <MyCustomCard key="card3" title="Card 3" text="The third one is special." backgroundColor="lightpink" />,
  ];

  return (
    <div>
      <h2>Carousel with Custom Components</h2>
      <Carousel speed={40} initialDirection="left-to-right" isInfinite={false} containerHeight="250px">
        {complexItems}
      </Carousel>
    </div>
  );
};

export default App;
```
## Customization

### Styling

The carousel component is designed to be minimally styled. You can apply custom styles in several ways:

-   **Styling Child Elements**: The primary way to style the content is by styling the `children` you pass to the carousel. Each child item should define its own dimensions (especially width, as height will conform to `containerHeight`) and appearance.
-   **`className` Prop**: Pass a `className` to the `Carousel` component to target the main viewport div and its descendants (`.carousel-track`, `.carousel-item`) with your own CSS.

    ```css
    /* Example: in your global CSS or component-specific CSS file */
    .my-custom-carousel .carousel-item {
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin-right: 10px;
    }

    .my-custom-carousel .carousel-track {
      /* Custom track styles */
    }
    ```

    And in your JSX:

    ```jsx
    <Carousel className="my-custom-carousel" containerHeight="300px">
      {/* ... your items ... */}
    </Carousel>
    ```

## Future Enhancements (Ideas)

-   Vertical scrolling mode.
-   Navigation dots/arrows.
-   Accessibility improvements (more ARIA attributes, keyboard navigation).
-   Option for different animation easing functions.
-   Lazy loading of images/content.

## Contributing

Feel free to fork this project, make improvements, and submit pull requests! If you encounter any issues or have suggestions, please open an issue on GitHub.
