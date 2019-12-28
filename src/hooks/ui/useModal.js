import { useState } from "react"

const useModal = (selector) => {

    const [modalIsOpen, setIsOpen] = useState(false)

    const toggleDialog = () => {
        setIsOpen(!modalIsOpen)

        if (modalIsOpen) {
            document.querySelector(`${selector}`).removeAttribute("open")
        } else {
            document.querySelector(`${selector}`).setAttribute("open", true)
        }
    }

    return { toggleDialog, modalIsOpen }
}

export default useModal
