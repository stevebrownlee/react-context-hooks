import { useState } from "react"

const useModal = (selector) => {

    const [isOpen, setIsOpen] = useState(false)

    function toggleDialog() {
        setIsOpen(!isOpen)

        if (isOpen) {
            document.querySelector(`${selector}`).removeAttribute("open")
        } else {
            document.querySelector(`${selector}`).setAttribute("open", true)
        }
    }

    return { toggleDialog, isOpen }
}

export default useModal
