import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Post from "./Post";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/not-found.png";
import Asset from "../../components/Asset";

/**
 * Renders the post page 
 * Shows all the unfiltered posts first
 * Liked Page will show posts logged user has liked
 * Feed Page will show posts logged user follows
 */

function PostsPage({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    /**
    * Gets posts from the API.
    * Based on the search keywords,
    * results will show.
    */

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
                setPosts(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        }
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPosts();   
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Popular profiles mobile</p>
                <i className={`fa-solid fa-magnifying-glass ${styles.SearchIcon}`} />
                <Form className={styles.SearchBar}
                onSubmit={(event) => event.preventDefault()} >
                    <Form.Control 
                    type="text" 
                    className="mr-sm-2"
                    placeholder="Search posts"
                    value={query}
                    onChange={(event => setQuery(event.target.value))}
                    />
                </Form>
                
                {hasLoaded ? (
                    <>
                        {posts.results.length ? (
                            posts.results.map((post) => (
                                <Post key={post.id} {...post} setPosts={setPosts} />
                            ))
                        ) : (
                        <Container className={appStyles.Content}>
                            <Asset src={NoResults} message={message} />
                        </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}

            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <p>Popular profiles for desktop</p>
            </Col>
        </Row>
    );
}

export default PostsPage;