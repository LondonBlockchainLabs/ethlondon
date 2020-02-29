import React,{Component} from 'react';
import {Row, Col, Form, Button}from 'react-bootstrap';
import FileUploader from './FileUploader'

export default class Register extends Component {



    render() {
        return (
            <Row>
                <Col md={8}>
                    {/* RegisterMap */}
                    my map
                </Col>
            <Col md={4}>
                <Form>
                    <FileUploader />
                                        
                    <Form.Group controlId="zoneName">
                        <Form.Label>
                            Zone Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter your zone name here" />
                        <Form.Text className="text-muted">
                        Name your zone to be registered
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="address">
                        <Form.Label>
                            Ethereum Wallet Address
                        </Form.Label>
                        <Form.Control plaintext readOnly defaultValue={this.props.addr} />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
        );
    }


}