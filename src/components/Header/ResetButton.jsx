
import React, { useContext } from "react";
import { CanvasStateContext } from "../../context/CanvasStateProvider";
import styles from "../../styles/styles";

function ResetButton() {
    const { resetCanvas } = useContext(CanvasStateContext); 

    return (
        <button onClick={resetCanvas} style={styles.button}>
            Reset Canvas
        </button>
    );
}

export default ResetButton;
