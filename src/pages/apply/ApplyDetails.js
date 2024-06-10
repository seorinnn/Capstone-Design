import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ApplyDetails.css";

const ApplyDetails = () => {
  const { applyId } = useParams();
  const navigate = useNavigate();
  const [apply, setApply] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApply = async () => {
      try {
        const response = await axios.get(`/api/applies/${applyId}`);
        setApply(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching apply details:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchApply();
  }, [applyId]);

  const updateApplyStatus = async (status) => {
    try {
      const response = await axios.post(`/api/applies/${applyId}`, {
        applyStatus: status,
      });
      alert(response.data.message);
      setApply({ ...apply, applyStatus: status });
    } catch (err) {
      console.error("Error updating apply status:", err);
      alert("Failed to update apply status");
    }
  };

  const startConversation = async () => {
    try {
      const response = await axios.post("/api/messages/conversation", {
        postId: apply.postId,
        receiverId: apply.memberId,
      });
      navigate(`/conversation/${response.data.id}`);
    } catch (err) {
      console.error("Failed to start conversation:", err);
      alert("Failed to start conversation");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="apply-details-container">
      <h1>지원 상세</h1>
      <div className="apply-details">
        <p>
          <strong>지원 분야:</strong> {apply.fieldCategory}
        </p>
        <p>
          <strong>내용:</strong> {apply.content}
        </p>
        <p>
          <strong>상태:</strong> {apply.applyStatus}
        </p>
        <div className="button-group">
          <button onClick={() => updateApplyStatus("ACCEPT")}>지원 수락</button>
          <button onClick={() => updateApplyStatus("REJECT")}>지원 반려</button>
          <button onClick={startConversation}>지원자와 채팅</button>{" "}
          {/* New button */}
        </div>
      </div>
    </div>
  );
};

export default ApplyDetails;
