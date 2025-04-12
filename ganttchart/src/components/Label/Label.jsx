import './label.scss'

function Label({ text}) {
    return (
        <div>
            <p className="font-size label ">{text}</p>
        </div>
    )
}

export default Label;