import React from "react";
import BlockStyleControls from "./BlockControls";
import InlineStyleControls from "./InlineControls";
import HeaderSelect from "./HeaderControl";
import AddVideo from './AddVideo'
import AddImage from './AddImage'

export default class ToolBar extends React.Component {
    render() {
        const {editorState, toggleBlockType, toggleInlineStyle, confirmMedia} = this.props;
        
        return (
            <div className="row mx-2">
                <HeaderSelect
                    editorState={editorState}
                    onToggle={toggleBlockType}
                />
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={toggleInlineStyle}
                />
                <AddImage insert={confirmMedia}/>
                <AddVideo insert={confirmMedia}/>
            </div>
        )
    }
}