import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Hover from './Hover';

const styles = {
    container: {
        position: 'relative',
        display: 'flex'
    },
    tooltip: {
        boxSizing: 'border-box',
        position: 'absolute',
        widht: '160px',
        bottom: '100%',
        left: '50%',
        marginLeft: '-80%',
        borderRadius: '3px',
        backgroundColor: '#000',
        padding: '7px',
        marginBottom: '5px',
        color: '#fff',
        textAlign: 'center',
        fontSize: '14px',
    }
}

export default function Tooltip({ text, children }) {
    return (
        <Hover>
            {(hovering) => (
                <div style={styles.container}>
                    {hovering === true && <div style={styles.tooltip}>{text}</div>}
                    {children}
                </div>
            )}
        </Hover>
    )
}

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
}