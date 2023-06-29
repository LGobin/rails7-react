import React, { useState, useRef } from 'react';

const TextEditor = ({ attribute, setAttribute }) => {
  const [mode, setMode] = useState('edit');
  const textareaRef = useRef(null);

  const handleAttributeChange = (e) => {
    setAttribute(e.target.value);
  };

  const handleTagInsertion = (tag) => {
    const textarea = textareaRef.current;
    const { selectionStart, selectionEnd } = textarea;

    const newText =
      attribute.slice(0, selectionStart) +
      `<${tag}>` +
      attribute.slice(selectionStart, selectionEnd) +
      `</${tag}>` +
      attribute.slice(selectionEnd);

    setAttribute(newText);
  };

  const handleModeToggle = () => {
    setMode((prevMode) => (prevMode === 'edit' ? 'preview' : 'edit'));
  };

  return (
    <div className="text-editor">
      <div className="toolbar">
        <div className="toolbar-button" onClick={() => handleTagInsertion('b')}>
          B
        </div>
        <div className="toolbar-button" onClick={() => handleTagInsertion('i')}>
          I
        </div>
        <div className="toolbar-button preview-edit-button" onClick={handleModeToggle}>
          {mode === 'edit' ? 'Preview' : 'Write'}
        </div>
      </div>
      {mode === 'edit' ? (
        <textarea
          ref={textareaRef}
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
