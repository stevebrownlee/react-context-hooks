import { useState } from "react"

const useModal = () => {
    function toggleDialog(isOpen) {
        if (isOpen) {
            document.querySelector("#dialog--animal").setAttribute("open", true)
        } else {
            document.querySelector("#dialog--animal").removeAttribute("open")
        }
    }

    return { toggleDialog }
}

export default useModal
