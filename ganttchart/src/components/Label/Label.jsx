import './label.scss'

function Label({ text }) {
    return (
        <div>
            <p className="font-size-12 label">{text}</p>
        </div>
    )
}

export default Label;