import { useState, useEffect, useRef } from 'react';

const useToggle = (initialValue, setRefs = false) => {
    const visibleElementRef = useRef();
    const toggledElementRef = useRef();
    const [isOpen, setIsOpen] = useState(initialValue);

    const handleClick = event => {
        if (visibleElementRef.current.contains(event.target)) {
            setIsOpen(!isOpen);
        } else if (!toggledElementRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(
        () => {
            if (setRefs) {
                // add event listener on mount
                document.addEventListener('click', handleClick, true);
                // remove event listener on Unmount
                return () => {
                    document.removeEventListener('click', handleClick, true);
                };
            }
        },
        [isOpen]
    );

    return {
        isOpen,
        setOpen: value => setIsOpen(value),
        visibleElementRef: setRefs ? visibleElementRef : null,
        toggledElementRef: setRefs ? toggledElementRef : null
    };
};

export default useToggle;
