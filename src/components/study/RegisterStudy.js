import { useState } from "react";
import styles from "./RegisterStudy.module.css";
import defaultProjectImg from "../../assets/DefaultProjectImg.jpg";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";

function RegisterStudy() {
  const navigate = useNavigate();
  //프로젝트 배경이미지
  const [defaultProjectImgSrc, setDefaultProjectImgSrc] =
    useState(defaultProjectImg);

  const [projectInfo, setProjectInfo] = useState({
    title: "",
    category: "STUDY",
    content: "",
    fieldList: [{ fieldCategory: "GENERAL", totalRecruitment: 0 }],
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

  const handleFieldChange = (event) => {
    const { value } = event.target;
    setProjectInfo({
      ...projectInfo,
      fieldList: [
        { fieldCategory: "GENERAL", totalRecruitment: parseInt(value, 10) },
      ],
    });
  };

  const postProject = async () => {
    await axios.post(`/api/posts`, projectInfo).then((res) => {
      alert("등록되었습니다.");
      navigate("/StudyList");
    });
  };

  return (
    <>
      <div className={styles.RegisterProjectHeader}>
        <header>
          <h1>스터디 등록하기</h1>
        </header>
      </div>
      <main className={styles.RegisterProjectMain}>
        <div className={styles.projectImg}>
          <h3>배경사진 선택</h3>
          <img alt="profileImg" src={defaultProjectImgSrc} />
          <input type="file"></input>
        </div>
        <div className={styles.projectName}>
          <h3>스터디명</h3>
          <input type="text" name="title" value={title} onChange={onChange} />
        </div>
        <div className={styles.projectInfo}>
          <h3>스터디 소개 및 기간</h3>
          <textarea
            name="content"
            cols="30"
            rows="10"
            value={content}
            onChange={onChange}
          />
        </div>
        <div className={styles.recruitmentDiv}>
          <h3>모집 인원</h3>
          {fieldList.map((field, index) => (
            <div key={index}>
              <input
                type="number"
                name="totalRecruitment"
                value={field.totalRecruitment}
                onChange={handleFieldChange}
              />
            </div>
          ))}
        </div>
        <div className={styles.etc}>
          <h3>기타 참고사항</h3>
        </div>
        <div className={styles.buttons}>
          <button onClick={postProject}>등록하기</button>
        </div>
      </main>
    </>
  );
}

export default RegisterStudy;
