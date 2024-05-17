import React from "react";
import axios from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./UpdateProject.module.css";

const UpdateProject = () => {
  const navigate = useNavigate();
  const { idx } = useParams();

  //게시글 데이터 가져오기
  const getProject = async () => {
    const response = await axios.get(`/api/posts/${idx}`);
    setProjectInfo(response.data);
  };

  useEffect(() => {
    getProject();
  }, []);

  const [projectInfo, setProjectInfo] = useState({
    title: "",
    category: "PROJECT",
    content: "",
    fieldList: [],
  });

  //비구조화 할당으로 projectInfo가 바로 값을 분해해 변수에 할당함
  const { title, category, content, fieldList } = projectInfo;

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져옴
    setProjectInfo({
      ...projectInfo,
      [name]: value,
    });
  };

  const handleFieldListChange = (index, event) => {
    const { name, value } = event.target;
    const newFieldList = [...fieldList];
    // 숫자로 변환해야 하는 필드인 경우 parseInt를 사용하여 숫자로 변환
    newFieldList[index][name] =
      name === "totalRecruitment" ? parseInt(value, 10) : value;
    setProjectInfo({
      ...projectInfo,
      fieldList: newFieldList,
    });
  };

  const addField = () => {
    setProjectInfo({
      ...projectInfo,
      fieldList: [...fieldList, { fieldCategory: "", totalRecruitment: 0 }],
    });
  };

  const updateProject = async () => {
    await axios.patch(`/api/posts/${idx}`, projectInfo).then((res) => {
      alert("수정되었습니다.");
      navigate(`/ProjectInformation/${idx}`);
    });
  };

  const cancel = async () => {
    navigate("/ProjectList");
  };

  return (
    <>
      <div className={styles.RegisterProjectHeader}>
        <header>
          <h1>프로젝트 수정하기</h1>
        </header>
      </div>
      <main className={styles.RegisterProjectMain}>
        <div className={styles.projectImg}>
          <h3>배경사진 선택</h3>
          <input type="file"></input>
        </div>
        <div className={styles.projectName}>
          <h3>프로젝트명</h3>
          <input type="text" name="title" value={title} onChange={onChange} />
        </div>
        <div className={styles.projectInfo}>
          <h3>프로젝트 소개 및 기간</h3>
          <textarea
            name="content"
            cols="30"
            rows="10"
            value={content}
            onChange={onChange}
          />
        </div>
        <div className={styles.recruitmentDiv}>
          <h3>모집 직무</h3>
          {fieldList.map((field, index) => (
            <div key={index}>
              <input
                type="text"
                name="fieldCategory"
                value={field.fieldCategory}
                onChange={(event) => handleFieldListChange(index, event)}
              />
              <input
                type="number"
                name="totalRecruitment"
                value={field.totalRecruitment}
                onChange={(event) => handleFieldListChange(index, event)}
              />
            </div>
          ))}
          <button onClick={addField}>직무 추가</button>
        </div>
        <div className={styles.language}>
          <h3>사용 기술 및 언어</h3>
        </div>
        <div className={styles.etc}>
          <h3>기타 참고사항</h3>
        </div>
        <div>
          <button onClick={updateProject} className={styles.btn}>
            수정
          </button>
          <button onClick={cancel} className={styles.btn}>
            삭제
          </button>
        </div>
      </main>
    </>
  );
};

export default UpdateProject;
