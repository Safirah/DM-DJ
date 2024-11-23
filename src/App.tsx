import React from 'react';
import logo from './logo.svg';
import './App.css';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, ButtonGroup, Card, CardBody, CardGroup, CardHeader, CardText, Col, Container, Form, ListGroup, Row, Stack, ThemeProvider } from 'react-bootstrap';
import { MusicBox, MusicItem } from './classes/MusicBox';
import data from './data.json';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const whiteNoise = data.weather as MusicItem[];
  const ambience = data.ambience as MusicItem[];
  const music = data.music as MusicItem[];
  const soundEffect = data.effect as MusicItem[];

  return (
    <Container className="main h-100 align-items-center justify-content-center container px-4">
      <Row>
        <div className="header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Weather/White noise</h1>
        </div>
        <MusicBox items={whiteNoise} />
        <MusicBox items={whiteNoise} />
        <MusicBox items={whiteNoise} />
      </Row>

      <Row>
        <div className="header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Ambience</h1>
        </div>
        <MusicBox items={ambience} />
        <MusicBox items={ambience} />
        <MusicBox items={ambience} />
      </Row>

      <Row>
        <div className="header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Background Music</h1>
        </div>
        <MusicBox items={music} />
        <MusicBox items={music} />
        <MusicBox items={music} />
      </Row>

      <Row>
        <div className="header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Sound Effect</h1>
        </div>
        <MusicBox items={soundEffect} />
        <MusicBox items={soundEffect} />
        <MusicBox items={soundEffect} />
      </Row>
    </Container>
  );
}

export default App;
