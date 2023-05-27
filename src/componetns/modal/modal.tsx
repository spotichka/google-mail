import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

const CustomModal = ({
  isShown,
  setModalShown,
  children,
}: {
  children: any;
  setModalShown: (isShown: boolean) => void;
  isShown: boolean;
}) => {
  let modalRootElement = document.getElementById("portal");
  const modalRef = useRef<HTMLDivElement>(null);
  const squareBoxRef = useRef<HTMLDivElement>(null);

  // useOnClickOutside(squareBoxRef, (e: any) => {
  //   if (!e.path.includes(modalRef.current)) {
  //     return;
  //   }
  //   setModalShown(false);
  // });
  useEffect(() => {
    if (isShown && modalRootElement) {
      modalRootElement.appendChild(element);
      return () => {
        modalRootElement?.removeChild(element);
      };
    }
  });

  const element = useMemo(() => document.createElement("div"), []);

  if (!modalRootElement) return <div />;

  return createPortal(
    <>
      {isShown && (
        <div className={styles.layout__modal} ref={modalRef} key={"modal"}>
          <div ref={squareBoxRef} className={styles.modal}>
            <div
              className={styles.close}
              onClick={(e) => {
                e.stopPropagation();
                setModalShown(false);
              }}
            >
              X
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    modalRootElement
  );
};

export default CustomModal;
