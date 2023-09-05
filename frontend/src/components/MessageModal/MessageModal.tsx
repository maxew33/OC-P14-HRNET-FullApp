import React, { FormEvent } from 'react'

interface ModalProps {
    message: string
    confirm: (e: FormEvent) => void
}

export const MessageModal: React.FC<ModalProps> = (props) => {
    return (
        <div className="confirm-modal">
            <div className="confirm-modal-wrapper">
                {props.message}
                <button className="create-btn" onClick={props.confirm}>
                    OK
                </button>
            </div>
        </div>
    )
}
