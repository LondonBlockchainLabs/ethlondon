import React,{Component} from 'react';
import {Row, Col, Form, Button}from 'react-bootstrap';
import FileUploader from './FileUploader'
import mapbox from 'mapbox-gl'
import * as d3 from "d3"

export default class Register extends Component {


  async componentDidMount() {
    mapbox.accessToken = 'pk.eyJ1Ijoicm9iaXNvbml2IiwiYSI6ImNqbjM5eXEwdjAyMnozcW9jMzdpbGk5emoifQ.Q_S2qL8UW-UyVLikG_KqQA';

    var color = d3.schemeSet2;
    var map = new mapbox.Map({
      container: 'main-map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [
        14.038784600499525,
        49.29969274777156
      ],
      zoom: 2.7,
    });



    // Connect to contract

    // Pull all registered addresses

    // Pull all 3box spaces

    // get array of approved GeoJSON files
    this.props.registeredZones.forEach( (registeredZone, i) => {
      console.log(i, registeredZone)
    })

    // Put them into turf objects



  }

  async onClick() {

  }



    render() {
        return (
            <div>
                <div id="main-map" style = {{"position":"absolute",}}>
                    {/* RegisterMap */}
                </div>

                <Form className = "overlay">
                    <FileUploader />

                    <Form.Group controlId="zoneName">
                        <Form.Label className = "text-primary">
                            Zone Name
                        </Form.Label> 
                        <Form.Control type="text" placeholder="Enter your zone name here" />
                        
                    </Form.Group>

                    <Form.Group controlId="address">
                        <Form.Label className = "text-primary">
                            Ethereum Wallet Address
                        </Form.Label>
                        <Form.Control readOnly className = "text-muted" placeholder = {this.props.addr} />
                            
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            
        </div>
        );
    }


}
