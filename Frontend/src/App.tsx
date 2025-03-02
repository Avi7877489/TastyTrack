import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import VoiceSearchSection from './components/search/VoiceSearchSection';
import FoodCardGrid from './components/food/FoodCardGrid';
import SuggestionSection from './components/suggestions/SuggestionSection';
import ActionButtons from './components/ActionButtons';
import { Coords } from './types';

const App: React.FC = () => {
const [coords, setCoords] = useState<Coords>({ lat: null, lng: null });
const [responseText, setResponseText] = useState<string>("");

const handleCommand = (command: string) => {
    if (command.toLowerCase().includes("nearby restaurants")) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });

                setResponseText("Here are the top 5 restaurants near you!");
            },
            (error) => console.error(error)
        );
    }
};


  return (
    <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <VoiceSearchSection onCommand = {handleCommand} />
        <FoodCardGrid />
        <SuggestionSection />
        <ActionButtons />
      </main>
      <Footer />
    </div>
  );
};

export default App;