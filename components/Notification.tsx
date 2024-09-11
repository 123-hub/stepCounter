import PushNotification from "react-native-push-notification"

const sendNotification = (message:string) => {
  PushNotification.localNotification({
    title: "Step Goal Achieved!",
    message: message,
  });
};

// Call this function when step goal is reached
