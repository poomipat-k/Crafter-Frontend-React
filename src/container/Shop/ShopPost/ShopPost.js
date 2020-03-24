import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import ImageSlide from "../../../components/UI/ImageSlide/ImageSlide";
import ErrorModal from "../../../components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../../components/UI/LodingSpinner/LoadingSpinner";
import Modal from "../../../components/UI/Modal/Modal";
import classes from "./ShopPost.module.css";
import Button from "../../../components/UI/Button/Button";

const DELETE_POST = "Delete Post";
const DELETE_IMAGE = "Delete Image";
const EDIT_POST = "Edit Post";

const ShopPost = () => {
  const postId = useParams().postId;
  const id = postId.split("-id.").slice(-1)[0];

  const [loadedPost, setLoadedPost] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    onCancel: () => setShowModal(false),
    className: null,
    style: null,
    headerClass: null,
    header: null,
    contentClass: null,
    contentBody: null,
    footerClass: null,
    footer: (
      <div>
        <Button onClick={() => setShowModal(false)} btnType="Cool">
          Cancel
        </Button>
        <Button btnType="Danger">Yes</Button>
      </div>
    )
  });

  const history = useHistory();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/shop/item/${id}`
        );
        setLoadedPost(responseData.post);
      } catch (err) {}
    };
    fetchPost();
  }, [sendRequest, id]);

  // Correct the url description in case it is modified by user and the post id is valid
  useEffect(() => {
    let path;
    if (loadedPost) {
      path = `/shop/${loadedPost.title}-id.${loadedPost.id}`.replace(
        /\s/g,
        "-"
      );
      if (path.split("/").slice(-1)[0] !== postId) {
        history.push(path);
      }
    }
  }, [loadedPost, history, postId]);

  const showModalHandler = event => {
    let modalType = event.target.textContent;
    switch (modalType) {
      case DELETE_POST:
        setModalConfig({
          ...modalConfig,
          headerClass: classes.ModalHeader,
          header: DELETE_POST,
          footer: (
            <div>
              <Button onClick={() => setShowModal(false)} btnType="Cool">
                Cancel
              </Button>
              <Button onClick={() => deletePostHandler(id)} btnType="Danger">
                Yes
              </Button>
            </div>
          ),
          contentBody: "Are you sure to delete this post?"
        });
        break;
      case DELETE_IMAGE:
        setModalConfig({
          ...modalConfig,
          headerClass: classes.ModalHeader,
          header: DELETE_IMAGE,
          contentBody: "Are you sure to delete this image?"
        });
        break;
      case EDIT_POST:
        break;
      default:
        return;
    }
    setShowModal(true);
  };

  const deletePostHandler = id => {
    const deletePostRequest = async () => {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/shop/${id}`,
          "DELETE"
        );
      } catch (err) {}
    };
    setShowModal(false);
    deletePostRequest();
    let redirectPath = `/shop`;
    if (loadedPost) {
      redirectPath = `/shop/${loadedPost.categoryUrl}`;
    }
    setLoadedPost(null);
    setTimeout(() => {
      history.replace(redirectPath);
    }, 300);
  };

  const deleteImageHandler = (id, image) => {
  };

  let postData = null;
  if (loadedPost) {
    postData = (
      <div style={{ textAlign: "center" }}>
        <ImageSlide images={loadedPost.Images} />

        <button className={classes.DeleteImageButton}>Edit Post</button>
        <button
          className={classes.DeleteImageButton}
          onClick={showModalHandler}
        >
          Delete Image
        </button>
        <button className={classes.DeletePostButton} onClick={showModalHandler}>
          Delete Post
        </button>

        <h1>{loadedPost.title}</h1>
        <h2>{loadedPost.description}</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <Modal
        show={showModal}
        onCancel={modalConfig.onCancel}
        className={modalConfig.className}
        style={modalConfig.style}
        headerClass={modalConfig.headerClass}
        header={modalConfig.header}
        contentClass={modalConfig.contentClass}
        footerClass={modalConfig.footerClass}
        footer={modalConfig.footer}
      >
        <p>{modalConfig.contentBody}</p>
      </Modal>

      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {postData}
    </React.Fragment>
  );
};

export default ShopPost;
