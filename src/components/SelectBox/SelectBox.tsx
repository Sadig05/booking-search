import React from 'react';
import Select from 'react-select';
import CustomDropdownIcon from '../../assets/arrowDown.svg';
import {ISelect} from "../../Pages/Home/Home";
import styles from './SelectBox.module.scss'

interface SelectBoxProps {
    onChange: (selectedValue: ISelect) => void;
    selectedValue: string;
    options: { value: string, label: string }[]; // Add options prop
    defaultValue: any
    placeHolder: string
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
        cursor: 'pointer',
        zIndex: 3
    }),
    control: (provided: any) => ({
        ...provided,
        borderRadius: 0,
        padding: "10px 19px 10px 10px",
        borderColor: '#DBDBDB',
        paddingLeft: '83px',
    }),
    dropdownIndicator: (provided: any) => ({
        ...provided,
        color: 'white'
    }),
    indicatorSeparator: (provided: any) => ({
        ...provided,
        backgroundColor: 'white'
    }),
};


const SelectBox = ({onChange, selectedValue, options, defaultValue , placeHolder}: SelectBoxProps) => (
    <div className={styles.selectWrapper}>
        <span className={styles.sortByLabel}>{placeHolder}</span>
        <Select
            value={{ value: selectedValue, label: selectedValue }}
            defaultValue={options[2]}
            onChange={onChange}
            options={options}
            placeholder="Sort by"
            styles={customStyles}
            components={{
                DropdownIndicator: () => (
                    <img src={CustomDropdownIcon} alt="Custom Dropdown Icon" />
                )
            }}
        />

    </div>

);

export default SelectBox;
