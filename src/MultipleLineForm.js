import Form from 'react-bootstrap/Form';

function MultipleLineForm(props) {

    const handleChange = (e) => {
        props.setValue(e.target.value);
    }

    return (
        <Form.Group controlId={props.id} className="mb-3">
            <Form.Label as="h5">{props.label}</Form.Label>
            <Form.Control as="textarea" rows={props.rows} placeholder={props.placeholder} onChange={handleChange} value={props.value} />
            <Form.Text>
                {props.text}
            </Form.Text>
        </Form.Group>
    );
}

export default MultipleLineForm;