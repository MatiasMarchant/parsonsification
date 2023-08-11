import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleLineForm from './SingleLineForm';
import MultipleLineForm from './MultipleLineForm';
import ParsonsProblem from './ParsonsProblem';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';

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
            <Card className="mt-3">
                <Card.Header as="h1">Parsonsificator</Card.Header>
                <Card.Body>
                    El Parsonsificator se creó con el objetivo de facilitar la creación de problemas de Parsons en Moodle usando el plugin <a href='https://github.com/MatiasMarchant/parsonsproblem' rel='noreferrer'>qtype_parsonsproblem</a> debido a su complicada sintaxis para unir bloques o crear distractores pareados.
                    <br/>
                    <br/>
                    Para comenzar, los pasos recomendados a seguir son los siguientes:
                    <ol>
                        <li>Copiar y pegar tu código en el formulario "Ingresa acá tu código".</li>
                        <li>Automáticamente se generará cómo se vería tu problema de Parsons con bloques separados por saltos de línea.</li>
                    </ol>
                    <Accordion>
                        <Accordion.Item eventKey='0'>
                            <Accordion.Header>Instrucciones si deseas unir bloques de código:</Accordion.Header>
                            <Accordion.Body>
                                <ol start={3}>
                                    <li>Si deseas unir bloques de código presiona el botón "Unir bloques", se abrirá una nueva ventana donde deberás definir un delimitador de código, se recomienda usar caracteres que no se encuentren en tu código. Presiona el botón "Guardar".</li>
                                    <li>El código que pegaste en el paso 1. se modificará automáticamente para adaptarse a este nuevo delimitador de código</li>
                                    <li>Entrarás en modo de unión de bloques, por lo que entre bloques de la visualización de tu problema de Parsons se agregarán botones "Unir". Si quieres unir dos bloques debes presionar el botón "Unir" que se encuentra entre ambos bloques.</li>
                                    <li>Cuando termines, para confirmar la unión de bloques presiona "Confirmar unión", si te arrepientes puedes presionar "Cancelar" y no se harán las uniones.</li>
                                    <li>Si confirmaste la unión de bloques nuevamente verás que el código que pegaste en el paso 1. se modificará para adaptarse a la unión de bloques.</li>
                                </ol>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey='1'>
                            <Accordion.Header>Instrucciones si deseas crear bloques pareados de código:</Accordion.Header>
                            <Accordion.Body>
                                    <ol start={3}>
                                        <li>Si deseas crear bloques pareados de código presiona el botón "Transformar bloque a VPD", se abrirá una nueva ventana donde deberás definir tres delimitadores de bloques pareados, se recomienda usar caracteres que no se encuentren en tu código. Presiona el botón "Guardar".</li>
                                        <li>Entrarás en modo de creación de bloques pareados, por lo que entre bloques de la visualización de tu problema de Parsons se agregarán botones "Crear VPD". Si quieres transformar un bloque de código a bloque de código pareado debes presionar el botón "Crear VPD" que se encuentra bajo el bloque.</li>
                                        <li>Presionar el botón "Crear VPD" transformará el bloque de código a bloque de código pareado con un nuevo bloque llamado "Modifica acá (número)"</li>
                                        <li>Cuando termines, para confirmar la creación de bloques presiona "Confirmar nuevos VPD", si te arrepientes puedes presionar "Cancelar" y no se harán los nuevos bloques pareados.</li>
                                        <li>Si confirmaste la creación de bloques pareados verás que el código que pegaste en el paso 1. se modificará para adaptarse a la creación de bloques pareados.</li>
                                        <li>Para cambiar los bloques "Modifica acá (número)" puedes buscarlos en la ventana donde se ingresa el código y modificarlo, el problema de Parsons cambiará automáticamente.</li>
                                    </ol>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
            </Card>
            <Row>
                <Col>

                    <ol>



                    </ol>
                </Col>
            </Row>
            <Form>
                <fieldset disabled={disabledinput}>
                    <Row className="mb-3">
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Card>
                                <Card.Body>
                                    <MultipleLineForm id="id_code" label="Ingresa acá tu código" rows="6" placeholder="Código" text={null} setValue={setCode} value={code}/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mb-3">
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
            <Row className="mb-3">
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