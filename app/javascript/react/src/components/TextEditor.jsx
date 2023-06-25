import React, { useState } from 'react';

const TextEditor = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('edit');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleBoldClick = () => {
    setText((prevText) => prevText + '<b></b>');
  };

  const handleItalicClick = () => {
    setText((prevText) => prevText + '<i></i>');
  };

  const handleModeToggle = () => {
    setMode((prevMode) => (prevMode === 'edit' ? 'preview' : 'edit'));
  };

  return (
    <div className="text-editor">
      <div className="toolbar">
        <div className="toolbar-button" onClick={handleBoldClick}>
          B
        </div>
        <div className="toolbar-button" onClick={handleItalicClick}>
          I
        </div>
        <div className="toolbar-button preview-edit-button" onClick={handleModeToggle}>
          {mode === 'edit' ? 'Preview' : 'Write'}
        </div>
      </div>
      {mode === 'edit' ? (
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Type your text here..."
        ></textarea>
      ) : (
        <div className="preview" dangerouslySetInnerHTML={{ __html: text }}></div>
      )}
    </div>
  );
};

export default TextEditor;
