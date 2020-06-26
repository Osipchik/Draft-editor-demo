import React from "react"
import { BLOCK_TYPES } from './constants';
import { StyleButton } from './StyleButton';

const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    return (
        <div className="RichEditor-controls my-auto">
            {BLOCK_TYPES.map(
                (item) =>
                    <StyleButton
                        key={item.label}
                        item={item}
                        active={item.style === blockType}
                        onToggle={props.onToggle}
                    />
            )}
        </div>
    );
};

export default (BlockStyleControls);