import React, { useState } from 'react';

const TextEditor = ({attribute, setAttribute}) => {
  const [mode, setMode] = useState('edit');

  const handleAttributeChange = (e) => {
    setAttribute(e.target.value);
  };

  const handleBoldClick = () => {
    setAttribute((prevText) => prevText + '<b></b>');
  };

  const handleItalicClick = () => {
    setAttribute((prevText) => prevText + '<i></i>');
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
          value={attribute}
          onChange={handleAttributeChange}
          placeholder="Type your text here..."
        ></textarea>
      ) : (
        <div className="preview" dangerouslySetInnerHTML={{ __html: attribute }}></div>
      )}
    </div>
  );
};

export default TextEditor;
