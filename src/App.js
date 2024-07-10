import React, { useState } from "react";
import "./App.css";
import {marked} from "marked"; 

const App = () => {
  const defaultMarkdown = `
  # Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff

  Heres some code, \`<div></div>\`, between 2 backticks.

  \`\`\`
  // this is a multi-line code:

  function anotherExample(firstLine, lastLine) {
    if(firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
      }
    }
  \`\`\`

  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.

  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!

  And if you want to get really crazy, even tables:

  | Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here...
  And here. | Okay. | I think we get it.

  - And of course there are lists.
      - Some are bulleted.
        - With different indentation levels.
          - That look like this.

      
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget ebedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  `;

  const [text, setText] = useState(defaultMarkdown);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 9) {
      event.preventDefault();
      const { selectionStart, selectionEnd, value } = event.target;
      const newValue =
        value.substring(0, selectionStart) + "\t" + value.substring(selectionEnd);
      setText(newValue);
    }
  };

  const getMarkdownText = () => {
    const rawMarkup = marked(text, { breaks: true, gfm: true });
    return { __html: rawMarkup }; // No need to sanitize here, since marked.js output is trusted
  };

  return (
    <div className="container">
      <h1 className="title">Markdown Previewer</h1>
      <div className="editorWrap">
        <div className="toolbar">Editor</div>
        <textarea
          className="editor"
          id="editor"
          placeholder="Place your code here"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>
      <div className="previewWrap">
        <div className="toolbar">Previewer</div>
        <div
          id="preview"
          className="preview"
          dangerouslySetInnerHTML={getMarkdownText()}
        ></div>
      </div>
    </div>
  );
};

export default App;
