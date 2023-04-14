import React from "react";
import styles from "./Spinner.module.css";

interface SpinnerProps {
    color?: string;
    scale?: number;
    width?: number;
    height?: number;
}

const Spinner = ({ color = "#EC7F07", width = 50, height = 50}: SpinnerProps) => {
    const spinnerStyle = {
        borderTopColor: color,
        width: `${width}px`,
        height: `${height}px`,
    };
    return (
        <div className={styles.container}>
            <div className={styles.spinner} style={spinnerStyle}></div>
        </div>
    );
};

export default Spinner;
