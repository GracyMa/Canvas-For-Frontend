import React, { useContext } from "react";
import { CanvasStateContext } from "../../context/CanvasStateProvider";
import styles from "../../styles/styles";

function FeatureControls() {
    const {
        setDrawAction,
        setIsTextMode,
        penColor,
        setPenColor,
    } = useContext(CanvasStateContext);

    // Function to activate specific drawing features or text mode
    const activateFeature = (actionType, isText = false) => {
        setDrawAction(actionType);
        setIsTextMode(isText); // Enable text mode if specified
    };

    return (
        <div style={styles.column}>
            <div style={styles.row}>
                <button
                    onClick={() => activateFeature("rectangle")}
                    style={styles.button}
                >
                    Rectangle
                </button>
                <button
                    onClick={() => activateFeature("circle")}
                    style={styles.button}
                >
                    Circle
                </button>
                <button
                    onClick={() => activateFeature(null, true)} // Activate text mode
                    style={styles.button}
                >
                    Add Text
                </button>
                <button
                    onClick={() => activateFeature("pen")}
                    style={styles.button}
                >
                    Pen
                </button>
                <input
                    type="color"
                    value={penColor}
                    onChange={(e) => setPenColor(e.target.value)} // Update shared penColor
                    style={styles.colorPicker}
                />
            </div>
        </div>
    );
}

export default FeatureControls;