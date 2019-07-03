const useModal = (selector) => {
    function toggleDialog(isOpen) {
        if (isOpen) {
            document.querySelector(`${selector}`).setAttribute("open", true)
        } else {
            document.querySelector(`${selector}`).removeAttribute("open")
        }
    }

    return { toggleDialog }
}

export default useModal
