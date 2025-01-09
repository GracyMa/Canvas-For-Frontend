
import React, { useContext } from "react";
import { CanvasStateContext } from "../../context/CanvasStateProvider";
import styles from "../../styles/styles";

// React.memo to prevent unnecessary re-renders of the ResetButton
const ResetButton = React.memo(() => {
    // Get the reset function from context
    const { resetCanvas } = useContext(CanvasStateContext);

    return (
        <button onClick={resetCanvas} style={styles.button}>
            Reset Canvas
        </button>
    );
});

export default ResetButton;
