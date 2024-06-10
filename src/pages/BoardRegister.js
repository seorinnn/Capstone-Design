import React, { useState, useRef } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import styles from "./BoardRegister.module.css";

const BoardRegister = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  
  const [boardInfo, setBoardInfo] = useState({
    title: "",
    category: "GENERAL",
    content: ""
  });

  //비구조화 할당으로 projectInfo가 바로 값을 분해해 변수에 할당함
  const { title, category, content } = boardInfo;

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져옴
    setBoardInfo({
      ...boardInfo,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const complete = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }

    formData.append(
      "json",
      new Blob([JSON.stringify(boardInfo)], { type: "application/json" })
    );

    try {
      const res = await axios.post(`/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("등록되었습니다.");
      console.log(boardInfo);
      navigate("/FreeBoard");
    } catch (error) {
      console.error("게시글 등록 중 오류가 발생했습니다.", error);
    }
  };

  const cancel = () => {
    if (window.confirm("작업을 그만 두시겠습니까?")) {
      navigate(`/FreeBoard`);
    }
  };

  return (
    <>
      <div className={styles.BoardRegister}>
        <h1 className={styles.header}>게시글 작성하기</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
      <h3>게시글 제목</h3>
          <input type="text" name="title" value={title} onChange={onChange} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <textarea
          name="content"
          cols="100"
          rows="50"
          value={content}
          onChange={onChange}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={complete} className={styles.btn}>
          확인
        </button>
        <button onClick={cancel} className={styles.btn}>
          취소
        </button>
      </div>
    </>
  );
};

export default BoardRegister;
