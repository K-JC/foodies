import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";


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
        postPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    return (
    <Card className={styles.Post}>
        <Card.Body>
            <Media className="align-items-center justify-content-between">
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image} height={55} />
                    {owner}
                </Link>
                <div className="d-flex align-items-center">
                    <span>{updated_at}</span>
                    {is_owner && postPage && "..."}
                </div>
            </Media>
        </Card.Body>
        <Link to={`/posts/${id}`}>
            <Card.Img src={image} alt="{title}" />
        </Link>
        <Card.Body>
            {title && <Card.Title className="text-center">{title}</Card.Title>}
            {content && <Card.Title>{content}</Card.Title>}
            <div className={styles.PostBar}>
                {is_owner ? (
                    <OverlayTrigger placement="top" overlay={<Tooltip>You can't like your own post!</Tooltip>}>
                        <i className="fa-solid fa-heart" />
                    </OverlayTrigger>
                ) : like_id ? (
                    <span onClick={() => { }}>
                        <i className={`fa-solid fa-heart  ${styles.Heart}`} />
                    </span>
                ) : currentUser ? (
                    <span onClick={() => { }}>
                        <i className={`fa-solid fa-heart ${styles.HeartOutline}`} />
                    </span>
                ) : (
                    <OverlayTrigger placement="top" overlay={<Tooltip>Please log in to like a post!</Tooltip>}>
                        <i className="fa-solid fa-heart" />
                    </OverlayTrigger>
                )}
                {likes_count}
                <Link to={`/posts/${id}`}>
                    <i className="fa-solid fa-comment" />
                </Link>
                {comment_count}
            </div>
        </Card.Body>
    </Card>
    );
};

export default Post;