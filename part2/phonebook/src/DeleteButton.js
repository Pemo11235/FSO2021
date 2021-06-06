import React from "react";

function DeleteButton ({onClickAction}) {
    return (
        <button onClick={onClickAction}> Delete</button>
    )
}

export {DeleteButton}