
import React from "react";
import Header from "./components/Header/Header";
import ResetButton from "./components/Header/ResetButton";
import Canvas from "./components/Canvas/Canvas";
import TurtleControls from "./components/Controls/TurtleControls";
import ShapeControls from "./components/Controls/ShapeControls";
import FeatureControls from "./components/Controls/FeatureControl";
import { CanvasStateProvider } from "./context/CanvasStateProvider";
import styles from "./styles/styles";

function App() {

    return (
        <CanvasStateProvider>
            <div style={styles.column}>
                <Header />
                <ResetButton />
                <Canvas />
                <TurtleControls />
                <ShapeControls />
                <FeatureControls />
            </div>
        </CanvasStateProvider>
    );
}

export default App;
