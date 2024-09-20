import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { SketchPicker } from 'react-color';
import Modal from 'react-modal';
import './App.css';

// Set app element for react-modal
Modal.setAppElement('#root');

const App = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [shirtColor, setShirtColor] = useState('#FFFFFF');
  const [shirtImageURL, setShirtImageURL] = useState('/tshirt.png');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [transformerVisible, setTransformerVisible] = useState(true); // State to control Transformer visibility
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const stageContainerRef = useRef(null);

  const [shirtImage] = useImage(shirtImageURL);
  const [image] = useImage(uploadedImage);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelect = (e) => {

    setSelectedImage(e.target);
    setTransformerVisible(true);
  };

  const handleClickOutside = (event) => {
    if (stageContainerRef.current && !stageContainerRef.current.contains(event.target)) {
      setSelectedImage(null);
      setTransformerVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (transformerRef.current && selectedImage) {
      transformerRef.current.nodes([selectedImage]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedImage]);

const captureStageAsImage = () => {
  setTransformerVisible(false);
  setTimeout(()=>{ if (stageRef.current) {
    // Hide the Transformer before capturing


    html2canvas(stageRef.current.getStage().getContainer()).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      setPreviewImage(imgData);
      setPreviewVisible(true);

      // Restore the Transformer visibility after capturing
      setTransformerVisible(true);
    });
  } else {
    setTransformerVisible(true); // Ensure Transformer is visible if no stage
  }},300)
 
};


  const handleExportAsImage = () => {
    setTransformerVisible(false); // Hide Transformer before exporting
    const dataURL = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'tshirt-design.png';
    link.href = dataURL;
    link.click();
    setTransformerVisible(true); // Show Transformer again
  };

  const handleExportAsPDF = () => {
    setTransformerVisible(false); // Hide Transformer before exporting
    html2canvas(stageRef.current.getStage().getContainer()).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('tshirt-design.pdf');
      setTransformerVisible(true); // Show Transformer again
    });
  };

  const updateShirtImageColor = (color) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = '/tshirt.png';
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'destination-atop';
      ctx.drawImage(img, 0, 0);
      setShirtImageURL(canvas.toDataURL());
    };
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>Customize Your T-Shirt</h2>
        <label className="file-label">
          <span>Upload Image</span>
          <input type="file" onChange={handleUpload} className="file-input" />
        </label>

        <div className="color-picker">
          <h3>Pick Shirt Color</h3>
          <SketchPicker
            color={shirtColor}
            onChangeComplete={(color) => {
              setShirtColor(color.hex);
              updateShirtImageColor(color.hex);
            }}
          />
        </div>

        <div className="export-buttons">
          <button className="btn" onClick={()=>captureStageAsImage()}>
            Preview
          </button>
          <button className="btn" onClick={handleExportAsImage}>
            Export as Image
          </button>
          <button className="btn" onClick={handleExportAsPDF}>
            Export as PDF
          </button>
        </div>
      </div>

      <div className="stage-container" ref={stageContainerRef}>
        <Stage width={600} height={600} ref={stageRef} className="konva-stage">
          <Layer>
            {shirtImage && <KonvaImage image={shirtImage} width={600} height={600} />}
            {image && (
              <KonvaImage
                image={image}
                draggable
                onClick={handleSelect}
                ref={selectedImage === 'uploadedImage' ? transformerRef : null}
              />
            )}
            {transformerVisible && <Transformer ref={transformerRef} />}
          </Layer>
        </Stage>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={previewVisible}
        onRequestClose={() => setPreviewVisible(false)}
        contentLabel="Preview"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Design Preview</h2>
        {previewImage && <img src={previewImage} alt="Preview" style={{ height: '600px' }} />}
        <button className="btn" onClick={() => setPreviewVisible(true)}>
          Close Preview
        </button>
      </Modal>
    </div>
  );
};

export default App;
