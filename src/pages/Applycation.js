import React, { useState, useEffect } from "react";
import axios from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Applycation.module.css";

const Applycation = () => {
  const navigate = useNavigate();
  const { idx } = useParams();
  const [applyInfo, setApplyInfo] = useState({
    category: "PROJECT",
    content: "",
    fieldCategory: ""
  });
  const [projectInfo, setProjectInfo] = useState({
    title: "",
    fieldList: []
  });

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(`/api/posts/${idx}`);
        setProjectInfo(response.data);
        // Extracting field category from the fetched project information
        const fieldCategory = response.data.fieldList.map(field => field.fieldCategory).join(", ");
        setApplyInfo(prevState => ({
          ...prevState,
          fieldCategory
        }));
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    getProject();
  }, [idx]);

  const { category, content, fieldCategory } = applyInfo;
  const { title } = projectInfo;

  const onChange = event => {
    const { value, name } = event.target;
    setApplyInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const cancel = () => {
    if (window.confirm("작업을 그만 두시겠습니까?")) {
      navigate(`/ProjectInformation/${idx}`);
    }
  };

  const complete = async () => {
    if (window.confirm("지원서를 보내시겠습니까?")) {
      try {
        await axios.post(`/api/applies/apply/${idx}`, applyInfo);
        alert("전송되었습니다.");
        navigate(`/ProjectInformation/${idx}`);
      } catch (error) {
        console.error("Error submitting application:", error);
      }
    }
  };

  return (
    <>
      <div className={styles.Applycation}>
        <h1 className={styles.header}>지원서 작성하기</h1>
      </div>
      <div>
        <h2>제목 : {title}</h2>
        <h2>카테고리 : {category}</h2>
        <h2>지원 : {fieldCategory}</h2>
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

export default Applycation;
