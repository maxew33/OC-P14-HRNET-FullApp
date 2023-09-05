import React, { useState } from 'react'

interface DropdownProps {
    currentValue?: string | null
    items: (number | string)[]
    dataName?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectItem: (id: string, value: any) => void
}

const Dropdown: React.FC<DropdownProps> = (props) => {
    const [isDropped, setIsDropped] = useState(false)

    const handleClick = () => {
        setIsDropped(!isDropped)
    }

    const handleSelect = (item: string | number) => {
        props.selectItem(props.dataName ?? '', item)
        setIsDropped(false)
    }

    return (
        <div className="dropdown">
            {props.dataName && <div>{props.dataName} :</div>}
            <div className={"value" + (isDropped ? " dropped" : "")} onClick={handleClick}>
                {props.currentValue ?? 'select'}
                
                {isDropped && (
                    <ul className="list">
                        {props.items.map((item, key) => (
                            <li key={key} onClick={() => handleSelect(item)}>
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Dropdown
