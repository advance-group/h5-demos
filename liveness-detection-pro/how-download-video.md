# AAI Liveness Download Video Demo

## [Demo Address of Download Video](./aai-liveness-record-video/index.html)

## Message Handling with window.postMessage

### Receiving Messages

In the parent window, you need to listen for messages sent by the Liveness iframe. This is implemented using `window.addEventListener("message", ...)`:

```javascript
// Set up message listener in the parent window
window.addEventListener("message", (event) => {
    console.log("Received message:", event);
    
    // Ensure the message source is trusted
    // If needed, you can check event.origin
    
    if (event.data && event.data.eventKey === "video-record-finished") {
        const data = event.data.data;
        
        if (data.type === 'video') {
            // Process video data
            handleVideoData(data.values);
        } else if (data.type === 'image') {
            // Process image data
            handleImageData(data.values);
        }
    }
});
```

### Message Data Structure

The message received from the iframe has the following structure:

```javascript
{
  eventKey: "video-record-finished",
  data: {
    type: string,  // "video" or "image"
    values: Array   // Array of Blob objects
  }
}
```

- When `type` is `"video"`, the `values` array contains only one video Blob object
- When `type` is `"image"`, the `values` array contains multiple image Blob objects (up to 30 images)

## Server Upload Pseudocode

### Video Upload Pseudocode

```javascript
// Handle video data
function handleVideoData(values) {
    if (!values || values.length === 0) {
        console.error("No video data received");
        return;
    }
    
    // Get video Blob
    const videoBlob = values[0];
    
    // Upload video to server
    uploadVideoToServer(videoBlob);
}

// Upload video to server
async function uploadVideoToServer(videoBlob) {
    try {
        // Create FormData
        const formData = new FormData();
        formData.append('video', videoBlob, 'liveness-video.webm');
        formData.append('timestamp', new Date().toISOString());
        
        // Send upload request
        const response = await fetch('YOUR_SERVER_UPLOAD_ENDPOINT', {
            method: 'POST',
            body: formData
        });
        
        // Handle response
        if (response.ok) {
            console.log("Video uploaded successfully");
        } else {
            console.error("Failed to upload video:", response.statusText);
        }
    } catch (error) {
        console.error("Error uploading video:", error);
    }
}
```

### Image Upload Pseudocode

```javascript
// Handle image data
function handleImageData(values) {
    if (!values || values.length === 0) {
        console.error("No image data received");
        return;
    }
    
    // Upload images to server
    uploadImagesToServer(values);
}

// Upload images to server
async function uploadImagesToServer(imageBlobs) {
    try {
        // Create FormData
        const formData = new FormData();
        
        // Add all images
        imageBlobs.forEach((blob, index) => {
            formData.append(`image_${index}`, blob, `liveness-image-${index}.jpg`);
        });
        
        // Add image count information
        formData.append('imageCount', imageBlobs.length);
        formData.append('timestamp', new Date().toISOString());
        
        // Send upload request
        const response = await fetch('YOUR_SERVER_UPLOAD_ENDPOINT', {
            method: 'POST',
            body: formData
        });
        
        // Handle response
        if (response.ok) {
            console.log(`${imageBlobs.length} images uploaded successfully`);
        } else {
            console.error("Failed to upload images:", response.statusText);
        }
    } catch (error) {
        console.error("Error uploading images:", error);
    }
}
```

## Integration with messageHandler

```javascript
// Set up message handler
window.addEventListener("message", (event) => {
    if (event.data && event.data.eventKey === "video-record-finished") {
        const data = event.data.data;
        
        // Process different media resources based on type
        if (data.type === 'video' && data.values.length > 0) {
            uploadVideoToServer(data.values[0]);
        } else if (data.type === 'image' && data.values.length > 0) {
            uploadImagesToServer(data.values);
        } else {
            console.error("Invalid data received");
        }
    }
});
```

## Integration into Liveness Demo

To integrate this functionality into the existing Liveness Demo, you can add the following code to the `messageHandler` function in the document:

```javascript
// Set up messageHandler in the openLivenessIframe function
messageHandler = (fullData) => {
    if (fullData.eventKey === "video-record-finished") {
        const data = fullData.data;
        
        if (data.type === 'video') {
            // Upload video directly instead of displaying it on the page
            uploadVideoToServer(data.values[0]);
        } else if (data.type === 'image') {
            // Upload images directly instead of displaying them on the page
            uploadImagesToServer(data.values);
        }
    }
};
```

## Security Considerations

- Validate message origin to ensure messages come from the expected iframe source
- Implement appropriate CORS policies