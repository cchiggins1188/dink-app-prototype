"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function DinkAppPrototype() {
  const [step, setStep] = useState("welcome");
  const [isInCouple, setIsInCouple] = useState(null);
  const [isDink, setIsDink] = useState(null);
  const [partner1, setPartner1] = useState("");
  const [partner2, setPartner2] = useState("");
  const [age1, setAge1] = useState("");
  const [age2, setAge2] = useState("");
  const [photos, setPhotos] = useState([]);
  const [relationshipDuration, setRelationshipDuration] = useState("");
  const [lifestyleChoices, setLifestyleChoices] = useState({ earlyRisers: false, socialDrinkers: false, petParents: false });
  const [activityPrefs, setActivityPrefs] = useState({ travel: false, diningOut: false, gameNights: false, outdoorAdventures: false });
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swipedHistory, setSwipedHistory] = useState([]);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const sortedProfiles = [
    {
      names: "Andrew & Lisa",
      score: 8,
      image: "https://via.placeholder.com/300",
      bio: "We’re adventurers who love weekend getaways and brewery crawls."
    },
    {
      names: "Jamie & Taylor",
      score: 6,
      image: "https://via.placeholder.com/300",
      bio: "Board game lovers with a serious brunch habit."
    },
    {
      names: "Chris & Morgan",
      score: 7,
      image: "https://via.placeholder.com/300",
      bio: "We enjoy quiet hikes, live music, and good coffee."
    }
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (files.length > 10) return alert("Upload up to 10 photos only.");
    setPhotos(files);
  };

  const handleSwipe = (direction) => {
    if (direction === "like") setLikedProfiles((prev) => [...prev, sortedProfiles[currentProfileIndex]]);
    setSwipedHistory((prev) => [...prev, currentProfileIndex]);
    setCurrentProfileIndex((prev) => prev + 1);
  };

  const handleUndo = () => {
    if (!swipedHistory.length) return;
    const prevIndex = swipedHistory.pop();
    setSwipedHistory([...swipedHistory]);
    setCurrentProfileIndex(prevIndex);
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    if (offset > 100) {
      setSwipeDirection("right");
      handleSwipe("like");
    } else if (offset < -100) {
      setSwipeDirection("left");
      handleSwipe("skip");
    } else {
      setSwipeDirection(null);
    }
  };

  const steps = ["welcome", "signup", "profile", "discovery"];
  const currentStepNumber = steps.indexOf(step) + 1;
  const totalSteps = steps.length;

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <div className="text-sm text-gray-500 text-right">Step {currentStepNumber} of {totalSteps}</div>

      {step === "welcome" && (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-bold">Welcome to DINK Social</h2>
            <p>More and more couples are choosing not to have kids....but where are they?!</p>
            <p>DINK Social connects childfree couples for real friendship over travel, dinners, brewery and winery hangs, and more. No pressure, just good company!</p>
            <Button onClick={() => setStep("signup")}>Get Started</Button>
          </CardContent>
        </Card>
      )}

      {step === "signup" && (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-bold">Quick Questions</h2>
            <div>
              <p className="mb-2">Are you part of a couple in a committed relationship?</p>
              <div className="flex gap-4">
                <Button variant={isInCouple === true ? "default" : "outline"} onClick={() => setIsInCouple(true)}>Yes</Button>
                <Button variant={isInCouple === false ? "default" : "outline"} onClick={() => setIsInCouple(false)}>No</Button>
              </div>
            </div>

            <div>
              <p className="mb-2">Are you proudly living the DINK lifestyle?</p>
              <div className="flex gap-4">
                <Button variant={isDink === true ? "default" : "outline"} onClick={() => setIsDink(true)}>Yes</Button>
                <Button variant={isDink === false ? "default" : "outline"} onClick={() => setIsDink(false)}>No</Button>
              </div>
            </div>

            <Button
              onClick={() => {
                if (isInCouple && isDink) {
                  setStep("profile");
                } else if (isInCouple === false || isDink === false) {
                  setStep("not-eligible");
                }
              }}
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "not-eligible" && (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-bold">Thanks for stopping by!</h2>
            <p>We built DINK Social for couples who've chosen to live life without kids, whether that's by choice, chance, or simply where they are right now.</p>
            <p>This space is designed to help childfree couples connect with others who share the same lifestyle, values, and kind of freedom. Think spontaneous travel, quiet brunches, brewery nights, and no bedtime routines.</p>
            <p>If that's not you, we appreciate your interest and we hope you find a community that fits your vibe just as well.</p>
            <p className="font-semibold">Thanks for understanding!</p>
          </CardContent>
        </Card>
      )}

      {step === "profile" && (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-bold">Create Your Profile</h2>
            <Input placeholder="Your name" value={partner1} onChange={(e) => setPartner1(e.target.value)} />
            <Input placeholder="Your partner's name" value={partner2} onChange={(e) => setPartner2(e.target.value)} />
            <Input placeholder="Your age" type="number" value={age1} onChange={(e) => setAge1(e.target.value)} />
            <Input placeholder="Partner's age" type="number" value={age2} onChange={(e) => setAge2(e.target.value)} />
            <Input placeholder="Relationship duration (e.g. 6 years)" value={relationshipDuration} onChange={(e) => setRelationshipDuration(e.target.value)} />
            <Textarea placeholder="Tell us about you two..." />
            <label className="block">Upload up to 10 photos</label>
            <Input type="file" multiple accept="image/*" onChange={handlePhotoUpload} />
            <Button onClick={() => setStep("discovery")}>Save & Start Swiping</Button>
          </CardContent>
        </Card>
      )}

      {step === "discovery" && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-xl font-bold">Swipe Through Couples</h2>
            <AnimatePresence mode="wait">
              {sortedProfiles[currentProfileIndex] ? (
                <motion.div
                  key={currentProfileIndex}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative border rounded p-4 bg-white shadow space-y-2 cursor-grab"
                >
                  {swipeDirection === "right" && (
                    <span className="absolute top-2 left-2 text-green-600 text-xl font-bold">👍 Like</span>
                  )}
                  {swipeDirection === "left" && (
                    <span className="absolute top-2 right-2 text-red-500 text-xl font-bold">👎 Skip</span>
                  )}
                  <img
                    src={sortedProfiles[currentProfileIndex].image}
                    alt={sortedProfiles[currentProfileIndex].names}
                    className="w-full h-48 object-cover rounded"
                  />
                  <p className="font-semibold text-lg">{sortedProfiles[currentProfileIndex].names}</p>
                  <p className="text-sm text-gray-500">Match score: {sortedProfiles[currentProfileIndex].score}</p>
                  <p className="text-sm">{sortedProfiles[currentProfileIndex].bio}</p>
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" onClick={handleUndo}>⟲ Undo</Button>
                    <Button variant="outline" onClick={() => handleSwipe("skip")}>Skip</Button>
                    <Button onClick={() => handleSwipe("like")}>Like</Button>
                  </div>
                </motion.div>
              ) : (
                <p>No more profiles available.</p>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function Home() {
  return <DinkAppPrototype />;
}
