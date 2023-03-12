import Button from "react-bootstrap/Button";
import { useState } from 'react';

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
        tobeModified = props.vpddelimiterL + tobeModified + props.vpddelimiterM + "Modify here " + index + props.vpddelimiterR;
        copycodeCopy.splice(index, 1, tobeModified);
        setCodeCopy(copycodeCopy);
    }

    return (
        <div className="parsons sortable-container" id={"sortable-container-VPDistractores"}>
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
                                            {sortableChoice}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <div className="parsons sortable-item" key={index}>
                                    {element}
                                </div>
                                <Button variant='success' key={"new" + index}
                                    onClick={(e) => handleClickCrearVPDistractor(e, index)}
                                >
                                    +
                                </Button>
                            </div>
                        )
                    }
                })}
            </div>
            <Button variant="primary" onClick={handleClickTerminarCrearVPDistractores}>
                Cancelar
            </Button>
            <Button variant="primary" onClick={handleConfirmarNuevosVPDistractores}>
                Confirmar Nuevos VPDistractores
            </Button>
        </div>
    );
}

export default CrearVPDistractores;