import "./ParsonsProblem_style.css";
import React, { useEffect, useRef, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import UnirBloques from "./UnirBloques";
import SingleLineForm from "./SingleLineForm";
import CrearVPDistractores from "./CrearVPDistractores";
import { Col } from "react-bootstrap";

function ParsonsProblem(props) {

    const dragItem = useRef();
    const draggedOver = useRef();

    const [modoUnirBloques, setModoUnirBloques] = useState(false);
    const codeDelimiterIsSet = useRef(props.codedelimiter !== "\n");
    const [showCodeDelimiterModal, setShowCodeDelimiterModal] = useState(false);
    const handleCloseCodeDelimiterModal = () => setShowCodeDelimiterModal(false);
    const handleShowCodeDelimiterModal = () => setShowCodeDelimiterModal(true);
    const [preCodeDelimiter, setPreCodeDelimiter] = useState(props.codedelimiter);

    const [modoCrearVPDistractores, setModoCrearVPDistractores] = useState(false);
    const VPDDelimiterIsSet = useRef(props.vpddelimiterL !== null && props.vpddelimiterM !== null && props.vpddelimiterR !== null);
    const [showVPDDelimiterModal, setShowVPDDelimiterModal] = useState(false);
    const handleCloseVPDDelimiterModal = () => setShowVPDDelimiterModal(false);
    const handleShowVPDDelimiterModal = () => setShowVPDDelimiterModal(true);
    const [preVPDDelimiterL, setPreVPDDelimiterL] = useState(props.vpddelimiterL);
    const [preVPDDelimiterM, setPreVPDDelimiterM] = useState(props.vpddelimiterM);
    const [preVPDDelimiterR, setPreVPDDelimiterR] = useState(props.vpddelimiterR);

    const [codeFragmentsArray, setCodeFragmentsArray] = useState([]);
    const [initialOrderCodeFragmentsArray, setInitialOrderCodeFragmentsArray] = useState([]);

    // Whenever any attribute that is involved in the making of the Parsons Problem UI
    // is changed, the UI must be updated to reflect those changes.
    useEffect(() => {
        let auxArray = [];
        auxArray = props.code.split(props.codedelimiter);
        setCodeFragmentsArray(auxArray);
        setInitialOrderCodeFragmentsArray(auxArray);
    }, [props.code, props.codedelimiter, props.vpddelimiter]);

    // We use the variable codeDelimiterIsSet to keep track if the user should define it before
    // they try to use the functionality of code fragment merging
    useEffect(() => {
        if(props.codedelimiter !== "\n") {
            codeDelimiterIsSet.current = true;
        } else {
            codeDelimiterIsSet.current = false;
        }
    }, [props.codedelimiter]);

    // We use the variable VPDDelimiterIsSet to keep track if the user should define them
    // before they try to use the functionality of visually paired code creation
    useEffect(() => {
        if(props.vpddelimiterL !== null && props.vpddelimiterM !== null && props.vpddelimiterR !== null) {
            VPDDelimiterIsSet.current = true;
        } else {
            VPDDelimiterIsSet.current = false;
        }
    }, [props.vpddelimiterL, props.vpddelimiterM, props.vpddelimiterR]);

    // Whenever a code fragment gets dragged, this keeps track of the object being dragged
    function handleDragStart(e, position) {
        dragItem.current = position;
    }

    // Whenever a code fragment gets dragged onto another one, they change position
    function handleDragEnter(e, position) {
        draggedOver.current = position;
        const copyCodeFragmentsArray = [...codeFragmentsArray];
        const dragItemContent = copyCodeFragmentsArray[dragItem.current];
        copyCodeFragmentsArray.splice(dragItem.current, 1);
        copyCodeFragmentsArray.splice(draggedOver.current, 0, dragItemContent);
        dragItem.current = draggedOver.current;
        draggedOver.current = null;
        setCodeFragmentsArray(copyCodeFragmentsArray);

    }

    // Whenever a code fragment stops getting dragged, this function restarts any variable that keeps
    // track of code fragments getting dragged / getting dragged over
    const handleDragEnd = (e) => {
        dragItem.current = null;
        draggedOver.current = null;
    }

    // This function prevents the use of default event handler of dragging over
    function handleDragOver(e, position) {
        e.preventDefault();
    }

    // This function checks if a code delimiter is set, if it is then it starts the code fragment merging mode
    // otherwise it triggers a Modal that asks the user to set a code delimiter
    function handleClickUnirBloques() {
        if(!(codeDelimiterIsSet.current)) {
            handleShowCodeDelimiterModal();
        } else {
            props.setDisabledinput(true);
            setModoUnirBloques(true);
        }
    }

    // This function checks if a visually paired distractor delimiter is set,
    // if it is then it starts the visually paired distractors creation mode
    // otherwise it triggers a Modal that asks the user to set a visually paired distractor delimiter
    function handleClickCrearVPDistractores() {
        if (!(VPDDelimiterIsSet.current)) {
            handleShowVPDDelimiterModal();
        } else {
            props.setDisabledinput(true);
            setModoCrearVPDistractores(true);
        }
    }

    // This function modifies the code delimiter and changes the variable code so it adapts
    // to the new code delimiter, it also triggers the code fragment merging mode
    function handleSaveCodeDelimiterModal() {
        handleCloseCodeDelimiterModal();
        let auxCode = props.code.split(props.codedelimiter);
        auxCode = auxCode.join(preCodeDelimiter);
        props.setCode(auxCode);
        props.setCodedelimiter(preCodeDelimiter);
        handleClickUnirBloques();
    }

    // This function modifies the visually paired distractor delimiters and
    // also triggers the visually paired distractor creation mode
    function handleSaveVPDDelimiterModal() {
        handleCloseVPDDelimiterModal();
        props.setVPDdelimiterL(preVPDDelimiterL);
        props.setVPDdelimiterM(preVPDDelimiterM);
        props.setVPDdelimiterR(preVPDDelimiterR);
        handleClickCrearVPDistractores();
    }

    return (
        <>
            {modoUnirBloques ? (
                <UnirBloques
                setDisabledinput={props.setDisabledinput}
                setModoUnirBloques={setModoUnirBloques}
                initialOrderCodeFragmentsArray={initialOrderCodeFragmentsArray}
                vpddelimiterL={props.vpddelimiterL}
                vpddelimiterM={props.vpddelimiterM}
                vpddelimiterR={props.vpddelimiterR}
                codedelimiter={props.codedelimiter}
                setCodeDelimiter={props.setCodeDelimiter}
                setCode={props.setCode}
                code={props.code}
                />
            ) : (
                <>
                </>
            )}

            {modoCrearVPDistractores ? (
                <CrearVPDistractores
                vpddelimiterL={props.vpddelimiterL}
                vpddelimiterM={props.vpddelimiterM}
                vpddelimiterR={props.vpddelimiterR}
                setDisabledinput={props.setDisabledinput}
                setModoCrearVPDistractores={setModoCrearVPDistractores}
                initialOrderCodeFragmentsArray={initialOrderCodeFragmentsArray}
                setCode={props.setCode}
                codedelimiter={props.codedelimiter}
                />
            ) : (
                <>
                </>
            )}

            {modoUnirBloques || modoCrearVPDistractores ? (
                <>
                </>
            ) : (
                <div>
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={handleClickUnirBloques}>
                                Unir bloques
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="secondary" onClick={handleClickCrearVPDistractores}>
                                Crear VP Distractores
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        <div className="parsons sortable-column-left" id={"column0"}>
                        {codeFragmentsArray.map((element, index) => {
                            if (element.includes(props.vpddelimiterL)) { // If includes any part of vpd delimiter (except null)
                                const re = new RegExp(`(?<=\\${props.vpddelimiterL})(.*?)(?=\\${props.vpddelimiterR})`, "gs");
                                // Use regex and then split between middle character
                                try {
                                    var sortableChoices = element.match(re)[0].split(props.vpddelimiterM);
                                } catch (TypeError) {
                                    sortableChoices = ["Either remove or correct", "your choices of visually paired", "delimiters"];
                                }
                                return (
                                    <div className="parsons sortable-choice-parent" draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragEnter={(e) => handleDragEnter(e, index)}
                                        onDragEnd={handleDragEnd}
                                        onDragOver={(e) => handleDragOver(e, index)}
                                        key={index}
                                    >
                                        {sortableChoices.map((sortableChoice, sortablechoiceIndex) => {
                                            var auxClass = sortablechoiceIndex === 0 ? ("sortable-choice chosen-choice") : ("sortable-choice");
                                            return (
                                                <div className={auxClass}
                                                    key={index + "_" + sortablechoiceIndex}
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
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragEnter={(e) => handleDragEnter(e, index)}
                                        onDragEnd={handleDragEnd}
                                        onDragOver={(e) => handleDragOver(e, index)}
                                        key={index}
                                    >
                                        {element}
                                    </div>
                                )
                            }
                        })}
                        </div>
                    </Row>
                </div>
            )}

            <Modal show={showCodeDelimiterModal} onHide={handleCloseCodeDelimiterModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SingleLineForm id="idtest" label="Codedelimiter" placeholder="test placeholder" text="test text" setValue={setPreCodeDelimiter} value={preCodeDelimiter} defaultValue={props.codedelimiter} autoFocus={true} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCodeDelimiterModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveCodeDelimiterModal}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showVPDDelimiterModal} onHide={handleCloseVPDDelimiterModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SingleLineForm id="id_visuallypddl" label="VPD L" placeholder="vpdd delimiter L" text="vpdd text L" setValue={setPreVPDDelimiterL} value={preVPDDelimiterL} defaultValue={props.vpddelimiterL} autoFocus={true}/>
                    <SingleLineForm id="id_visuallypddm" label="VPD M" placeholder="vpdd delimiter M" text="vpdd text M" setValue={setPreVPDDelimiterM} value={preVPDDelimiterM} defaultValue={props.vpddelimiterM}/>
                    <SingleLineForm id="id_visuallypddr" label="VPD R" placeholder="vpdd delimiter R" text="vpdd text R" setValue={setPreVPDDelimiterR} value={preVPDDelimiterR} defaultValue={props.vpddelimiterR}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseVPDDelimiterModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveVPDDelimiterModal}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ParsonsProblem;