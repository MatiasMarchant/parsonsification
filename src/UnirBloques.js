import Button from 'react-bootstrap/Button';
import { useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal'
import SingleLineForm from './SingleLineForm';
import { Col, Row } from 'react-bootstrap';

function UnirBloques(props) {

    const [codeCopy, setCodeCopy] = useState(props.initialOrderCodeFragmentsArray);

    const [showAddLineToVPDModal, setShowAddLineToVPDModal] = useState(false);
    const handleCloseAddLineToVPDModal = () => setShowAddLineToVPDModal(false);
    const handleShowAddLineToVPDModal = () => setShowAddLineToVPDModal(true);
    const [VPDnewLine, setVPDnewLine] = useState("");
    const vpdIndex = useRef(null);
    const vpdSortablechoiceIndex = useRef(null);

    // This function transforms the array codeCopy to string by joining the elements
    // by the code delimiter, it updates the code that was input by the user
    // and ends the code fragment merging mode
    function handleUnirBloques() {
        let auxCodeCopy = codeCopy.join(props.codedelimiter);
        props.setCode(auxCodeCopy);
        handleClickTerminarUnirBloques();
    }

    // This function re-enables the input boxes and ends the code fragment merging mode
    function handleClickTerminarUnirBloques() {
        props.setDisabledinput(false);
        props.setModoUnirBloques(false);
    }

    // This function merges two code fragments
    function handleClickMergeCodeFragments(index) {
        // Merge index with index+1
        const copycodeCopy = [...codeCopy];
        const tobeMergedContent = copycodeCopy[index];
        copycodeCopy.splice(index, 1);
        copycodeCopy[index] = tobeMergedContent + "\n" + copycodeCopy[index];
        setCodeCopy(copycodeCopy);
    }

    // This function triggers a Modal that asks the user to input a new text line
    // to add to a visually paired distractor choice
    function handleClickAddLineToVPD(e, index, sortablechoiceIndex) {
        handleShowAddLineToVPDModal();
        vpdIndex.current = index;
        vpdSortablechoiceIndex.current = sortablechoiceIndex;
        console.log(vpdIndex, vpdSortablechoiceIndex);
    }

    // This function adds a new text line to a visually paired distractor choice
    function handleAddLineToVPDModal() {
        var flag = false;
        const copycodeCopy = [...codeCopy];
        let tobeModified = copycodeCopy[vpdIndex.current].split(props.vpddelimiterM)[vpdSortablechoiceIndex.current];
        if(tobeModified.substring(tobeModified.length - props.vpddelimiterR.length, tobeModified.length) === props.vpddelimiterR) { // Es el último VPDistractor
            flag = true;
            tobeModified = tobeModified.slice(0, -props.vpddelimiterR.length);
            console.log(tobeModified);
        }
        tobeModified = tobeModified + "\n" + VPDnewLine;
        let newcodeFragment = "";
        copycodeCopy[vpdIndex.current].split(props.vpddelimiterM).forEach((choice, index) => {
            if(index === vpdSortablechoiceIndex.current) {
                newcodeFragment += tobeModified;
            } else {
                newcodeFragment += choice;
            }
            newcodeFragment += props.vpddelimiterM;
        });
        newcodeFragment = newcodeFragment.substring(0, newcodeFragment.length - props.vpddelimiterM.length);
        if(flag) {
            newcodeFragment += props.vpddelimiterR;
        }
        copycodeCopy.splice(vpdIndex.current, 1, newcodeFragment);
        setCodeCopy(copycodeCopy);
        setVPDnewLine("");
        vpdIndex.current = null;
        vpdSortablechoiceIndex.current = null;
        handleCloseAddLineToVPDModal();
    }

    return (
        <div>
            <Row className="mb-1">
                <Col className="d-grid">
                    <Button variant="danger" onClick={handleClickTerminarUnirBloques}>
                        Cancelar
                    </Button>
                </Col>
                <Col className="d-grid">
                    <Button variant="success" onClick={handleUnirBloques}>
                        Confirmar unión
                    </Button>
                </Col>
            </Row>
            <Row>
                <div className="parsons sortable-column-left" id={"column0"}>
                    {codeCopy.map((element, index) => {
                        if (element.includes(props.vpddelimiterL)) { // If includes any part of vpd delimiter (except null)
                            const re = new RegExp(`(?<=\\${props.vpddelimiterL})(.*?)(?=\\${props.vpddelimiterR})`, "gs");
                            // Use regex and then split between middle character
                            try {
                                var sortableChoices = element.match(re)[0].split(props.vpddelimiterM);
                            } catch (e) {
                                sortableChoices = ["Either remove or correct", "your choices of visually paired", "delimiters"];
                                console.log("Error", e.name);
                                console.log("Error", e.message);
                            }
                            return (
                                <div className="parsons sortable-choice-parent" key={index}>
                                    {sortableChoices.map((sortableChoice, sortablechoiceIndex) => {
                                        var auxClass = sortablechoiceIndex === 0 ? ("sortable-choice chosen-choice") : ("sortable-choice");
                                        return (
                                            <>
                                                <div className={auxClass} key={index + "_" + sortablechoiceIndex}>
                                                    {props.removeLeftSpaces(sortableChoice)}
                                                </div>
                                                <div className="d-grid m-1">
                                                    <Button variant='primary' size="sm" key={"new" + index + "_" + sortablechoiceIndex}
                                                        onClick={(e) => handleClickAddLineToVPD(e, index, sortablechoiceIndex)}>
                                                        Agregar línea de código
                                                    </Button>
                                                </div>

                                            </>
                                        )
                                    })}
                                </div>
                            )
                        } else {
                            return (
                                <div>
                                    <div className="parsons sortable-item" key={index}>
                                        {props.removeLeftSpaces(element)}
                                    </div>
                                    {index !== codeCopy.length - 1 && !codeCopy[index + 1].startsWith(props.vpddelimiterL) ? (
                                        <div className='d-grid m-1'>
                                            <Button variant='primary' size="sm" key={"new" + index}
                                                onClick={() => handleClickMergeCodeFragments(index)}
                                            >
                                                Unir
                                            </Button>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            )
                        }
                    })}
                </div>
            </Row>
            <Modal show={showAddLineToVPDModal} onHide={handleCloseAddLineToVPDModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SingleLineForm id="idtest" label="Line to add" placeholder="test placeholder" text="Line to add text" setValue={setVPDnewLine} value={VPDnewLine} defaultValue={""} autoFocus={true} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddLineToVPDModal}>Close</Button>
                    <Button variant="primary" onClick={handleAddLineToVPDModal}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UnirBloques;