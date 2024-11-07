import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; import { faPlay, faPause, faUndo, faStepBackward, faStepForward, faPlus, faMinus, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'
import Spectrogram from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/spectrogram.esm.js'
import TimelinePlugin from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js'
import ZoomPlugin from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/zoom.esm.js'
export default function Visual({ audioUrl, initialZoom }) {
  const [isVisualizationOpen, setIsVisualizationOpen] = useState(true);
  const waveformRef = useRef(null);
  const wavesurferInitialized = useRef(false);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(initialZoom);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [audioDuration, setAudioDuration] = useState(0);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [showTranscription, setShowTranscription] = useState(false);
  const [zoomInCount, setZoomInCount] = useState(0);
  const [zoomOutCount, setZoomOutCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/transcription/${getFilenameFromUrl(audioUrl)}`);
      const data = await response.json();
      setTranscription(data.transcription || 'No transcriptions available');
    };
    if (audioUrl && !wavesurferInitialized.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        cursorWidth: 1,
        progressColor: "#4933ff",
        responsive: true,
        waveColor: "#00000",
        cursorColor: "black",
        height: 200,
        barWidth: 0.3,
        hideScrollbar: false,
        minPxPerSec: 0.2,
        sampleRate: 22050,
        autoCenter: true,
        plugins: [TimelinePlugin.create({
          height: 30,
          timeInterval: 5, style: "bold"
        }),
        ZoomPlugin.create({
          scale: 0.3,
          maxZoom: 100,
        })],
      });
      wavesurfer.registerPlugin(
        Spectrogram.create({
          labels: true,
          height: 200,
          splitChannels: false,
          labelsColor: "black",
          labelsHzColor: "black",
        })
      )
      wavesurfer.on('play', () => {
        setIsPlaying(true);
      });

      wavesurfer.on('pause', () => {
        setIsPlaying(false);
      });
      wavesurfer.on('ready', () => {

        if (wavesurferRef.current) {
          wavesurferRef.current.zoom(0);
          setAudioDuration(wavesurferRef.current.getDuration());
          fetchData();
        }
      });
      wavesurfer.on('audioprocess', () => {
        setCurrentAudioTime(wavesurfer.getCurrentTime());
        const progressPercentage = (wavesurfer.getCurrentTime() / audioDuration) * 100;
        setProgressWidth(progressPercentage);
      });

      wavesurfer.load(audioUrl);
      wavesurferInitialized.current = true;
      wavesurferRef.current = wavesurfer;
    };


  }, [audioUrl, audioDuration, progressWidth, showTranscription]);
  const getFilenameFromUrl = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  };
  const toggleTranscription = () => {
    setShowTranscription(!showTranscription);
  };
  const playpause = () => {
    if (wavesurferRef.current) {
      if (!wavesurferRef.current.isPlaying()) {
        wavesurferRef.current.play();
      } else {
        wavesurferRef.current.pause();
      }
    }
  };

  const zoomIn = () => {
    if (zoomInCount < 10) {
      const newZoomLevel = zoomLevel * 2;
      setZoomLevel(newZoomLevel);
      setZoomInCount(zoomInCount + 1);
      setZoomOutCount(0);
      if (wavesurferRef.current) {
        wavesurferRef.current.zoom(newZoomLevel);
      }
    }
  };

  const zoomOut = () => {
    if (zoomOutCount < 10) {
      const newZoomLevel = zoomLevel / 2;
      setZoomLevel(newZoomLevel);
      setZoomOutCount(zoomOutCount + 1);
      setZoomInCount(0);
      if (wavesurferRef.current) {
        wavesurferRef.current.zoom(newZoomLevel);
      }
    }
  };
  const increasePlaybackSpeed = () => {
    const newSpeed = playbackSpeed + 0.5; // Increase speed by 0.1 each time
    setPlaybackSpeed(newSpeed);
    if (wavesurferRef.current) {
      wavesurferRef.current.setPlaybackRate(newSpeed);
    }
  };
  const decreasePlaybackSpeed = () => {
    const newSpeed = playbackSpeed - 0.5; // Increase speed by 0.1 each time
    setPlaybackSpeed(newSpeed);
    if (wavesurferRef.current) {
      wavesurferRef.current.setPlaybackRate(newSpeed);
    }
  }
  const restartAudio = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.seekTo(0);
    }
  };
  const skipForward = () => {
    if (wavesurferRef.current) {
      const currentTime = wavesurferRef.current.getCurrentTime();
      const newTime = currentTime + 10;
      if (newTime < audioDuration) {
        wavesurferRef.current.seekTo(newTime / audioDuration);
      } else {
        wavesurferRef.current.seekTo(1);
      }
    }
  };

  const skipBackward = () => {
    if (wavesurferRef.current) {
      const currentTime = wavesurferRef.current.getCurrentTime();
      const newTime = currentTime - 10;
      if (newTime >= 0) {
        wavesurferRef.current.seekTo(newTime / audioDuration);
      } else {
        wavesurferRef.current.seekTo(0);
      }
    }
  };

  return (
    <>


      {isVisualizationOpen && (
        <div className='vis'>
        <div ref={waveformRef} className="waveform" id='waveform'>
          <div className='progress-bar' style={{ width: `${progressWidth}%` }}></div>
          <div style={{ border: "1px solid black", display: "inline-block", padding: "2px", margin: "2px" }}> <strong>Audio Duration:</strong> {audioDuration.toFixed(2)}s</div>
          <div style={{ border: "1px solid black", display: "inline-block", padding: "2px", margin: "2px" }}><strong>Playback Speed:</strong> {playbackSpeed}x</div>
          <div style={{ border: "1px solid black", display: "inline-block", padding: "2px", margin: "2px" }}><strong>Zoom Level: </strong>{zoomLevel === 1 ? "Original" : `Original * ${zoomLevel}`}</div>
          <div style={{ border: "1px solid black", display: "inline-block", padding: "2px", margin: "2px" }}><strong>Current Time:</strong> {currentAudioTime.toFixed(2)}s</div>
        </div>
        <button className='but2' onClick={toggleTranscription}>{showTranscription ? 'Hide Transcriptions' : 'Show Transcriptions'}</button>
        <button className='but1' onClick={restartAudio} title='Restart'><FontAwesomeIcon icon={faUndo} /></button>
        <button className='but1' onClick={skipBackward} title='Backward (10s)'><FontAwesomeIcon icon={faStepBackward} /></button>
        <button className='but1' onClick={playpause} title={isPlaying ? 'Pause' : 'Play'}>{wavesurferRef.current && wavesurferRef.current.isPlaying() ? (<FontAwesomeIcon icon={faPause} />) : (<FontAwesomeIcon icon={faPlay} />)}</button>
        <button className='but1' onClick={skipForward} title='Forward (10s)'><FontAwesomeIcon icon={faStepForward} /></button>
         <button className='but1' onClick={() => decreasePlaybackSpeed()} title='Playback speed (-0.5x)'><FontAwesomeIcon icon={faMinus} /></button>
        <button className='but1' onClick={() => increasePlaybackSpeed()} title='Playback speed (+0.5x)'><FontAwesomeIcon icon={faPlus} /></button>
        <button className='but1' onClick={() => zoomIn()} title='Zoom in'><FontAwesomeIcon icon={faSearchPlus} /></button>
        <button className='but1' onClick={() => zoomOut()} title='Zoom out'><FontAwesomeIcon icon={faSearchMinus} /></button>
        {showTranscription && (
          <div>
            <textarea
              className='transcription-textarea'
              rows='5'
              value={transcription}
              placeholder='Transcription will be shown here...'
              onChange={(e) => setTranscription(e.target.value)}
            />
          </div>
        )}
        </div >
      )
}
    </>
  )
}