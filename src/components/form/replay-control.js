import { forwardRef, useImperativeHandle, useRef } from "react"

import Popup from "../popup-error/popup-error";

const ReplayControl = forwardRef((props, ref) => {
    const refPopup = useRef();

    useImperativeHandle(ref, () => ({

        replayControl(inputCase, inputDate, inputNotes, inputImage){
            const content = props.data;

            const filteredElements = content.filter(item => item.inputCase === inputCase && item.inputDate === inputDate);

            if (filteredElements.length > 0) {
                refPopup.current.showPopup(`Така справа уже існує`)
            } else {
                props.onAdd(inputCase, inputDate, inputNotes, inputImage);
            }
        }
    }))

    return (
        <>
            <Popup ref={refPopup} />
        </>
    )
})

export default ReplayControl