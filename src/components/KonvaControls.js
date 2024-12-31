

import React from "react";
import { DrawAction } from "../utils/konvaConstants";

function KonvaControls({ setDrawAction }) {
    return (
        <div>
            <button onClick={() => setDrawAction(DrawAction.RECTANGLE)}>
                Rectangle
            </button>
            <button onClick={() => setDrawAction(DrawAction.CIRCLE)}>
                Circle
            </button>
        </div>
    );
}

export default KonvaControls;