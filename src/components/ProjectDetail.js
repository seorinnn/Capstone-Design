import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import Project from "../pages/Project";

function ProjectDetail() {
  const [project, setProject] = useState({});
  const { idx } = useParams();

  //게시글 정보 가져오기
  const getProject = async () => {
    try {
      const response = await axios.get(`/api/posts/${idx}`);
      console.log(response.data);
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  console.log(project.image);

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div>
      <Project
        title={project.title}
        content={project.content}
        fieldList={project.fieldList}
        imageUrl={project.image} // 이미지 URL 추가
      />
    </div>
  );
}

export default ProjectDetail;
