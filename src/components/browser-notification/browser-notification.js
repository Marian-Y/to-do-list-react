import { Component, useEffect } from "react";


class BrowserNotification extends Component {  
    checkEvents = () => {
      const { data, onToggleProp } = this.props;
      const now = new Date();
  
      const updatedEvents = data.map((event) => {

        if (!event.triggered) {
            const eventTime = new Date(event.inputDate);
          if (eventTime <= now) {
            if (Notification.permission === 'granted') {
              var options = {
                body: event.inputCase,
                icon: event.inputImage ? event.inputImage : 'https://www.vkf-renzel.com/out/pictures/generated/product/1/356_356_75/r12044336-01/general-warning- sign-10836-1.jpg? auto=compress&cs=tinysrgb&dpr=1&w=500',
                dir: 'ltr',
              };
          
              new Notification('Це я', options);
            } else {
              Notification.requestPermission()
            }
            return onToggleProp(event.id, 'triggered');
          }
        }
  
        return event;
      });
  
      this.setState({ events: updatedEvents });
    };
  
    componentDidMount() {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
  
      this.checkEvents(); 
  
      this.interval = setInterval(this.checkEvents, 30000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
    render() {
      return (
        <div className="App">
          {/* Ваш інтерфейс */}
        </div>
      );
    }
  }

export default BrowserNotification;