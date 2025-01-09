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
- useEffect
  1. Allows to perform side effects in functional components
  2. useEffect(effect, [dependencies]);
     effect: A function that contains the side effect code.
     dependencies: An optional array of dependencies that determine when the effect runs.
  3. When it runs:
    Runs after render by default.
    Re-runs when any value in the dependencies array changes.
    Runs cleanup before the next effect or component unmounts.
- useSate
  1. Allows functional components to manage and update state.
  2. state: The current state value.
     setState: A function to update the state.
     initialState: The initial state value, which can also be a function 
  3. When setState being called, React re-renders the component with the updated state.
- useContext
  1. consume a value from a React Context without prop drilling
  2. const value = useContext(MyContext);
     MyContext: A context object created by React.createContext().
     value: The current value of the context.
  3. Components that call useContext will re-render whenever the context value changes
- useMemo
  1. Optimize performance by memoizing the result of a computation so it is not recalculated unnecessarily
  2. const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
     computeExpensiveValue: A function that returns the value we want to memoize
     Dependencies ([a, b]): The result is recalculated only if one of these dependencies changes
  3. When an expensive computation is performed in a component and doesn't need to re-run unless inputs change
  4. Prevent unnecessary recalculations of derived state or computed values
- useCallBack
  1. Memoize a function to prevent it from being recreated on every render
  2. const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
     doSomething: The function we want to memoize
     Dependencies ([a, b]): The function is recreated only if one of these dependencies changes
  3. Passing a callback to a child component that uses React.memo to prevent unnecessary re-renders
  4. Memoizing event handlers or functions that are passed as dependencies to useEffect
- useRef
  1. Commonly used to directly access DOM elements in functional components
  2. Used to store values that persist across renders but don’t trigger re-renders when updated
  3. useRef can also store the previous value of a state or prop
  4. Can be used to store setTimeout or setInterval IDs for cleanup purposes.


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
    useState:https://legacy.reactjs.org/docs/hooks-reference.html#usestate
    useEffect:https://legacy.reactjs.org/docs/hooks-reference.html#useeffect
    Canvas: https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API
    Konva: https://github.com/konvajs/react-konva
           https://konvajs.org/docs/overview.html
           https://www.youtube.com/watch?v=iUm2wHHel4s&ab_channel=UsmanAbdurRehman
    Text Input: https://stackoverflow.com/questions/21011931/how-to-embed-an-input-or-textarea-in-a-canvas-element
                https://konvajs.org/docs/shapes/Text.html
                https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text
    Pen Drawing: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
    useContext:https://legacy.reactjs.org/docs/hooks-reference.html#usecontext
               https://react.dev/reference/react/useContext
               https://www.youtube.com/watch?v=HYKDUF8X3qI&ab_channel=CosdenSolutions
    useMemo：https://www.youtube.com/watch?v=vpE9I_eqHdM
    React.memo:https://legacy.reactjs.org/docs/hooks-reference.html#usememo
               https://blog.logrocket.com/react-memo-vs-usememo/
               https://stackoverflow.com/questions/72979350/react-memo-vs-usememo-for-private-components
    useCallBack:https://legacy.reactjs.org/docs/hooks-reference.html#usecallback
                https://www.freecodecamp.org/news/difference-between-usememo-and-usecallback-hooks/