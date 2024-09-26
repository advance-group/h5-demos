import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export const AAILivenessIframe = forwardRef(({ url, onSuccess, onFail }, ref) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.warn(data)
        if (data.info === 'successNext') {
          onSuccess();
        } else if (data.info === 'failedNext') {
          onFail();
        }
      } catch (error) {
        console.error('Failed to parse message:', JSON.stringify(event));
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
        window.removeEventListener('message', handleMessage);
    };
  }, [onSuccess, onFail]);

  const destroy = () => {
    if (iframeRef.current) {
      iframeRef.current.src = 'about:blank';
      iframeRef.current.remove();
    }
  };

  useImperativeHandle(ref, () => ({
    destroy
  }));

  const fullUrl = `${url}${url.includes('?') ? '&' : '?'}isLivenessIframe=1`;

  return (
    <iframe
      ref={iframeRef}
      src={fullUrl}
      allow="camera;autoplay;fullscreen"
      allowFullScreen
      style={{ width: '100%', height: '100%', border: 'none' }}
      title="AAI Liveness Check"
    />
  );
});

export default AAILivenessIframe;