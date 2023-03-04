import "./ParsonsProblem_style.css";
import React, { useEffect, useState } from 'react';




function ParsonsProblem(props) {

    var initX;
    var dragItem;
    var draggedOver;

    const [codeFragmentsArray, setCodeFragmentsArray] = useState([]);
    // Hacer arreglo de codeFragments
    useEffect(() => {
        // Cuando cambie code, volver a hacer array de codeFragments
        // Split de code por codedelimiter
        let auxArray = [];
        auxArray = props.code.split(props.codedelimiter);
        // Split de cada codeFragment por VPD (o creo q aún no, eso se ve en rendering)
        setCodeFragmentsArray(auxArray);
    }, [props.code, props.codedelimiter, props.vpddelimiter]);

    function handleDragEnterColumn(e) {
        // enteringColumn = this;
        console.log("enter", e.target);
    }

    function handleDragLeaveColumn(e) {
        console.log("leave", e.target);
    }

    function handleDragStart(e) {
        initX = e.clientX;
        dragItem = e.target;
        console.log("start", dragItem, initX);
    }

    function handleDragEnd() {
        dragItem = null;
        // updateAnswer();
        console.log("dragend");
    }

    function handleDragOver(e) {
        e.preventDefault();
        draggedOver = e.target;
        // If draggedOver is a visually paired choice, then the choices are the neighborhood and throws errors when calling moveItem
        // if (draggedOver.classList.includes("sortable-choice")) {
        //     // draggedOver = draggedOver.parentNode;
        // }
        // console.log("dragover", draggedOver);
    }

    function handleClickChoice() {
        console.log("handleclickchoice");
    }

    return (
        <div className="parsons sortable-container" id={props.id}>
            <div className="parsons sortable-column-left" id={"column0"}
                onDragEnter={handleDragEnterColumn}
                onDragLeave={handleDragLeaveColumn}
            >
                {codeFragmentsArray.map((element) => {
                    if (element.includes(props.vpddelimiter)) {
                        let sortableChoices = element.split(props.vpddelimiter);
                        return (
                            <div className="parsons sortable-choice-parent" draggable
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                            >
                                {sortableChoices.map((sortableChoice, index) => {
                                    var auxClass = index === 0 ? ("sortable-choice chosen-choice") : ("sortable-choice");
                                    return (
                                        <div className={auxClass}
                                            onClick={handleClickChoice}
                                        >
                                            {sortableChoice}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    } else {
                        return (
                            <div className="parsons sortable-item" draggable
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                            >
                                {element}
                            </div>
                        )
                    }
                })}
            </div>
            <div className="parsons sortable-column-right" id={"column1"}>

            </div>

        </div>
    );
}

export default ParsonsProblem;