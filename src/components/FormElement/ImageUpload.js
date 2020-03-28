import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = props => {
  const [files, setFiles] = useState();
  const [previewUrl, setPreviewUrl] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [activeImage, setActiveImage] = useState();
  const [index, setIndex] = useState([]);
  const { onUpdatedImageIndex } = props;

  const filePickerRef = useRef();
  const { value } = props;

  useEffect(() => {
    setFiles(value);
  }, [value]);

  useEffect(() => {
    onUpdatedImageIndex(index);
  }, [index, onUpdatedImageIndex]);

  useEffect(() => {
    if (!files) {
      return;
    }
    setPreviewUrl([]);

    for (let i = 0; i < files.length; i++) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(prevPreview => {
          return prevPreview.concat(fileReader.result);
        });
      };
      fileReader.readAsDataURL(files[i]);
    }

    setIndex([...Array(files.length).keys()]);
  }, [files]);

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length >= 1) {
      pickedFile = event.target.files;
      setFiles(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const imageClickHandler = event => {
    let clickedImg = event.target.src;
    let clickedIndex = previewUrl.findIndex(el => el === clickedImg);
    setActiveImage(clickedImg);

    if (clickedIndex === 0) {
      return;
    }
    setPreviewUrl(prevState => {
      let updatedState = [...prevState];
      [updatedState[clickedIndex], updatedState[clickedIndex - 1]] = [
        updatedState[clickedIndex - 1],
        updatedState[clickedIndex]
      ];
      return updatedState;
    });

    setIndex(prevState => {
      let updatedState = [...prevState];
      [updatedState[clickedIndex], updatedState[clickedIndex - 1]] = [
        updatedState[clickedIndex - 1],
        updatedState[clickedIndex]
      ];
      return updatedState;
    });
  };

  let previewElements = <p>Please upload image(s).</p>;
  if (previewUrl && previewUrl.length > 0) {
    previewElements = previewUrl.map(imgUrl => {
      return (
        <img
          className={imgUrl === activeImage ? "imageOnActive" : null}
          key={imgUrl.slice(-15)}
          draggable="true"
          src={imgUrl}
          alt="Preview"
          onClick={imageClickHandler}
        />
      );
    });
  }

  return (
    <div className="form-control">
      <input
        id={props.id}
        name={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
        multiple
      />

      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">{previewElements}</div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
