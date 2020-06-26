import React from "react";
import { INLINE_STYLES } from './constants';
import { StyleButton } from './StyleButton';

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls my-auto">
            {INLINE_STYLES.map(
                item =>
                    <StyleButton
                        key={item.label}
                        item={item}
                        active={currentStyle.has(item.style)}
                        onToggle={props.onToggle}
                    />
            )}
        </div>
    );
};

export default (InlineStyleControls);