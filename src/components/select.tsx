import React from 'react';
import ReactSelect from "react-select"

type Props = {
    label: string;
    value: Record<string, any>
    onChange: (value: Record<string, any>) => void;
    options: Record<string, any>[]
    disabled?:boolean;
};

const Select: React.FC<Props> = ({label, value, onChange, options, disabled }) => {
    return (
        <div className={"z-[100]"}>
            <label className={"block text-sm font-medium leading-6 text-gray-900"}>
                {label}
            </label>
            <div>
                <ReactSelect
                        isDisabled={disabled}
                        value={value}
                        onChange={onChange}
                        options={options}
                        isMulti
                        menuPortalTarget={document.body}
                        styles={{
                            menuPortal: base => ({
                                ...base,
                                zIndex: 9999
                            })
                        }}
                        classNames={{
                            control: () => "text-sm"
                        }}
                    />
            </div>
        </div>
    );
};

export default Select;