import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";

function PostCreateForm() {

    const [errors, setErrors] = useState({});
    
    const [postData, setPostData] = useState({
        title: "",
        catagory: "",
        content: "",
        image: "",
});


    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Choose a category</Form.Label>
                <Form.Control as="select" content="catagory">
                <option value="Choose a category">Select a category</option>
                <option value="Cakes">Cakes</option>
                <option value="Cookies">Cookies</option>
                <option value="Tarts">Tarts</option>
                <option value="Cupcakes">Cupcakes</option>
                <option value="Doughnuts">Doughnuts</option>
                <option value="Pies">Pies</option>
                <option value="Holidays">Holidays</option>
                <option value="Scones">Scones</option>
                <option value="Pastries">Pastries</option>
                <option value="Other">Other</option>
                </Form.Control>
                
                
            </Form.Group>

            <Form.Group>
                <Form.Label>Describe your creation</Form.Label>
                <Form.Control as="textarea" rows={6} name="content" />
            </Form.Group>

            



            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => { }}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                create
            </Button>
        </div>
    );

    return (
        <Form>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">

                            <Form.Label
                                className="d-flex justify-content-center"
                                htmlFor="image-upload"
                            >
                                <Asset src={Upload} message="To upload an image click here" />
                            </Form.Label>

                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PostCreateForm;