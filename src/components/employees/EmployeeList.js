import React, { useContext, useState } from "react"
import Modal from "react-modal"
import Employee from "./Employee"
import { EmployeeContext } from "../providers/EmployeeProvider"
import "./EmployeeList.css"
import EmployeeForm from "./EmployeeForm";


export default props => {
    const { employees, fireEmployee } = useContext(EmployeeContext)
    const [modalOpen, setModalOpen] = useState(false)

    Modal.setAppElement('#root')

    return (
        <React.Fragment>

            <Modal
                isOpen={modalOpen}
                onRequestClose={e => setModalOpen(false)}
                closeTimeoutMS={50}
                contentLabel="New employee form"
                portalClassName="ReactModalPortal"
                overlayClassName="Overlay"
                className="Modal"
                bodyOpenClassName="ReactModal__Body--open"
                htmlOpenClassName="ReactModal__Html--open"
                ariaHideApp={true}
                shouldFocusAfterRender={true}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                shouldReturnFocusAfterClose={true}
                role="dialog"
                parentSelector={() => document.body}
                aria={{
                    labelledby: "heading",
                    describedby: "full_description"
                }}
                data={{
                    background: "green"
                }}
            >
                <EmployeeForm setModalOpen={setModalOpen} />
            </Modal>

            <div className="centerChildren btn--newResource">
                <button type="button"
                    className="btn btn-success "
                    onClick={() => setModalOpen(true)}>
                    Hire Employee
                </button>
            </div>

            <div className="employees">
                {employees.map(a => <Employee key={a.id} employee={a} fireEmployee={fireEmployee} />)}
            </div>
        </React.Fragment>
    )
}
