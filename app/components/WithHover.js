import React from 'react';
import PropTypes from 'prop-types';

export default function withHover(Component, propName='hovering') {
    return class WithHover extends React.Component {
        state = {
           hovering: false,
        }
        mouseOver = () => {
            this.setState({
                hovering: true
            });
        }
        mouseOut = () => {
            this.setState({
                hovering: false
            });
        }
        render() {
            const props = {
                [propName]: this.state.hovering,
                ...this.props
            }

            return(
                <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                    <Component {...props}/>
                </div>   
            )
        }
    }
}