## Notes ##
- There are only 2 circumstances when a React component re-renders
    1. Its state change
    2. Its ancestor re-render
- Ways to determine component
    1. It accepts a single “props” (which stands for properties, and passed from parent to child)
    2. Initial letter is capital
    3. Returns JSX or React element(Parentheses are required for multi-line JSX)
    4. Never define a component inside another component!
- Ways to determine Funciton
    1. Defined by keyword Function followed by name and ()
    2. It can also be defined using arrow syntax (=>)
        i.e. 
        const myFunc = () => {
            return 'hello world';
        }
        *** if arrow functions is follwed by {} then return statement is required!!***
- Difference of importing a file with or without {}
    - without {}
        1. Used for default exports
        2. A file can have only one default export
        3. Can name the import whatever we like
    - with {}
        1. Used for named exports(no default)
        2. A file can have multiple named exports
        3. Must use the exact name of the exported item inside {}.
- Rendering data from arrays
  1. .map() array method that iterates over each item in the array and applies a callback function to transform it
  (i.e. const listItems = people.map(person => <li>{person}</li>);)
  2. .filter() this method creates a new array with elements that satisfy the condition specified in the callback function
  (i.e. const chemists = people.filter(person => person.profession === 'chemist');)

- ReactDOM
  1. ReactDOM is a library used to render React components to the DOM (browser's Document Object Model). It bridges React's virtual DOM and the real DOM
  2. Use ReactDOM.render to mount a React component onto a DOM node
  3. ensure diffing process
- Reference source:
    React: https://react.dev/learn/thinking-in-react
           https://www.joshwcomeau.com/react/why-react-re-renders/
    Lifecycle & Event Loop: https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif
                            https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
    Conponent: https://legacy.reactjs.org/docs/components-and-props.html
    Rendering method: https://react.dev/learn/rendering-lists
    HTML: https://www.w3schools.com/tags/tag_map.asp
    setInterval: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setInterval
    useRef: https://www.youtube.com/watch?v=42BkpGe8oxg&ab_channel=CosdenSolutions
    Canvas: https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API