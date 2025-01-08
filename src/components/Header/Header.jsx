
import React, { useContext } from "react";
import styles from "../../styles/styles";
import { CanvasStateContext } from "../../context/CanvasStateProvider";

function Header() {
    const { size, setSize, sizeEnum, resetCanvas } = useContext(CanvasStateContext);
    return (
        <div style={styles.header}>
            <h1 style={styles.ellipseText}>Internship Whitespace</h1>
            <div style={styles.stack}>
                <h4>Canvas Size:</h4>
                <div style={styles.row}>
                    {Object.keys(sizeEnum).map((key) => (
                        <button
                            key={key}
                            onClick={() => setSize(key)}
                            style={{
                                ...styles.button,
                                backgroundColor: key === size ? "#C9C7C5" : "",
                                cursor: key !== size ? "pointer" : "default",
                            }}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Header;
