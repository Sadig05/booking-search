import React from 'react';
import Select from 'react-select';
import CustomDropdownIcon from '../../assets/arrowDown.svg';
import {ISelect} from "../../Pages/Home/Home";

interface SelectBoxProps {
    onChange: (selectedValue: ISelect) => void;
    selectedValue: string;
    options: { value: string, label: string }[]; // Add options prop
}

const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#EC7F07' : state.isFocused ? '#EC7F070F' : 'white',
        color: state.isSelected ? 'white' : 'black',
        ':hover': {
            backgroundColor: '#EC7F070F',
            color: 'black'
        },
        cursor: 'pointer'
    }),
    control: (provided: any) => ({
        ...provided,
        borderRadius: 0,
        padding: "10px 19px 10px 10px",
        borderColor: 'grey',
    }),
    dropdownIndicator: (provided: any) => ({
        ...provided,
        color: 'white'
    }),
    indicatorSeparator: (provided: any) => ({
        ...provided,
        backgroundColor: 'white'
    })
};


const SelectBox = ({onChange, selectedValue, options}: SelectBoxProps) => (
    <Select
        value={{ value: selectedValue, label: selectedValue }}
        onChange={onChange}
        options={options}
        styles={customStyles}
        components={{
            DropdownIndicator: () => (
                <img src={CustomDropdownIcon} alt="Custom Dropdown Icon" />
            )
        }}
    />
);

export default SelectBox;
