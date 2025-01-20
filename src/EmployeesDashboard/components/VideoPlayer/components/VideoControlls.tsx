import React, { RefObject, useEffect, useState } from "react";
import { MdOutlineForward10, MdOutlineReplay10 } from "react-icons/md";
import { IoMdPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { RiSettings5Fill } from "react-icons/ri";

import VolumeUp from "../../../../assets/svg/VolumeUp";
import VolumeMute from "../../../../assets/svg/VolumeMute";
import { FullScreenSvg } from "../../../../assets/svg";
import {FullScreenExitSvg} from "../../../../assets/svg";
import Hls from "hls.js";

interface IQualityOptions {
  label: string;
  url: string;
}
interface IVideoControllsProps {
  curr: number | null;
  durr: number | null;
  controlsVisible: boolean;
  fullscreen: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  isLive: boolean;
  volume: number;
  progress: number;
  // LiveEdge: number | null;
  videoRefrence: RefObject<HTMLVideoElement>;
  videoContainerRefrence: RefObject<HTMLDivElement>;
  currentQuality: string;
  qualityOptions: IQualityOptions[];
  onPlayPause: () => void;
  hlsInstance: Hls | null;
  onFullscreenToggle: () => void;
  onFetchAndParse: (url: string) => void;
  DefaultURL: string;
  handleLoadVideo: (url: string) => void;
  setProgress: any
}


const VideoControlls: React.FC<IVideoControllsProps> = ({
  progress,
  setProgress,

  durr,
  curr,
  controlsVisible,
  isPlaying,
  isLive,
  videoRefrence,
  onPlayPause,
  onFullscreenToggle,
  qualityOptions,
  DefaultURL,
  handleLoadVideo,
  onFetchAndParse,
  fullscreen

}: IVideoControllsProps) => {

  const [volume, setVolume] = useState<number>(1);
  // const [progress, setProgress] = useState<number>(0);
  const [showQualityMenu, setShowQualityMenu] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentQuality, setCurrentQuality] = useState("Auto");

  const handleMuteToggle = () => {

    const videoElement = videoRefrence.current;
    if (videoElement) {
      if (isMuted) {

        videoElement.muted = false;
        videoElement.volume = volume;
      } else {

        videoElement.muted = true;
        videoElement.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };


  const skipTime = (seconds: number) => {

    const videoElement = videoRefrence.current;
    if (videoElement && !isNaN(videoElement.duration)) {
      const newTime = Math.min(Math.max(videoElement.currentTime + seconds, 0), videoElement.duration);
      videoElement.currentTime = newTime;
    }
  };




  useEffect(() => {
    onFetchAndParse(DefaultURL);//
    console.log({ DefaultURL })
    handleLoadVideo(DefaultURL);
  }, [DefaultURL]);


  // useEffect(() => {

  //   onFetchAndParse(DefaultURL);
  //   handleLoadVideo(DefaultURL);
  //   return () => {
  //     if (hlsInstance) {
  //       hlsInstance.destroy();
  //     }
  //   };
  // }, []);

  const setToMax = () => {
    const videoElement = document.getElementById("audioPlayer") as HTMLVideoElement;
    videoElement.currentTime = (durr ?? 0) // - 10
    setProgress(100);
  }

  const handleQualityChange = (label: string, url: string) => {
    if (currentQuality !== label) {
      setCurrentQuality(label);
      handleLoadVideo(url);
    }

    const videoElement = videoRefrence.current;
    if (videoElement && curr !== null) {
      videoElement.currentTime = curr;
    };

    // setProgress(100);
    setShowQualityMenu(false);
  };



  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    const videoElement = videoRefrence.current;

    if (videoElement) {

      if (isMuted) {
        videoElement.muted = false;
        setIsMuted(false);
      }


      videoElement.volume = newVolume;
      setVolume(newVolume);
    }
  };





  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoElement = videoRefrence.current;
    if (videoElement) {
      const progressValue = parseFloat(e.target.value);

      // const realDuration= (durr?? 0)>1800? 1800: (durr??0)
      const newCurrentTime = ((durr ?? 0)) * (progressValue / 100);

      // console.log({
      //   currentTime: videoElement.currentTime,
      //   newCurrentTime,
      //   liveEdge,
      //   p: progressValue / 100
      // });

      videoElement.currentTime = newCurrentTime;
      setProgress(progressValue);
    }
  };

  // function secondsToHms(seconds: any) {
  //   if (!seconds) return "00:00:00";
  //   const hours = Math.floor(seconds / 3600);
  //   const minutes = Math.floor((seconds % 3600) / 60);
  //   const secs = Math.floor(seconds % 60);

  //   // Format with leading zeros if needed
  //   const formattedHours = String(hours).padStart(2, '0');
  //   const formattedMinutes = String(minutes).padStart(2, '0');
  //   const formattedSeconds = String(secs).padStart(2, '0');

  //   return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  // }

function secondsToHms(seconds: any) {
  if (!seconds) return "۰۰:۰۰:۰۰"; // برای زمانی که ورودی صفر است

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  // تبدیل اعداد به فارسی با استفاده از toLocaleString
  const formattedHours = String(hours).padStart(2, '0').replace(/\d/g, (d) => String.fromCharCode(d.charCodeAt(0) + 1728));
  const formattedMinutes = String(minutes).padStart(2, '0').replace(/\d/g, (d) => String.fromCharCode(d.charCodeAt(0) + 1728));
  const formattedSeconds = String(secs).padStart(2, '0').replace(/\d/g, (d) => String.fromCharCode(d.charCodeAt(0) + 1728));
  console.log(formattedHours);
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}



  const renderLiveButton = () => {
    if (isLive) {
      return ((durr ?? 0) - (curr ?? 0)) < 30 ? (
        <div
          onClick={() => {
            setToMax();
          }}
          className="px-2 text-[9px] md:text-[12px] flex bg-red-800 gap-1 rounded-xl justify-center items-center cursor-pointer">
          <div className="w-1 h-1 rounded-full bg-white"></div>
          <p className="text-[10px] text-white">زنده</p>
        </div>
      ) : (
        <div
          onClick={() => {
            setToMax();
          }}
          className="px-2 text-[9px] md:text-[12px] flex bg-white gap-1 rounded-xl justify-center items-center cursor-pointer"
        >
          <div className="w-1 h-1 rounded-full bg-red-800"></div>
          <p className="text-[10px] text-black">زنده</p>
        </div>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM20 18c1.26-1.67 2-3.75 2-6s-.74-4.33-2-6M4 6c-1.26 1.67-2 3.75-2 6s.74 4.33 2 6M16.8 15.6c.75-1 1.2-2.25 1.2-3.6s-.45-2.6-1.2-3.6M7.2 8.4C6.45 9.4 6 10.65 6 12s.45 2.6 1.2 3.6"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      );
    }
  }

  return (
    <>
      <div className={`pb-[10px] z-10000 bottom-0 bg-opacity-70 opacity-100 transition-opacity duration-300 ease-linear w-[100%] flex flex-col absolute ${controlsVisible ? "block" : "hidden"}`}
          style={{
            background: "linear-gradient(to top, rgba(20, 20, 20, 0.8), rgba(20, 20, 20, 0.1))",
            animation: "fadeIn 2s ease-in-out forwards",
        
          }}
      >
        <div dir="ltr" className="px-[10px] w-[100%] progress-container flex flex-row justify-center items-center">
          {renderLiveButton()}
          <input

            type="range"
            min="0"
            max="100"
            step={0.05}
            value={progress}
            onChange={handleProgressChange}
            className="progress-bar ms-1"
            style={{
              overflow: 'visible',
              background: `linear-gradient(to right, #ff0000 ${progress}%, #ddd ${progress}%)`,
            }}
          />
        </div>

        <div className="relative flex justify-between  px-[5px]">
          <div className="flex justify-center items-center ">

            <div onClick={onFullscreenToggle} className="px-[5px]">
              {fullscreen ? <FullScreenExitSvg /> : <FullScreenSvg />}

            </div>
            <div className="relative">

              <RiSettings5Fill
                className="text-2xl cursor-pointer text-white pl-[5px]"

                onClick={() => setShowQualityMenu(!showQualityMenu)}
              />

              {showQualityMenu && (
                <div className="quality-drop-up text-white bg-[#131313] absolute bottom-10">
                  <div
                    onClick={() => handleQualityChange("Auto", DefaultURL)}
                    className={` text-center cursor-pointer ${currentQuality === "Auto" ? "bg-orange-500" : "hover:bg-gray-700"
                      }`}
                  >
                    Auto
                  </div>
                  {qualityOptions.map((option) => (
                    <div
                      key={option.label}
                      onClick={() => handleQualityChange(option.label, option.url)}
                      className={`p-2 cursor-pointer text-center  w-[150px] ${currentQuality === option.label ? "bg-orange-500" : "hover:bg-gray-700"
                        }`}
                    >
                      {option.label}
                    </div>
                  ))}

                </div>
              )}


            </div>
            <div className="flex justify-center items-center volume-container">


              <div className="ltr text-blue-500 text-lg flex justify-center items-center">
                <div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="volume-bar hidden  md:block"
                    style={{
                      direction: "ltr",
                      overflow: 'visible',
                      background: `linear-gradient(to right, #ff0000 ${isMuted ? 0 : volume * 100}%, #ddd ${isMuted ? 0 : volume * 100}%)`,
                    }}
                  />
                </div>


              </div>
              <div
                className="text-xl text-white mx-2 cursor-pointer hover:text-[#f39c12]"
                onClick={handleMuteToggle}
              >

                {isMuted ? <VolumeMute /> : <VolumeUp />}
              </div>
            </div>

          </div>

          <div className="flex items-center">

            <p className="text-white pl-[5px]">{secondsToHms(curr)}/{secondsToHms(durr)}</p>


            <MdOutlineForward10 onClick={() => skipTime(10)} className="text-xl text-white  ml-[8px] cursor-pointer transition-colors duration-300 ease-linear hover:text-[#f39c12]" />
            <MdOutlineReplay10 onClick={() => skipTime(-10)} className="text-xl text-white cursor-pointer transition-colors duration-300 ease-linear hover:text-[#f39c12]" />


            <div className="text-base mx-2 z-100  font-bold cursor-pointer text-white text-[18px] hover:text-[#f39c12]" onClick={onPlayPause}>
              {isPlaying ? <IoMdPause style={{ color: "white" }} /> : <FaPlay />}
            </div>

          </div>

        </div>


      </div>
    </>
  )
}

export default VideoControlls