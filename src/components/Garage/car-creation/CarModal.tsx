import Button from "../../../UI/Button.tsx";
import {ButtonType} from "../../../constants/button-type.ts";
import Modal from "../../../UI/Modal.tsx";
import React, {useEffect, useState} from "react";
import Input from "../../../UI/Input.tsx";
import {useDispatch, useSelector} from "react-redux";
import {closeCarModal, openCarModal} from "../../../store/ModalSlide.ts";
import {CarEnum} from "../../../constants/Input-name.ts";
import type {CarModelInterface} from "../../../interface/car-model.interface.ts";
import type {AppDispatch, RootState} from "../../../store/store.ts";

import {CANCEL_BUTTON, CREATE_BUTTON} from "../../../constants/style-constants.ts";
import {createCar} from "../../../store/CarSlice.ts";
import {ErrorMessageEnum} from "../../../constants/error-message.enum.ts";

const formInitialState = {
    car_name: '',
    car_color: ''
}
export default function CarModal() {
    const [form, setForm] = useState<CarModelInterface>(formInitialState);
    const [error, setError] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const responseError = useSelector((state: RootState) => state.carSlice.error);
    const isModalOpen = useSelector((state: RootState) => state.modalSlice.isOpen);
    const handleInputChange = (inputName: string, value: string) => {
        setForm((prev) => ({...prev, [inputName]: value}))
    }

    useEffect(() => {
        if (responseError) {
            setError(responseError);
        }
    }, [responseError]);

    useEffect(() => {
        if (!isModalOpen) {
            setForm(formInitialState);
            setError('');
        }
    }, [isModalOpen]);

    const createCarModel = () => {
        if (form.car_name != '') {
            dispatch(createCar({form})).then(() => {
                dispatch(closeCarModal())
            }).catch(() => {
                setError(ErrorMessageEnum.SERVER_RESPONSE)
            })
        } else {
            setError(ErrorMessageEnum.FIELD_REQUIRED)
        }
    }

    return <div className="border-b border-solid pb-[30px]">
        <Button className={CREATE_BUTTON} onClick={() => dispatch(openCarModal())} value={ButtonType.CREATE}/>
        <Modal className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col justify-between h-full">
                <div>
                    <Input value={form.car_name}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handleInputChange(CarEnum.CAR_NAME, event.target.value)
                           }}
                           className="border border-solid px-4 py-2.5 rounded mb-2.5"
                           label="Car Name"
                           name="car_name"
                           errors={error}
                           type="text"/>

                    <Input value={form.car_color || '#000000'}
                           name="car_color"
                           label="Car Color"
                           className="w-[25px]"
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                               handleInputChange(CarEnum.CAR_COLOR, event.target.value)
                           }}
                           type="color"/>
                </div>
                <div className="flex justify-between">
                    <Button onClick={() => dispatch(closeCarModal())} className={CANCEL_BUTTON}
                            value={ButtonType.CANCEL}/>
                    <Button onClick={createCarModel} className={CREATE_BUTTON} value={ButtonType.CREATE}/>
                </div>
            </div>
        </Modal>
    </div>
}