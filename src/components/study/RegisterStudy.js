import { useState, useRef } from "react";
import styles from "./RegisterStudy.module.css";
import defaultProjectImg from "../../assets/DefaultProjectImg.jpg";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";

function RegisterStudy() {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [defaultProjectImgSrc, setDefaultProjectImgSrc] =
    useState(defaultProjectImg);
  const [studyInfo, setStudyInfo] = useState({
    title: "",
    category: "STUDY",
    content: "",
    fieldList: [{ fieldCategory: "GENERAL", totalRecruitment: 0 }],
    imageUrl: "",
  });

  //비구조화 할당으로 studyInfo가 바로 값을 분해해 변수에 할당함
  const { title, category, content, fieldList } = studyInfo;

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져옴
    setStudyInfo({
      ...studyInfo,
      [name]: value,
    });
  };

  const handleFieldChange = (event) => {
    const { value } = event.target;
    setStudyInfo({
      ...studyInfo,
      fieldList: [
        { fieldCategory: "GENERAL", totalRecruitment: parseInt(value, 10) },
      ],
    });
  };

  //이미지 파일 변경 함수
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      setDefaultProjectImgSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  //게시글 등록 함수
  const postProject = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // studyInfo 객체를 Blob 형태로 변환하여 formData에 추가
    formData.append(
      "json",
      new Blob([JSON.stringify(studyInfo)], { type: "application/json" })
    );

    try {
      const res = await axios.post(`/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 서버로부터 이미지 URL을 받아서 studyInfo에 저장
      const updatedStudyInfo = {
        ...studyInfo,
        imageUrl: res.data.imageUrl, // 서버에서 반환된 이미지 URL을 저장
      };
      setStudyInfo(updatedStudyInfo);

      alert("등록되었습니다.");
      navigate("/StudyList");
    } catch (error) {
      console.error("프로젝트 등록 중 오류가 발생했습니다.", error);
    }
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
          <input
            type="file"
            onChange={handleImageChange}
            ref={fileInputRef}
          ></input>
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
