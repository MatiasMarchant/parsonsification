import Form from 'react-bootstrap/Form';

function SingleLineForm(props) {

    const handleChange = (e) => {
        props.setValue(e.target.value);
        if (e.target.value === "") {
            props.setValue(props.defaultValue);
        }
    }

    return (
        <Form.Group controlId={props.id} className="mb-3">
            <Form.Label>{props.label}</Form.Label>
            <Form.Control placeholder={props.placeholder} onChange={handleChange} />
            <Form.Text>
                {props.text}
            </Form.Text>
        </Form.Group>
    );
}

export default SingleLineForm;