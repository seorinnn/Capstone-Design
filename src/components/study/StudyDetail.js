import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../lib/axios";
import Study from "../../pages/study/Study";

function StudyDetail() {
  const [study, setStudy] = useState({});
  const { idx } = useParams();

  const getStudy = async () => {
    const response = await axios.get(`/api/posts/${idx}`);
    setStudy(response.data);
  };

  useEffect(() => {
    getStudy();
  }, []);

  return (
    <div>
      <Study title={study.title} content={study.content} />
    </div>
  );
}

export default StudyDetail;
