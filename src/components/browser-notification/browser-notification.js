import React, { useEffect } from "react";

function BrowserNotification({ data, onToggleProp }) {
  useEffect(() => {
    const checkEvents = () => {
      const now = new Date();

      const updatedEvents = data.map((event) => {
        if (!event.triggered) {
          const eventTime = new Date(event.inputDate);
          if (eventTime <= now) {
            if (Notification.permission === 'granted') {
              const options = {
                body: event.inputCase,
                icon: event.inputImage ? event.inputImage : 'https://www.vkf-renzel.com/out/pictures/generated/product/1/356_356_75/r12044336-01/general-warning- sign-10836-1.jpg? auto=compress&cs=tinysrgb&dpr=1&w=500',
                dir: 'ltr',
              };

              new Notification('Це я цейво твій записник', options);
            } else {
              Notification.requestPermission()
            }
            return onToggleProp(event.id, 'triggered');
          }
        }

        return event;
      });
    };

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    checkEvents();

    const interval = setInterval(checkEvents, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [data, onToggleProp]);

  return (
    <div className="App">
    </div>
  );
}

export default BrowserNotification;