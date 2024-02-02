import "./Modal.css"

import { useRef, useEffect } from 'react';




const Modal = ({ storieConfirm, feedConfirm, onClose }) => {
    
    const modalRef = useRef();

    useEffect(() => {

        const handleClickOutside = (e) => {

            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        
    }, [onClose]);



  return (
    <div className="container-modal">
      <div className="modal" ref={modalRef}>
        <div  className="btn-modal" >
            <span onClick={() => feedConfirm()}>F</span>
            <p>feed</p>
        </div>
        <div  className="btn-modal" >
            <span onClick={() => storieConfirm()}>S</span>
            <p>stories</p>
        </div>
      </div>
    </div>
  )
}

export default Modal