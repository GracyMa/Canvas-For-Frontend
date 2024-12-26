import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from './styles.js';

// TODO: 这个应该是画布的大小，这样写对吗？Enum is xxxxx
const sizeEnum = {
    small: [800, 480],
    medium: [1024, 576],
    large: [1280, 720],
    'absolute unit': [1920, 1080],
};
// TODO: 这个应该是默认值，但是react的做法是应该把这个设为state的初始值，只用一次
const turtle = {
    x: 360,
    y: 200,
    angle: 0,
    penDown: true,
    penColor: '#000000',
    lineWidth: 2
};

const turtleDefault = {
    x: 360,
    y: 200,
    angle: 0,
    penDown: true,
    penColor: '#000000',
    lineWidth: 2
};

const moveArray = ['shiftLeft', 'shiftRight', 'shiftUp', 'shiftDown']; // TODO: replace this with new logic

function ReactRoot() {
    // react useState hook, to manage xxx
    const [size, setSize] = useState('small');

    const [turtleModel, setTurtleModel] = useState(turtle);

    // turtle position
    /* TODO: 我认为，这些turtle的position是应该通过function例如handleXAxisChange来控制
        例如:
        const handleXAxisChange = (length = 50) => {
            setX((prevX) => prevX - length); 
        }
    */
    // x axis
    const [x, setX] = useState(turtle.x);
    // y axis
    const [y, setY] = useState(turtle.y);
    // angle
    const [angle, setAngle] = useState(turtle.angle);

    // TODO: setInterval is a counter that invoke the callback every 50ms
    // TODO: 这个是个类监听的玩意儿，但是感觉逻辑好像不太对，容易产生内存泄漏
    setInterval(() => {
        setX(turtle.x);
        setY(turtle.y);
        setAngle(turtle.angle);
    }, 50);
    /*
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setX(turtle.x);
    //         setY(turtle.y);
    //         setAngle(turtle.angle);
    //     }, 50);
    //      return () => clearInterval(intervalId);
    // }, [])
    */

    // check in chrome dev tool
    console.log('turtle X:', turtle.x, ' Y:', turtle.y, ' angle:', turtle.angle);
    const width = sizeEnum[size][0];
    const height = sizeEnum[size][1];
    // const [ width, height ] = sizeEnum[size];

    return (
        <div style={styles.root}>
            <div style={styles.header}>
                <h1 style={styles.ellipseText}>
                    Internship Whitespace
                </h1>
                <div style={styles.stack}>
                    <h4>
                        Canvas Size:
                    </h4>
                    <div style={styles.row}>
                        {Object.keys(sizeEnum).map((key) =>
                            <button
                                key={key}
                                onClick={() => { setSize(key) }}
                                style={{
                                    ...styles.button,
                                    backgroundColor: key === size && '#C9C7C5',
                                    cursor: key !== size && 'pointer',
                                }}
                            >
                                {key}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div style={styles.column}>
                <button
                    onClick={clearCanvas}
                    style={styles.button}
                >
                    Reset Canvas
                </button>
                <div style={{ ...styles.canvasWrapper, width: width + 2, height: height + 2 }}>
                    <div
                        style={{
                            ...styles.turtle,
                            left: x,
                            top: y,
                            transform: `rotate(${angle}DEG)`,
                        }}
                    />
                    <canvas
                        id="myDrawing"
                        width={width}
                        height={height}
                    />
                </div>
                <h4 style={{ margin: 0 }}>
                    TURTLE FUNCTIONS
                </h4>

                <div style={{ ...styles.row, ...styles.spacer }}>
                    {moveArray.map((key) =>
                        <button
                            key={key}
                            onClick={() => turtle[key]()}
                            style={styles.button}
                        >
                            {key}
                        </button>
                    )}
                </div>

                <div style={{ ...styles.row, maxWidth: width - 48 }}>
                    <button
                        onClick={() => turtle.hexagon()}
                        style={styles.blueButton}
                    >
                        Hexagon
                    </button>
                    <button
                        onClick={() => turtle.drawStar()}
                        style={styles.blueButton}
                    >
                        Star
                    </button>
                    {/*
                    // ================================================================================
                    //                      Maybe things should go here?
                    // ================================================================================
                    */}
                    <button
                        style={styles.blueButton}
                    >
                        Custom ???
                    </button>
                </div>
            </div>
        </div>
    );
}
// react insertion
const wrapper = document.getElementById("react-entry");
wrapper ? ReactDOM.render(<ReactRoot />, wrapper) : false;




// =====================================================================================
//                                  GRAPHICS
// =====================================================================================


// canvas preparation
const canvas = document.getElementById('myDrawing');

if (canvas && canvas.getContext) { // does the browser support 'canvas'?
    turtle.ct = canvas.getContext("2d"); // get drawing context
} else {
    alert('You need a browser which supports the HTML5 canvas!');
}

function clearCanvas() {
    if (canvas && canvas.getContext) {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        turtle.x = 360;
        turtle.y = 200;
    }
}


//      Turtle functions
// =======================================================
turtle.logPenStatus = function () {
    console.log('x=' + this.x + "; y=" + this.y + '; angle = ' + this.angle + '; penDown = ' + this.penDown);
};

// reposition turtle
turtle.shiftLeft = function (length = 50) {
    turtle.x -= length;
};

const shiftLeft = (length = 50) => {
    setTurtleModel((prev) => ({
        ...prev,
        x: prev.x - length
    }))
}

turtle.shiftRight = function (length = 50) {
    turtle.x += length;
};
turtle.shiftUp = function (length = 50) {
    turtle.y -= length;
};
turtle.shiftDown = function (length = 50) {
    turtle.y += length;
};

let counter = 1;
const addCounterBy1 = () => counter = counter + 1;


// draw in a direction
turtle.forward = function (length) {
    // this.logPenStatus();
    var x0 = this.x,
        y0 = this.y;
    const angleInRadians = (this.angle * Math.PI) / 180;
    this.x += length * Math.sin(angleInRadians);
    this.y += length * Math.cos(angleInRadians);
    if (this.ct) {
        if (this.penDown) {
            //this.logPenStatus();
            this.ct.beginPath();
            this.ct.lineWidth = this.lineWidth;
            this.ct.strokeStyle = this.penColor;
            this.ct.moveTo(x0, y0);
            this.ct.lineTo(this.x, this.y);
            this.ct.stroke();
        }
    } else {
        this.ct.moveTo(this.x, this.y);
    }
    return this;
};
turtle.backward = function (length) {
    this.forward(-length);
    return this;
};

// turning
turtle.left = function (angle) {
    this.angle += angle;
    return this;
};
turtle.right = function (angle) {
    this.left(-angle);
    return this;
};


// ===============================================================
//                      Pattern Functions
// ===============================================================

turtle.hexagon = function (length = 50) {
    console.log('length', length);
    var i;
    for (i = 1; i <= 6; i++) {
        turtle.forward(length);
        turtle.left(60);

    }
};

turtle.drawStar = function () {
    var i;
    for (i = 0; i < 18; i++) {
        turtle.left(100);
        turtle.forward(80);
    }
};



//  Oh Wow Look at this space
// =======================================================


/*
TODO:
1. turtle should be within the canvas (determine by our setting)
2. should take key down event (keyboard direction can also move the turtle)
html mouse event
3. try to see if we can do a pen-like-feature
4. add a few ones (squares, arrow (no pointer, single-arrow, double-arrow), colors)
5. text input
*/






