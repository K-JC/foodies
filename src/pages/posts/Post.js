import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";


const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        image,
        updated_at,
        postPage,
        setPosts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

   /**
   * Edit or delete logged users 
   * own post.
   */

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`);
      };
    
      const handleDelete = async () => {
        try {
          await axiosRes.delete(`/posts/${id}/`);
          history.goBack();
        } catch (err) {
         // console.log(err);
        }
      };

   /**
   * Like a post/post owner cannot like 
   * their own post. Sends a request to the API
   * Increases likes number by 1
   */
    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { post: id} );
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                    ? {...post, likes_count: post.likes_count + 1, like_id: data.id }
                    : post;
                }),
            }));
        } catch(err) {
          //  console.log(err);
        }
    };

   /**
   * Unlike a post
   * Sends a request to the API
   * Decreases likes number by 1
   */
    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id
                    ? {...post, likes_count: post.likes_count -1, like_id: null}
                    : post;
                }),
            }));
        } catch(err) {
          //  console.log(err);
        }
    };

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
            {is_owner && postPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
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
                    <span onClick={handleUnlike}>
                        <i className={`fa-solid fa-heart  ${styles.Heart}`} />
                    </span>
                ) : currentUser ? (
                    <span onClick={handleLike}>
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
                {comments_count}
            </div>
        </Card.Body>
    </Card>
    );
};

export default Post;