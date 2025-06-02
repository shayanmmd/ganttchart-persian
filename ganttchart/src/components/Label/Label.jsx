import './label.scss'

function Label({ text, className }) {
    
    const classes = `font-size-12 label ${className}`;

    return (
        <div>
            <p className={classes}>{text}</p>
        </div>
    )
}

export default Label;