const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[500px] relative">
          <button
            className="absolute right-3 top-3 btn btn-sm btn-circle"
            onClick={onClose}
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
  