import type {ModalPropsInterface} from "../interface/modal-props.interface.ts";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";
import CloseSvg from "./CloseSvg.tsx";
import {closeCarModal} from "../store/ModalSlide.ts";

export default function Modal({children, className = ''}: ModalPropsInterface) {

    const dialog = useRef<HTMLDialogElement>(null);
    const dispatch = useDispatch()

    const isOpen = useSelector((state: RootState) => state.modalSlice.isOpen);

    const closeModal = () => {
        dispatch(closeCarModal())
    }

    useEffect(() => {
        const modal = dialog.current;

        if (!modal) return;

        if (isOpen) {
            modal.showModal();
            document.body.style.overflow = 'hidden';
        } else {
            modal.close();
            document.body.style.overflow = 'unset';
        }

        return () => {
            if (modal.open) {
                modal.close();
            }
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return <dialog
        className={className}
        ref={dialog}
        onClick={() => {
        }}
        onCancel={() => {
        }}
    >
        <div className="p-4 w-[300px] max-w-full flex  flex-col justify-between h-[250px]">
            {children}
        </div>
        <CloseSvg onClick={closeModal}/>
    </dialog>
}