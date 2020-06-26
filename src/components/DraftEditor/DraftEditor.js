﻿import React, { useState, useRef } from 'react';
import { EditorState, RichUtils, AtomicBlockUtils, getDefaultKeyBinding } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createCounterPlugin from 'draft-js-counter-plugin';
import ToolBar from "./toolBar/ToolBar";
import Divider from '@material-ui/core/Divider';
import '../../../styles/Editor.css';

const counterPlugin = createCounterPlugin();
const { CharCounter, WordCounter, LineCounter } = counterPlugin;
const plugins = [counterPlugin];


export const DraftEditor = (props) => {
    const [editorState, setEditorState] = useState(props.editorState)
    const isReadOnly = props.readOnly;
    const editor = useRef('editor')

    const onEditorChange = (editorState) => {
        setEditorState(editorState);
        props.onChange(editorState);
    };
    
    const setFocus = () => {
        editor.current.focus();
    }

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onEditorChange(newState);
            return true;
        }
        return false;
    };

    const mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9) {
            const newEditorState = RichUtils.onTab(e, editorState, 4);
            if (newEditorState !== editorState) {
               onEditorChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    };

    const onTab = (e) => {
        const maxDepth = 4;
        onEditorChange(RichUtils.onTab(e, editorState, maxDepth));
    };

    const toggleBlockType = (blockType) => {
        onEditorChange(RichUtils.toggleBlockType(editorState, blockType));
    }
    const toggleInlineStyle = (inlineStyle) => {
        onEditorChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }

    const confirmMedia = (urlValue, urlType) => {
        const contentState = editorState.getCurrentContent();
        let contentStateWithEntity;
        if (urlType === 'video') {
            contentStateWithEntity = contentState.createEntity(
                urlType,
                'IMMUTABLE',
                { url: urlValue }
            );
        }
        else if (urlType === 'image') {
            contentStateWithEntity = contentState.createEntity(
                urlType,
                'IMMUTABLE',
                { 
                    url: urlValue.url,
                    filename: urlValue.file 
                }
            );
        }
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity }
        );

        onEditorChange(AtomicBlockUtils.insertAtomicBlock( newEditorState, entityKey, ' ' ));
    };

    const toolBar = () => {
        if(!isReadOnly){
            return(
                <div>
                    <ToolBar
                        editorState={editorState}
                        toggleBlockType={toggleBlockType}
                        toggleInlineStyle={toggleInlineStyle}
                        confirmMedia={confirmMedia}
                    />
                    <Divider/>
                </div>
            )
        }
    };

    const characters = () => {
        if(!isReadOnly){
            return(
                <div>
                    <Divider />
                    <div className="p-3 row">
                        <div className="mx-2"><CharCounter limit={200} /> characters</div>
                        <div className="mx-2"><WordCounter limit={30} /> words</div>
                        <div className="mx-2"><LineCounter limit={10} /> lines</div>
                    </div>
                </div>
            )
        }
    };

    return (
        <div className={props.className}>
            {toolBar()}
            <div className="RichEditor-editor" onClick={setFocus}>
                <Editor
                    readOnly={isReadOnly}
                    blockRendererFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    onChange={onEditorChange}
                    keyBindingFn={mapKeyToEditorCommand}
                    handleKeyCommand={handleKeyCommand}
                    onTab={onTab}
                    plugins={plugins}
                    ref={editor}
                    spellCheck={true}
                />
            </div>
            {characters()}
        </div>
    );
}


const styleMap = {
    CODE: {
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
    }
};

const getBlockStyle = block => {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        case 'atomic':
            return {
                component: Media,
                editable: false,
            };
        default:
            return null;
    }
};

const Video = (props) => {
    return (
        <div className="embed-responsive embed-responsive-16by9 w-100 bg-media">
            <iframe className="embed-responsive-item mx-auto media" src={props.src} allowFullScreen title="video"/>
        </div>
    )
};

const Image = (props) => {
    return (
        <div className="">
            <img src={props.src} className="media m-auto d-block" alt="img"/>
        </div>
    )
};

const Media = (props) => {
    const entity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    );
    const { url } = entity.getData();
    const type = entity.getType();

    let media;
    if (type === 'video') {
        media = <Video src={url} />;
    }
    else if (type === 'image') {
        media = <Image src={url} />;
    }

    return media;
};