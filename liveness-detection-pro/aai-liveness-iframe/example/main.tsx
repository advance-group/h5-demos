import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import AAILivenessIframe from '../src/AAILivenessIframe';

const Demo = () => {
  const [status, setStatus] = useState('initial'); // 初始状态
  const iframeRef = useRef(null);

  const handleSuccess = () => {
    console.log('Liveness check succeeded');
    setStatus('success');
    iframeRef.current.destroy();
  };

  const handleFail = () => {
    console.log('Liveness check failed');
    setStatus('fail');
    iframeRef.current.destroy();
  };

  return (
    <>
      {status !== 'initial' && <div className={`status-message ${status}`}>
        <span>current liveness status: </span>
        {status === 'success' && (
          <span>Liveness check succeeded.</span>
        )}
        {status === 'fail' && (
          <span>Liveness check failed.</span>
        )}
      </div>
      }
      {status === 'initial' && (
        <AAILivenessIframe url="https://k8s-liveness.advai.net/index?biz_token=eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoNV9saXZlbmVzcyIsInN1YiI6IntcImN1c3RvbWVySWRcIjozMTUwMjk4LFwiYWNjb3VudElkXCI6NDUyMDg1MTMsXCJfdGltZXN0YW1wXCI6MTcyNzMzNTQ1MTQ0MixcIl91dWlkXCI6XCJjM2FiODk0NDViZWQ0YzU0OGY5OTY0NDJkNWQ4MTUwNVwifSIsImF1ZCI6IldFQiIsImlhdCI6MTcyNzMzNTQ1MSwiZXhwIjoxNzI3MzM5MDUxfQ.s78f3ewLDmubPBQTJB3uADVDylV_lXKorKnoI1Utml1S0qlPb_tehQj3WNwgeT6pUCwpixSu4ZZKXBBYrkRHPQ&tag=07033e7c6805e2c3f78c1bb42f81f80b"
          ref={iframeRef} onSuccess={handleSuccess} onFail={handleFail} />
      )}
    </>
  );
};

ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);