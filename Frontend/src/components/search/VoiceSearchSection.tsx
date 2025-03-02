import React, { useState, useEffect } from "react";
import axios from "axios";
import RecordRTC from "recordrtc";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faLocationDot, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { VoiceSearchSectionProps } from "../../types";

const VoiceSearchSection: React.FC<VoiceSearchSectionProps> = ({ onCommand }) => {
    const [listening, setListening] = useState<boolean>(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [location, setLocation] = useState<string>("Loading...");
    const [recorder, setRecorder] = useState<RecordRTC | null>(null);

    const fetchLocation = async () => {
        try {
            const response = await axios.get("/api/location");
            const { city, region } = response.data; 
            setLocation(`${city}, ${region}`);
        } catch (error) {
            console.error("Error fetching location:", error);
            setLocation("Unable to fetch location");
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    const startListening = async () => {
        try {
           
            if (listening) return;
            
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const newRecorder = new RecordRTC(stream, { type: "audio" });
            
            newRecorder.startRecording();
            setRecorder(newRecorder);
            setListening(true);
            
            setTimeout(() => stopListening(newRecorder, stream), 5000); 
        } catch (error) {
            console.error("Error starting recording:", error);
            setListening(false);
        }
    };

    const stopListening = async (rec: RecordRTC, stream: MediaStream) => {
        if (!rec) return;
        
        rec.stopRecording(() => {
            setListening(false);
            
            const audioBlob = rec.getBlob();
          
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
            
            const audioFile = new File([audioBlob], "voice.wav", { type: "audio/wav" });
            const formData = new FormData();
            formData.append("audio", audioFile);
            
           
            stream.getTracks().forEach(track => track.stop());
            
            
            sendAudioForTranscription(formData);
        });
    };
    
    const sendAudioForTranscription = async (formData: FormData) => {
        try {
            const response = await axios.post(
                "/api/voice/speech-to-text", 
                formData, 
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            
            const transcript = response.data.transcript;
            console.log("Transcription:", transcript);
            if (transcript) {
                onCommand(transcript);
            }
        } catch (error) {
            console.error("Error sending audio for transcription:", error);
        }
    };

    return (
        <div className="text-center mb-12">
            <div className="relative inline-block">
                <button 
                    className={`w-24 h-24 ${listening ? 'bg-red-500' : 'bg-custom'} text-white rounded-full shadow-lg hover:bg-opacity-90 transition-all`}
                    onClick={startListening}
                    disabled={listening}
                >
                    <FontAwesomeIcon icon={faMicrophone} className="text-4xl" />
                </button>
                {listening && (
                    <div className="absolute inset-0 bg-custom rounded-full animate-ping opacity-20"></div>
                )}
            </div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900">Ask me about nearby food!</h1>
            <div className="mt-4 flex items-center justify-center space-x-2">
                <FontAwesomeIcon icon={faLocationDot} className="text-custom" />
                <span className="text-gray-600">Current Location:</span>
                <span className="font-medium">{location}</span>
                <button 
                    className="rounded-full p-1 text-custom hover:text-opacity-80"
                    onClick={fetchLocation}
                >
                    <FontAwesomeIcon icon={faSyncAlt} />
                </button>
            </div>
            {audioUrl && (
                <div className="mt-4">
                    <audio src={audioUrl} controls className="mx-auto" />
                </div>
            )}
        </div>
    );
};

export default VoiceSearchSection;