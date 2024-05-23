import { WebView } from 'react-native-webview';
import { Camera } from "expo-camera";
import { useRouter } from 'expo-router';

export default function LivenessDetectScreen() {
  const router = useRouter();

  const requestCameraPermission = async () => {
    try {
      const result = await Camera.requestCameraPermissionsAsync();
      return result.granted
    } catch (err) {
      return false;
    }
  };
  return (
    <WebView
      onLoadStart={requestCameraPermission} 
      originWhitelist={['*']} 
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false} 
      source={{
        uri: "YOUR_LIVENESS_DETECTION_URL",
      }}
      style={{ flex: 1 }}
      onShouldStartLoadWithRequest={(navState) => {
        /* 
        link: https://doc.advance.ai/h5_liveness_detection.html#get-token-api
        example body:
          {
              "tryCount":1000,
              "region":"IDN",
              "returnUrl":"https://www.example-success.com/",
              "failedReturnUrl":"https://www.example-fail.com/"
          }
        */
       // when liveness detection is done, it will redirect to returnUrl or failedReturnUrl, you can handle it here
        const urlData = new URL(navState.url);
        if (urlData.hostname === 'www.example-success.com') {
          router.navigate('success-page');
          return false
        } else if (urlData.hostname === 'www.example-fail.com') {
          router.navigate('fail-page');
          return false
        }
        return true;
      }}
    />
  );
}