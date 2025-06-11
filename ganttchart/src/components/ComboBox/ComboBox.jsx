import { useState } from 'react';
import Select from 'react-select';

function ComboBox({ data, onchangeFunction, defaultValue = 'انتخاب کنید...' }) {

    return <Select placeholder={defaultValue} options={data} onChange={onchangeFunction} isSearchable />;
}

export default ComboBox;

