import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import SingleLineForm from './SingleLineForm';
import Form from 'react-bootstrap/Form';
import MultipleLineForm from './MultipleLineForm';
import ParsonsProblem from './ParsonsProblem';
import { useState } from 'react';

function LandingPage() {

    let ParsonsProblemId = "id_parsons_problem";
    let MoodleCodeId = "id_moodle_code";

    const [codedelimiter, setCodedelimiter] = useState("\n"); // NewLine debería ser
    const [vpddelimiter, setVPDdelimiter] = useState(null);
    const [code, setCode] = useState("");
    const [moodlecode, setMoodlecode] = useState("");

    return (
        <Container>
            <Form>
                <SingleLineForm id="idtest" label="Codedelimiter" placeholder="test placeholder" text="test text" setValue={setCodedelimiter} defaultValue={"\n"} />
                {/* Quizás ayudaría agregar backlash r también */}
                <SingleLineForm id="id_visuallypdd" label="Visually paired distractors delimiter" placeholder="vpdd delimiter" text="vpdd text" setValue={setVPDdelimiter} defaultValue={""}/>
                <MultipleLineForm id="id_code" label="Code" rows="7" placeholder="code placeholder" text="code text" setValue={setCode}/>
                <MultipleLineForm id={MoodleCodeId} label="Moodle code" rows="7" placeholder="moodle code placeholder" text="moodle code text" setValue={setMoodlecode}/>
            </Form>
            <ParsonsProblem
                id={ParsonsProblemId}
                codedelimiter={codedelimiter}
                vpddelimiter={vpddelimiter}
                code={code}
                moodlecode={moodlecode}
            />
        </Container>
    );
}

export default LandingPage;