import "./Playground.css";
import { useSelector } from 'react-redux'
import Editor from "@monaco-editor/react";

function Playground(props: { onCodeChange: (value: string) => void,clearEditorValue:any }): JSX.Element {
    const interviewSlice = useSelector((state: any) => state.interview);

    function handleEditorChange(value: any) {        
        if (value !== "") {
            props.onCodeChange(value);
        }
    }

    return (
        <div className="Playground">
            <Editor
                height="90%"
                defaultLanguage={interviewSlice.language}
                defaultValue={'//Write the code here'}
                value={props.clearEditorValue}
                theme="vs-dark"
                onChange={handleEditorChange} 
            />
        </div>
    );
}

export default Playground;
