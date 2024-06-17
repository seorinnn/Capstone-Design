import React, { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import { useNavigate } from 'react-router-dom';
import './AppliesList.css';

const AppliesList = () => {
  const [groupedApplies, setGroupedApplies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplies = async () => {
      try {
        const response = await axios.get('/api/applies');
        // 데이터를 최신 순으로 정렬
        const sortedApplies = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // 그룹화된 지원서 객체 생성
        const grouped = sortedApplies.reduce((acc, apply) => {
          const { postTitle } = apply;
          if (!acc[postTitle]) {
            acc[postTitle] = [];
          }
          acc[postTitle].push(apply);
          return acc;
        }, {});

        setGroupedApplies(grouped);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching applies:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchApplies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="applies-list-container">
      <h1>지원서 목록</h1>
      {Object.keys(groupedApplies).map(postTitle => (
        <div key={postTitle} className="post-section">
          <h2>{postTitle}에 대한 지원서입니다</h2>
          <ul>
            {groupedApplies[postTitle].map(apply => (
              <li 
                key={apply.id} 
                onClick={() => navigate(`/appliesList/${apply.id}`)} // 클릭 시 상세 페이지로 이동
                className="apply-item"
              >
                <p><strong>지원자:</strong> {apply.memberName}</p>
                <p><strong>지원분야:</strong> {apply.fieldCategory}</p>
                <p><strong>지원시간:</strong> {new Date(apply.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AppliesList;
