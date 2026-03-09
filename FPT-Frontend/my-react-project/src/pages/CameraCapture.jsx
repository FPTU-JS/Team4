import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, X, RefreshCcw, Check } from 'lucide-react';

const CameraCapture = () => {
    const navigate = useNavigate();
    const [stream, setStream] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Initialise camera
    useEffect(() => {
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Camera access error:", err);
                alert("Không thể truy cập máy ảnh. Vui lòng cấp quyền hoặc thử lại.");
            }
        };

        startCamera();

        return () => {
            // Cleanup on unmount
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Also handle stream updates if video ref binds late
    useEffect(() => {
        if (stream && videoRef.current && !videoRef.current.srcObject) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            setCapturedImage(canvas.toDataURL('image/jpeg'));
        }
    };

    const handleRetake = () => {
        setCapturedImage(null);
    };

    const handleConfirm = () => {
        // Here you would typically upload the image or pass it to state.
        console.log("Image confirmed!");
        // Stop stream before navigating away
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        navigate(-1); // Go back or to AI analysis result page
    };

    const handleClose = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        navigate(-1); // Back to previous page
    };

    return (
        <div style={{ backgroundColor: '#000', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            {/* Viewfinder area (Full Screen) */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                {!capturedImage ? (
                    <>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                    </>
                ) : (
                    <img src={capturedImage} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
            </div>

            {/* Header / Top bar (Overlay) */}
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, background: 'linear-gradient(rgba(0,0,0,0.7), transparent)' }}>
                <button
                    onClick={handleClose}
                    style={{ background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', transition: 'background 0.2s' }}
                >
                    <X size={24} />
                </button>
                <div style={{ fontWeight: '600', fontSize: '1.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>Chụp ảnh nguyên liệu</div>
                <div style={{ width: '40px' }}></div> {/* Spacer */}
            </div>

            {/* Spacer to push controls to bottom */}
            <div style={{ flex: 1, zIndex: 10 }}></div>

            {/* Bottom Controls (Overlay) */}
            <div style={{ padding: '30px 20px 40px 20px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 10, background: 'linear-gradient(transparent, rgba(0,0,0,0.8) 80%)' }}>
                {!capturedImage ? (
                    <button
                        onClick={handleCapture}
                        style={{
                            width: '76px', height: '76px', borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.2)', border: '4px solid #fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', backdropFilter: 'blur(4px)',
                            padding: '4px'
                        }}
                    >
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.3)' }}></div>
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleRetake}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                        >
                            <div style={{ background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(5px)', padding: '14px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <RefreshCcw size={24} />
                            </div>
                            <span style={{ fontSize: '0.9rem', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>Chụp lại</span>
                        </button>

                        <button
                            onClick={handleConfirm}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                        >
                            <div style={{ background: '#10b981', padding: '14px', borderRadius: '50%', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.5)', border: '2px solid rgba(255,255,255,0.8)' }}>
                                <Check size={28} />
                            </div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>Sử dụng ảnh</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CameraCapture;
