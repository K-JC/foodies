import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";
import { OverlayTrigger, Tooltip } from "react-bootstrap";


const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
    like_comments_id,
    like_comments_count,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [showEditForm, setShowEditForm] = useState(false);

  

  /**
   * Edit or delete logged users own comment
   * delete a comment will remove a comment count
   * from total comment count
   * No post owner can like their own posts/comments
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost(prevPost => ({
        results: [{
          ...prevPost.results[0],
          comments_count: prevPost.results[0].comments_count - 1,
        },
        ],
      }));
      setComments(prevComments => ({
        ...prevComments,
        results: prevComments.results.filter(comment => comment.id !== id),

      }));
    } catch (err) {
    }
  };

  /**
   * Like a comment made by another user
   * Unable to like own comment
   * Increase number of likes by 1
   *Sends request to foodies api
   */
  
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("like_comments/ ", { comment: id });
     // console.log("data", data);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
              ...comment,
              comment_like_count
                : comment.like_comments_count
                + 1,
                like_comments_id
                : data.id,
            }
            : comment;

        }),
      }));
    //  console.log("Comments likes count", comment_like_count);
    } catch (err) {
     // console.log(err);
    }
  };

 /**
   * Unlike a comment made by another user
   * Decrease number of likes by 1
   *Sends request to foodies api
   */
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/like_comments/${like_comments_id}`);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
              ...comment,
              like_comments_count: comment.like_comments_count
                - 1,
                like_comments_id

                : null,
            }
            : comment;
        }),
      }));
    } catch (err) {
     // console.log(err);
    }
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <div className={"text-right"}>
            {is_owner ? (
              <OverlayTrigger placement="top" overlay={<Tooltip>You can't like your own comment!</Tooltip>}>
                <i className="fa-solid fa-heart" />
              </OverlayTrigger>
            ) : like_comments_id
            ? (
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
            {like_comments_count}
          </div>

          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete} />
        )}
      </Media>
    </>
  );
};

export default Comment;