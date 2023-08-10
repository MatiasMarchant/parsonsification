import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleLineForm from './SingleLineForm';
import MultipleLineForm from './MultipleLineForm';
import ParsonsProblem from './ParsonsProblem';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Card } from 'react-bootstrap';

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
                    <Row className="mt-3 mb-3">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Card>
                                <Card.Body>
                                    <MultipleLineForm id="id_code" label="Ingresa acá tu código" rows="6" placeholder="Código" text={null} setValue={setCode} value={code}/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-3 mb-3">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Card>
                                <Card.Header className='text-center' as='h6'>Ingresa delimitadores</Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}><SingleLineForm id="idtest" label="Codedelimiter" placeholder="Opcional" text="También puedes presionar 'Unir bloques'" setValue={setCodedelimiter} defaultValue={"\n"} value={codedelimiter}/></Col>
                                        <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}><SingleLineForm id="id_visuallypddl" label="VPD Izquierda" placeholder="Opcional" text="También puedes presionar 'Crear VP Distractores'" setValue={setVPDdelimiterL} defaultValue={null} value={vpddelimiterL}/></Col>
                                        <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}><SingleLineForm id="id_visuallypddm" label="VPD Medio" placeholder="Opcional" text={null} setValue={setVPDdelimiterM} defaultValue={null} value={vpddelimiterM}/></Col>
                                        <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}><SingleLineForm id="id_visuallypddr" label="VPD Derecha" placeholder="Opcional" text={null} setValue={setVPDdelimiterR} defaultValue={null} value={vpddelimiterR}/></Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </fieldset>

            </Form>
            <Row className="mt-2 mb-3">
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
            </Row>
        </Container>
    );
}

export default LandingPage;