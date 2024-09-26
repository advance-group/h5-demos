# AAI Liveness Iframe

A React component for embedding AAI Liveness iframe in your application.

## Installation

```bash
npm install aai-liveness-iframe
```

or

```bash
yarn add aai-liveness-iframe
```

## Usage

```jsx
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
        <AAILivenessIframe url="https://k8s-liveness.advai.net/index?biz_token=eyJhbGciOiJIUzU"
          ref={iframeRef} onSuccess={handleSuccess} onFail={handleFail} />
      )}
    </>
  );
};

ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| url | string | The URL of the liveness check page |
| onSuccess | () => void | Callback function called when liveness check is successful |
| onFail | () => void | Callback function called when liveness check fails |


## Running the Demo

To run the demo application:

1. Clone this repository
2. Install dependencies:
3. Run the demo:
   ```bash
   npm run demo
   ```

This will start the demo application on `http://localhost:5173`.

## License

MIT