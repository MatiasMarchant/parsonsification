import Button from "react-bootstrap/Button";
import { useState } from 'react';
import { Col, Row } from "react-bootstrap";

function CrearVPDistractores(props) {

    const [codeCopy, setCodeCopy] = useState(props.initialOrderCodeFragmentsArray);

    // This function transforms the array codeCopy to string by joining the elements
    // by the code delimiter, it updates the code that was input by the user
    // and ends the visually paired distractors creation mode
    function handleConfirmarNuevosVPDistractores() {
        let auxCodeCopy = codeCopy.join(props.codedelimiter);
        props.setCode(auxCodeCopy);
        handleClickTerminarCrearVPDistractores();
    }

    // This function re-enables the input boxes and ends the visually paired distractors creation mode
    function handleClickTerminarCrearVPDistractores() {
        props.setDisabledinput(false);
        props.setModoCrearVPDistractores(false);
    }

    // This function changes the code fragment from an usual one
    // to a visually paired distractor one
    function handleClickCrearVPDistractor(e, index) {
        const copycodeCopy = [...codeCopy];
        let tobeModified = copycodeCopy[index];
        tobeModified = props.vpddelimiterL + tobeModified + props.vpddelimiterM + "Modifica acá " + index + props.vpddelimiterR;
        copycodeCopy.splice(index, 1, tobeModified);
        setCodeCopy(copycodeCopy);
    }

    return (
        <div>
            <Row className="mb-1">
                <Col className="d-grid">
                    <Button variant="danger" onClick={handleClickTerminarCrearVPDistractores}>
                            Cancelar
                    </Button>
                </Col>
                <Col className="d-grid">
                    <Button variant="success" onClick={handleConfirmarNuevosVPDistractores}>
                        Confirmar nuevos VPD
                    </Button>
                </Col>
            </Row>
            <Row>
                <div className="parsons sortable-column-left" id={"column0VPDistractores"}>
                    {codeCopy.map((element, index) => {
                        if(element.includes(props.vpddelimiterL)) {
                            const re = new RegExp(`(?<=\\${props.vpddelimiterL})(.*?)(?=\\${props.vpddelimiterR})`, "gs");
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
                                            <div className={auxClass} key={index + "_" + sortablechoiceIndex}>
                                                {props.removeLeftSpaces(sortableChoice)}
                                            </div>
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
                                    <div className="d-grid m-1">
                                        <Button variant='primary' size="sm" key={"new" + index}
                                            onClick={(e) => handleClickCrearVPDistractor(e, index)}
                                        >
                                            Crear VPD
                                        </Button>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </Row>
        </div>
    );
}

export default CrearVPDistractores;