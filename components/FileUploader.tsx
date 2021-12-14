import { Dispatch, SetStateAction, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styles from "../styles/FileUploader.module.css";

type Props = {
  setPendingUpload: Dispatch<SetStateAction<File | undefined>>;
  pendingUpload?: File;
};

const FileUploader: React.FC<Props> = ({ setPendingUpload, pendingUpload }) => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      maxFiles: 1,
      maxSize: 20000000,
      accept: "model/stl",
      disabled: pendingUpload !== undefined,
    });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setPendingUpload(acceptedFiles[acceptedFiles.length - 1]);
    }
  }, [acceptedFiles.length]);

  return (
    <div {...getRootProps()} className={styles.container}>
      <input {...getInputProps()} />
      {pendingUpload ? (
        <div className={styles.inProgress}>
          <p>Confirm details on the left</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPendingUpload(undefined);
            }}
          >
            Cancel
          </button>
        </div>
      ) : isDragActive ? (
        <p>Upload...</p>
      ) : (
        <p>Drag STL asset here or click to upload</p>
      )}
    </div>
  );
};

export default FileUploader;
