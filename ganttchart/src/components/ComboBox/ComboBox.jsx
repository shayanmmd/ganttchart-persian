import { Form } from "react-bootstrap";

function ComboBox({ size = 'sm', data, defaultSelect = 'انتخاب کنید ...', onchangeFunction, dir = 'rtl' }) {

    return (
        <Form.Select onChange={(event) => onchangeFunction(event)} size={size}>
            <option value="0">{defaultSelect}</option>
            {data?.map((option) => {
                return (
                    <option dir={dir} key={option.id} value={option.id}>{option.title}</option>
                )
            })}
        </Form.Select>
    )
}

export default ComboBox;