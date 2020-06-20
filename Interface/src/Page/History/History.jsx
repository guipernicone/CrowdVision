import React, { Component } from 'react';
import Navbar from 'Page/Navbar/Navbar'
import DetectionCard from 'Page/Detections/DetectionCard'
import img from 'Page/Detections/66.jpg'

class History extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div style={{margin: "200px", backgroundColor:"#1e1e1e", height: "500px", width: "600px"}}>
                    <DetectionCard
                        // img={img}
                        // field1={'Camera: 5eedd78c89ca262b4d67644a'}
                        // field2={'Capture Date: 20-06-2020 10:00:00'}
                    />
                </div>
                
            </div>
        );
    }
}

export default History;

// <div>Camera: 5eedd78c89ca262b4d67644a</div>
//                 <div>Capture Date: 20-06-2020 10:00:00</div>
//                 <div>Detection Date: 20-06-2020 10:01:00</div>
//                 <div>Localization: -22.22222 - 33.54545</div>