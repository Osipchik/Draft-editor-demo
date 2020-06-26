import React, { useState } from 'react';
import { DraftEditor } from  './components/DraftEditor/DraftEditor'
import { EditorState, convertToRaw } from 'draft-js';
import Button from '@material-ui/core/Button';


export const App = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [rawData, setRawData] = useState()

    const click = () => {
        const contentState = editorState.getCurrentContent();
        let raw = JSON.stringify(convertToRaw(contentState), null, 4)
        setRawData(raw);
        
        console.log(raw);
    }

    const clear = () => {
        setRawData(undefined);
    }

    const getClearButton = () => {
        
        if (rawData !== undefined){
            return(
                <Button
                    className="p1 w-100 mx-2"
                    variant="contained" 
                    color="secondary"
                    onClick={clear}
                >
                    clear
                </Button>
            )
        }
    }

    const showRawData = () => {
        if (rawData !== undefined){
            return(
                <pre className="m-5">
                    <code>
                        {rawData}
                    </code>
                </pre>
            )   
        }
    }

    return(
        <div className="App p-3">
            <DraftEditor
                onChange={(editorState) => setEditorState(editorState)}
                editorState={editorState}
                readOnly={false}
                className="mb-4 borders mx-4"
            />
            <div className="p-3">
                <div className="d-flex justify-content-between">
                    <Button 
                        className="p-1 w-100 mx-2"
                        variant="contained" 
                        color="primary" 
                        onClick={click}
                    >
                        convert to raw
                    </Button>
                    {getClearButton()}
                </div>

                {showRawData()}
            </div>
        </div>
    )
}