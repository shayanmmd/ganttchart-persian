import { Form } from "react-bootstrap";

function ComboBox({ size = 'sm', options = [], defaultSelect = 'انتخاب کنید ...', onchangeFunction }) {

    return (
        <>
            <Form.Select onChange={(event) => onchangeFunction(event)} size={size}>
                <option value="0">{defaultSelect}</option>
                {options.map((option) => {
                    return (
                        <option dir="rtl" key={option.value} value={option.value}>{option.key}</option>
                    )
                })}
            </Form.Select>
        </>
    )
}

export default ComboBox;