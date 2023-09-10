import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styles from "../../styles/LandingPage.module.css";
import btnStyles from "../../styles/Button.module.css";
import foodies from "../../assets/foodies.png";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";


const LandingPage = () => {
    return (
        <>
        <Container className="fluid">
        <Row className="text-center mt-5" lg={2} md={1}>
            <Col lg={6} sm={12}>
                <img
                    src={foodies}
                    className={styles.LandingImage}
                    alt="foodies logo with text"
                />
            </Col>
            <Col lg={6} sm={12}>
                <div className={`${styles.Text} text-center mt-3`}
                >
                    <h1 className="mb-3">Foodies</h1>
                    <h5 className="mb-3">A place where bakers from all walks of life come
                    together, to share their creations with the world. Post your creations,
                    support one another by liking and commenting on posts.
                    Get inspired and join us today. 
                    </h5>
                    <br></br>
                    <Link to="/signup">
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Bright} mx-3 mb-2 py-2`}
                        >
                            Sign up and get creative
                        </Button>
                    </Link>
                    <Link to="/Signin">
                        <Button className={`${btnStyles.Button} ${btnStyles.Bright} mb-2 py-2`}>
                        Have an account, sign in here
                        </Button>
                    </Link>
                </div>
            </Col>
        </Row>
    </Container>
</>
);
};

export default LandingPage;