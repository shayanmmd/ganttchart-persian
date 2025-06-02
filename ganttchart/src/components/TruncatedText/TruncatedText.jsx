function TruncatedText({ text, maxLength, className = null }) {

    if (maxLength <= 0)
        return;

    if (text.length > maxLength) {
        return (
            <>
                <p className={className} dir="rtl" >{text.substring(0, maxLength)}<span>...</span></p>

            </>
        );
    }

    return (
        <p className={className} dir="rtl">{text}</p>
    );
}

export default TruncatedText;