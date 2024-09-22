import React from 'react';
import EditOffIcon from '@mui/icons-material/EditOff';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import DrawIcon from '@mui/icons-material/Draw';

interface ToolbarProps {
  eraserMode: boolean;
  textboxMode: boolean;
  drawColor: string;
  textboxColor: string;
  toggleEraserMode: () => void;
  toggleTextboxMode: () => void;
  setDrawColor: (color: string) => void;
  setTextboxColor: (color: string) => void;
  classes: any;
}

const Toolbar: React.FC<ToolbarProps> = ({
  eraserMode,
  textboxMode,
  drawColor,
  textboxColor,
  toggleEraserMode,
  toggleTextboxMode,
  setDrawColor,
  setTextboxColor,
  classes,
}) => {
  return (
    <div className={classes.toolsContainer}>
      <button onClick={toggleEraserMode} className={classes.toolButton}>
        {eraserMode ? <EditOffIcon /> : <DrawIcon />}
        {eraserMode ? 'Switch to Draw' : 'Eraser Mode'}
      </button>
      <button onClick={toggleTextboxMode} className={classes.toolButton}>
        {textboxMode ? <TextFieldsIcon /> : <DrawIcon />}
        {textboxMode ? 'Switch to Draw' : 'Textbox Mode'}
      </button>
      <div className={classes.colorContainer}>
        <label>Draw Color:</label>
        <input
          type='color'
          value={drawColor}
          onChange={e => setDrawColor(e.target.value)}
        />
      </div>
      <div className={classes.colorContainer}>
        <label>Textbox Font Color:</label>
        <input
          type='color'
          value={textboxColor}
          onChange={e => setTextboxColor(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Toolbar;
