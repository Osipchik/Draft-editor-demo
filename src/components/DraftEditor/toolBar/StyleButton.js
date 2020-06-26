import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

export class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.item.style);
        };
    }
    render() {
        const className = this.props.active ? 'primary-main' : 'color-disable';

        return (
            <Tooltip TransitionComponent={Zoom} title={this.props.item.label} placement="top">
                <span className={`${className} tool-item mx-1`} onMouseDown={this.onToggle}>
                    {this.props.item.icon}
                </span>
            </Tooltip>
        );
    }
}