import React,{Component} from 'react';
import {Row, Col, Form, Button}from 'react-bootstrap';
import FileUploader from './FileUploader'
import mapbox from 'mapbox-gl'
import * as d3 from "d3"
import turf from "@turf/turf"
import bbox from "@turf/bbox"


export default class Register extends Component {

  constructor () {
    super();
    this.state = {
      map : undefined,
    };

    this.addPolygonToMap = this.addPolygonToMap.bind(this);

  }


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

    this.setState({map : map});


    // Connect to contract

    // Pull all registered addresses

    // Pull all 3box spaces

    // get array of approved GeoJSON files


    // Load registered zones on map.
    map.on('style.load', () => {
      this.props.registeredZones.forEach( (registeredZone, i) => {

        console.log(i, registeredZone)
        map.addSource(registeredZone.properties.ID + '-source', {
          "type": 'geojson',
          'data': registeredZone
        });

        map.addLayer({
          'id': registeredZone.properties.ID,
          'type': 'fill',
          'source': registeredZone.properties.ID + '-source',
          'layout': {},
          'paint': {
            'fill-color': color[i],
            'fill-opacity': 0.4
          }
        });
      })
    });


    // Put them into turf objects



  }

  async addPolygonToMap (polygon) {

    this.state.map.addSource('zone-to-register-source', {
      "type": 'geojson',
      'data': polygon
    });

    this.state.map.addLayer({
      'id': 'zone-to-register',
      'type': 'fill',
      'source': 'zone-to-register-source',
      'layout': {},
      'paint': {
        'fill-color': "red",
        'fill-opacity': 0.4
      }
    });

    this.state.map.fitBounds(bbox(polygon),
        {padding: 75}
      );
  }

  async onPolygDrop() {
    // code here ...
  }

  async onClick() {

  }



    render() {
        return (
            <Row>
                <Col id="main-map" md={8}>
                    {/* RegisterMap */}
                </Col>
            <Col md={4}>
                <Form>
                    <FileUploader registeredZones = {this.props.registeredZones} setZoneToRegister={this.props.setZoneToRegister} addPolygonToMap = {this.addPolygonToMap} />

                    <Form.Group controlId="zoneName">
                        <Form.Label>
                            Zone Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter your zone name here" />
                        <Form.Text className="text-muted">
                        Name your zone to be registered
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="address">
                        <Form.Label>
                            Ethereum Wallet Address
                        </Form.Label>
                        <Form.Control plaintext readOnly defaultValue={this.props.addr} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
        );
    }


}
