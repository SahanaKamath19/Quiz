import React, { Component } from 'react';
import './App.css';

let countdown = function (elementName, minutes, seconds){
        let element, endTime,hours,mins, msLeft, time;
        function twoDigits( n ){
            return (n <= 9 ? "0" + n : n);
        }
        function updateTimer(){
            msLeft = endTime - (+new Date);
            if ( msLeft < 1000 ) {
                element.innerHTML = "countdown's over!";
            }else {
                time = new Date( msLeft );
                mins = time.getUTCMinutes();
                element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
                setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
            }
        }
         element = document.getElementById( elementName );
         endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
         updateTimer();
    }
class Timer extends Component{
    componentDidMount(){
        countdown("countdown",20,0);
    }
    render(){
        return(
            <div>
            <p>Time Remaining:</p>
            <div id="countdown"></div>
            </div>
        )
    }
}

export default Timer;