import "./Playground.css";
import { useSelector } from 'react-redux'
import { useState } from 'react';
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

function Playground(props: { onCodeChange: (value: string) => void,clearEditorValue:any }): JSX.Element {
    const authSlice = useSelector((state: any) => state.auth);

    function handleEditorChange(value: any) {        
        if (value !== "") {
            props.onCodeChange(value);
        }
    }

    return (
        <div className="Playground">
            <Editor
                height="90%"
                defaultLanguage={authSlice.language}
                defaultValue="//Code..."
                value={props.clearEditorValue}
                theme="vs-dark"
                onChange={handleEditorChange} 
            />
        </div>
    );
}

export default Playground;
