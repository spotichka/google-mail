import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "../../hooks/useOnClickOutside.ts";
import { CloseCircleOutlined } from "@ant-design/icons";
import s from "./styles.module.css";
import * as React from "react";

const CustomModal = ({
  isShown,
  setModalShown,
  children,
}: {
  children: React.ReactNode;
  setModalShown: (isShown: boolean) => void;
  isShown: boolean;
}) => {
  let modalRootElement = document.getElementById("portal");
  const modalRef = useRef<HTMLDivElement>(null);
  const squareBoxRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(squareBoxRef, (e: any) => {
    if (!e.composedPath().includes(modalRef.current)) {
      return;
    }
    setModalShown(false);
  });
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
        <div className={s.layoutModal} ref={modalRef} key={"modal"}>
          <div ref={squareBoxRef} className={s.modal}>
            <div
              className={s.close}
              onClick={(e) => {
                e.stopPropagation();
                setModalShown(false);
              }}
            >
              <CloseCircleOutlined height={24} width={24} />
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
