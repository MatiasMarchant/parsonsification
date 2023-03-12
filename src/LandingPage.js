import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleLineForm from './SingleLineForm';
import MultipleLineForm from './MultipleLineForm';
import ParsonsProblem from './ParsonsProblem';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function LandingPage() {

    let ParsonsProblemId = "id_parsons_problem";

    const [codedelimiter, setCodedelimiter] = useState("\n");
    const [vpddelimiterL, setVPDdelimiterL] = useState(null);
    const [vpddelimiterM, setVPDdelimiterM] = useState(null);
    const [vpddelimiterR, setVPDdelimiterR] = useState(null);
    const [code, setCode] = useState("");
    const [disabledinput, setDisabledinput] = useState(false);

    return (
        <Container>
            <Form>
                <fieldset disabled={disabledinput}>
                    <SingleLineForm id="idtest" label="Codedelimiter" placeholder="test placeholder" text="test text" setValue={setCodedelimiter} defaultValue={"\n"} value={codedelimiter}/>
                    <Row>
                        <Col><SingleLineForm id="id_visuallypddl" label="VPD L" placeholder="vpdd delimiter L" text="vpdd text L" setValue={setVPDdelimiterL} defaultValue={null} value={vpddelimiterL}/></Col>
                        <Col><SingleLineForm id="id_visuallypddm" label="VPD M" placeholder="vpdd delimiter M" text="vpdd text M" setValue={setVPDdelimiterM} defaultValue={null} value={vpddelimiterM}/></Col>
                        <Col><SingleLineForm id="id_visuallypddr" label="VPD R" placeholder="vpdd delimiter R" text="vpdd text R" setValue={setVPDdelimiterR} defaultValue={null} value={vpddelimiterR}/></Col>
                    </Row>
                    <MultipleLineForm id="id_code" label="Code" rows="7" placeholder="code placeholder" text="code text" setValue={setCode} value={code}/>
                </fieldset>

            </Form>
            <ParsonsProblem
                id={ParsonsProblemId}
                codedelimiter={codedelimiter}
                setCodedelimiter={setCodedelimiter}
                vpddelimiterL={vpddelimiterL}
                vpddelimiterM={vpddelimiterM}
                vpddelimiterR={vpddelimiterR}
                setVPDdelimiterL={setVPDdelimiterL}
                setVPDdelimiterM={setVPDdelimiterM}
                setVPDdelimiterR={setVPDdelimiterR}
                setCode={setCode}
                code={code}
                setDisabledinput={setDisabledinput}
            />
        </Container>
    );
}

export default LandingPage;