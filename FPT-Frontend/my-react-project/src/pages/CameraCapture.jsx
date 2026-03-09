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
        <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#fff' }}>
            {/* Header / Top bar */}
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                <button
                    onClick={handleClose}
                    style={{ background: 'rgba(255, 255, 255, 0.2)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}
                >
                    <X size={24} />
                </button>
                <div style={{ fontWeight: '600', fontSize: '1.2rem' }}>Chụp ảnh nguyên liệu</div>
                <div style={{ width: '40px' }}></div> {/* Spacer */}
            </div>

            {/* Viewfinder area */}
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {!capturedImage ? (
                    <>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

                        {/* Focus box overlay (optional UI touch) */}
                        <div style={{ position: 'absolute', width: '250px', height: '250px', border: '2px solid rgba(255, 255, 255, 0.5)', borderRadius: '12px', boxShadow: '0 0 0 9999px rgba(0,0,0,0.3)' }}></div>
                    </>
                ) : (
                    <img src={capturedImage} alt="Captured" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
            </div>

            {/* Bottom Controls */}
            <div style={{ padding: '30px 20px 50px 20px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                {!capturedImage ? (
                    <button
                        onClick={handleCapture}
                        style={{
                            width: '70px', height: '70px', borderRadius: '50%',
                            backgroundColor: 'transparent', border: '5px solid #fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#fff' }}></div>
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleRetake}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                        >
                            <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '12px', borderRadius: '50%' }}>
                                <RefreshCcw size={24} />
                            </div>
                            <span style={{ fontSize: '0.8rem' }}>Chụp lại</span>
                        </button>

                        <button
                            onClick={handleConfirm}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
                        >
                            <div style={{ background: '#10b981', padding: '12px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.4)' }}>
                                <Check size={24} />
                            </div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Sử dụng ảnh</span>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CameraCapture;
