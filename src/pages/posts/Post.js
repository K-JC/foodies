import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card } from "react-bootstrap";


const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comment_count,
        likes_count,
        like_id,
        ///  like_comments,
        title,
        content,
        category,
        image,
        updated_at,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return <Card className={styles.Post}>
        <Card.Body>
            <Media className="align-items-center justify-content-between">
                <Link to={`/profiles/${profile_id}`}>

                </Link>
            </Media>
        </Card.Body>
    </Card>

};

export default Post;