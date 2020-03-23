import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";

import ErrorModal from "../../../components/UI/Modal/ErrorModal";
import LoadingSpinner from "../../../components/UI/LodingSpinner/LoadingSpinner";

const ShopPost = () => {
  const postId = useParams().postId;
  const id = postId.split("-id.").slice(-1)[0];

  const [loadedPost, setLoadedPost] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  console.log("Render");

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
        console.log("useEffect here");
        history.push(path);
      }
    }
  }, [loadedPost, history, postId]);

  let postData = null;
  if (loadedPost) {
    postData = (
      <div style={{ textAlign: "center" }}>
        
        <h1>{loadedPost.title}</h1>
        <h2>{loadedPost.description}</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
