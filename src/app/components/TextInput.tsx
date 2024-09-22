import React from 'react';

interface TextInputProps {
  textBoxes: { x: number; y: number; text: string; color: string }[];
  textboxMode: boolean;
  handleTextChange: (index: number, value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  textBoxes,
  textboxMode,
  handleTextChange,
}) => {
  return (
    <>
      {textBoxes.map((textBox, index) => (
        <input
          key={index}
          style={{
            position: 'absolute',
            left: `${textBox.x}px`,
            top: `${textBox.y}px`,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: textBox.color,
            fontSize: '16px',
            pointerEvents: textboxMode ? 'auto' : 'none',
          }}
          value={textBox.text}
          onChange={e => handleTextChange(index, e.target.value)}
        />
      ))}
    </>
  );
};

export default TextInput;
