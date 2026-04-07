import './Modal.css'

export default function Modal({
    shown,
    setShown,
    children
}) {
    if (!shown) return <></>

    return <div className="modal-backdrop">
        <div className="modal">
            <button onClick={() => setShown(false)}>
                Close
            </button>
            {children}
        </div>
    </div>
}