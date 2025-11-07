import { useState, useRef } from 'react';
import { useMenu } from "./useMenu";

export function MenuComponent( {name, options, onOptionChange} ) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setOpen(!open);
    useMenu(setOpen, menuRef);

    return (
        <div className="relative inline-block" ref={menuRef}>
            <button onClick={toggleMenu} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                {name}
            </button>

            {open && (
                <div className="absolute left-full top-0 ml-2 bg-white border rounded-md shadow-lg w-40">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => onOptionChange(option, setOpen)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                {option}
                            </button>
                    ))}
                </div>
            )}
        </div>
    )
}