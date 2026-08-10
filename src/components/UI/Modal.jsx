import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";


const ModalContext = createContext(null);

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, name }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(name) });
}

function Close({ children }) {
  const { close } = useContext(ModalContext);
  return cloneElement(children, { onClick: close });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [close]);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <CloseButton onClick={close}>
          <MdClose />
        </CloseButton>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

/* ------------------------------ استایل‌ها ------------------------------ */

function Overlay({ children }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 15, 15, 0.55)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 1000,
        animation: "modal-fade-in 0.15s ease-out",
      }}
    >
      {children}
      <style>{`
        @keyframes modal-fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modal-scale-in {
          from { opacity: 0; transform: scale(0.96) translateY(8px) }
          to   { opacity: 1; transform: scale(1) translateY(0) }
        }
      `}</style>
    </div>
  );
}

const StyledModal = React.forwardRef(function StyledModal({ children }, ref) {
  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        background: "#fff",
        borderRadius: 14,
        width: "500px",
        maxHeight: "calc(100vh - 64px)",
        overflowY: "auto",
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        animation: "modal-scale-in 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
});

function CloseButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-label="بستن"
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        border: "none",
        background: "#f2f2f2",
        borderRadius: "50%",
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        cursor: "pointer",
        color: "#444",
      }}
    >
      {children}
    </button>
  );
}

/* --------------------------- هوک کلیک بیرون --------------------------- */

function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}

/* ------------------------------------------------------------------ */

Modal.Open = Open;
Modal.Window = Window;
Modal.Close = Close;

export default Modal;

/* ------------------------------------------------------------------ */
/*  نمونه استفاده دقیقاً مطابق چیزی که خواستی                          */
/*  نکته: name توی Modal.Open و Modal.Window باید یکی باشه             */
/*  (توی پیامت "پرداخت" و "payment" فرق داشتن، اینجا هماهنگش کردم)     */
/* ------------------------------------------------------------------ */

export function Example() {
  return (
    <div style={{ direction: "rtl" , padding: 40 }}>
      <Modal>
        <Modal.Open name="payment">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#14b8a6",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            <span>پرداخت</span>
          </button>
        </Modal.Open>

        <Modal.Window name="payment">
          <div className="p-6">
            <h2 style={{ fontSize: 18, fontWeight: 700, marginTop: 0 }}>پرداخت</h2>
            <p>this is modal</p>

            <Modal.Close>
              <button
                style={{
                  marginTop: 16,
                  background: "#e5e7eb",
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                بستن
              </button>
            </Modal.Close>
          </div>
        </Modal.Window>
      </Modal>
    </div>
  );
}
