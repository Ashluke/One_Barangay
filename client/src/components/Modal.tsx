import type { ReactNode } from "react";
import "../styles/modal.css"

type Props = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

function Modal({ isOpen, title, children, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="modalBackdrop">
      <div className="modal">

        <div className="modalHeader">
          <h3>{title}</h3>
          <button onClick={onClose}>X</button>
        </div>

        <div className="modalBody">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Modal;