// import React, { useEffect, useRef, useState } from "react";
// import Hls from "hls.js";

// import PlaySvg from "../../../assets/svg/PlaySvg";
// import './styles/styles.css'
// import VideoControlls from "./components/VideoControlls";
// import { Link } from "react-router-dom";

// const DEFAULT_FALLBACK_URL = "https://ontv.arvanlive.ir/hls/on2/on2.m3u8";

// interface QualityOption {
//   label: string;
//   url: string;
// }

// interface IVideoPlayerProps {
//   initialUrl: string;
//   initialVolume?: number;
//   initialMuted?: boolean;
//   autoPlay?: boolean;
//   customStyles?: {
//     container?: string;
//     video?: string;
//   };
//   onPlay?: () => void;
//   onPause?: () => void;
//   onQualityChange?: (quality: string) => void;
// }

// const VideoPlayer: React.FC<IVideoPlayerProps> = ({
//   initialUrl = "",
//   initialVolume = 0.5,
//   initialMuted = true,
//   autoPlay = false,
//   customStyles = {},
//   onPlay = () => { },
//   onPause = () => { },
//   onQualityChange = () => { },
// }: IVideoPlayerProps) => {

//   const [controlsVisible, setControlsVisible] = useState<boolean>(false);


//   const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);
//   const [qualityOptions, setQualityOptions] = useState<QualityOption[]>([]);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const videoContainerRef = useRef<HTMLDivElement | null>(null);
//   const inactivityTimeout = useRef<NodeJS.Timeout | null>(null);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);

//   const [progress, setProgress] = useState<number>(0);

//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isLive, setIsLive] = useState<boolean>(false);
//   const [fullscreen, setFullScreen] = useState<boolean>(false);


//   const handlePlayPause = () => {
//     const videoElement = document.getElementById("audioPlayer") as HTMLVideoElement;

//     if (videoElement) {
//       if (controlsVisible) {
//         setIsPlaying((prevIsPlaying) => {
//           if (prevIsPlaying) {
//             videoElement.pause();
//           } else {
//             videoElement.play();
//           }
//           return !prevIsPlaying;
//         });
//       }
//       else {
//         setControlsVisible(true);
//       }

//     }
//   };



//   const resetInactivityTimeout = () => {
//     if (inactivityTimeout.current) {
//       clearTimeout(inactivityTimeout.current);
//     }
//     inactivityTimeout.current = setTimeout(() => {
//       setControlsVisible(false);
//     }, 7000);
//   };

//   useEffect(() => {
//     const handleMouseMove = () => {
//       setControlsVisible(true);
//       resetInactivityTimeout();
//     };

//     const videoContainer = videoContainerRef.current;
//     if (videoContainer) {
//       videoContainer.addEventListener("mousemove", handleMouseMove);

//     }

//     return () => {
//       if (videoContainer) {
//         videoContainer.removeEventListener("mousemove", handleMouseMove);
//       }
//       if (inactivityTimeout.current) {
//         clearTimeout(inactivityTimeout.current);
//       }
//     };
//   }, []);


//   // useEffect(() => {
//   //   if (!videoRef.current) return;

//   //   const hls = new Hls({
//   //     liveSyncDurationCount: 2,
//   //     liveMaxLatencyDurationCount: 3,
//   //     maxBufferHole: 0.5,
//   //     maxLiveSyncPlaybackRate: 1.2,
//   //     lowLatencyMode: true,
//   //   });
//   //   const video = videoRef.current;

//   //   hls.attachMedia(video);
//   //   hls.loadSource(initialUrl);

//   //   // hls.on(Hls.Events.MEDIA_ATTACHED, () => {
//   //   // });
//   //   console.log({ LEVEL_LOADED: 'LEVEL_LOADED' })
//   //   hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
//   //     console.log(`Level ${data.level} loaded`);
//   //     if (data.details.live) {
//   //       console.log('The stream is live.');
//   //       setIsLive(true)
//   //     } else {
//   //       setIsLive(false)
//   //       console.log('The stream is VOD.');
//   //     }
//   //   });


//   //   // const interval = setInterval(() => {
//   //   //   console.log({ latency: hls.latency })
//   //   //   if (hls.latency !== undefined) {
//   //   //     const currentLiveEdge = video.currentTime + hls.latency;
//   //   //     console.log({ latency: hls.latency, currentLiveEdge })
//   //   //     setLiveEdge(currentLiveEdge);
//   //   //   }
//   //   // }, 1000);

//   //   hls.on(Hls.Events.MANIFEST_PARSED, () => {
//   //     setDuration(video.duration); // Set initial duration if available
//   //   });

//   //   video.addEventListener('timeupdate', () => {
//   //     const duration = video.duration || hls.media?.duration || 0;   //infinity
//   //     setCurrentTime(video.currentTime); // Update current time on playback
//   //     setDuration(video.duration || hls.media?.duration || 0); // Update duration dynamically
//   //     setProgress((video.currentTime / duration) * 100)
//   //   });

//   //   return () => {
//   //     // clearInterval(interval);
//   //     hls.destroy();
//   //   };
//   // }, []);


//   // useEffect(() => {
//   //   if (!videoRef.current) return;

//   //   const video = videoRef.current;

//   //   // بررسی پشتیبانی از HLS بومی
//   //   const canPlayNativeHls = (video: HTMLVideoElement) =>
//   //     video.canPlayType('application/vnd.apple.mpegurl') !== '';

//   //   if (canPlayNativeHls(video)) {
//   //     // استفاده از پخش بومی
//   //     video.src = initialUrl;
//   //     video.addEventListener('timeupdate', () => {
//   //       const duration = video.duration || 0;
//   //       setCurrentTime(video.currentTime);
//   //       setDuration(duration);
//   //       setProgress((video.currentTime / duration) * 100);
//   //     });
//   //   } else if (Hls.isSupported()) {
//   //     // استفاده از HLS.js
//   //     const hls = new Hls();

//   //     hls.attachMedia(video);
//   //     hls.loadSource(initialUrl);

//   //     hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
//   //       console.log(`Level ${data.level} loaded`);
//   //       if (data.details.live) {
//   //         console.log('The stream is live.');
//   //         setIsLive(true);
//   //       } else {
//   //         console.log('The stream is VOD.');
//   //         setIsLive(false);
//   //       }
//   //     });

//   //     hls.on(Hls.Events.MANIFEST_PARSED, () => {
//   //       setDuration(video.duration); // Set initial duration if available
//   //     });

//   //     video.addEventListener('timeupdate', () => {
//   //       const duration = video.duration || hls.media?.duration || 0;
//   //       setCurrentTime(video.currentTime);
//   //       setDuration(duration);
//   //       setProgress((video.currentTime / duration) * 100);
//   //     });

//   //     return () => {
//   //       hls.destroy();
//   //     };
//   //   } else {
//   //     console.error('HLS is not supported on this device/browser.');
//   //   }
//   // }, [initialUrl]);




//   useEffect(() => {
//     if (!videoRef.current) return;

//     const video = videoRef.current;

//     // بررسی پشتیبانی از HLS بومی
//     const canPlayNativeHls = (video: HTMLVideoElement) =>
//       video.canPlayType('application/vnd.apple.mpegurl') !== '';

//     if (canPlayNativeHls(video)) {
//       // استفاده از پخش بومی
//       video.src = initialUrl;
      
//       video.play(); // برای اطمینان از پخش خودکار پس از تغییر src
//       video.addEventListener('timeupdate', () => {
//         const duration = video.duration || 0;
//         setCurrentTime(video.currentTime);
//         setDuration(duration);
//         setProgress((video.currentTime / duration) * 100);
//       });
//     } else if (Hls.isSupported()) {
//       // استفاده از HLS.js
//       const hls = new Hls();
//       hls.attachMedia(video);
//       hls.loadSource(initialUrl);

//       hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
//         console.log(`Level ${data.level} loaded`);
//         if (data.details.live) {
//           console.log('The stream is live.');
//           setIsLive(true);
//         } else {
//           console.log('The stream is VOD.');
//           setIsLive(false);
//         }
//       });

//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         setDuration(video.duration); // Set initial duration if available
//       });

//       video.addEventListener('timeupdate', () => {
//         const duration = video.duration || hls.media?.duration || 0;
//         setCurrentTime(video.currentTime);
//         setDuration(duration);
//         setProgress((video.currentTime / duration) * 100);
//       });

//       return () => {
//         hls.destroy();
//       };
//     } else {
//       console.error('HLS is not supported on this device/browser.');
//     }
//   }, [initialUrl]);

//   console.log(initialUrl);
//   const hlsUrl = ""



//   const fetchAndParseM3U8 = async (url: string) => {

//     if (!url) return;
//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         cache: "no-store",
//         headers: {
//           "Cache-Control": "no-cache, no-store, must-revalidate",
//           Pragma: "no-cache",
//           Expires: "0",
//         },
//       });

//       console.log({ response })

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }


//       const baseUrl = url.substring(0, url.lastIndexOf('/')) + "/";
//       console.log({ baseUrl });

//       const text = await response.text();

//       const qualities: QualityOption[] = [];
//       const lines = text.split("\n");
//       for (let i = 0; i < lines.length; i++) {
//         if (lines[i].startsWith("#EXT-X-STREAM-INF")) {
//           const resolutionMatch = lines[i].match(/RESOLUTION=(\d+)x(\d+)/);
//           const height = resolutionMatch ? parseInt(resolutionMatch[2]) : null;
//           const quality = height ? `${height}p` : "Unknown";
//           const extractedUrl = lines[i + 1] ? `${baseUrl}${lines[i + 1].trim()}` : "Unknown";
//           qualities.push({ label: quality, url: extractedUrl });
//         }
//       }

//       console.log({ qualities });
//       setQualityOptions(qualities);
//     } catch (error) {
//       console.error("Error fetching or parsing m3u8 file:", error);
//     }
//   };


//   const fullScreenClickHandler = () => {
//     const videoContainer = videoContainerRef.current;
//     const videoElement = videoRef.current;

//     setFullScreen((prevFullscreen) => {
//       if (!prevFullscreen && videoContainer) {

//         if ((videoContainer as any).requestFullscreen) {
//           (videoContainer as any).requestFullscreen();

//           // videoRef.current?.requestFullscreen();
//         } else if ((videoContainer as any)?.webkitRequestFullscreen) {
//           (videoContainer as any).webkitRequestFullscreen();
//         }else if((videoContainer as any).msRequestFullscreen){
//         (videoContainer as any).msRequestFullscreen();
//         }
//       } else {

//         if (document.exitFullscreen) {
//           document.exitFullscreen();
//         } else if ((document as any).webkitExitFullscreen) {
//           (document as any).webkitExitFullscreen();
//         }
//       }

//       return !prevFullscreen;
//     });
//   };


//   useEffect(() => {

//     fetchAndParseM3U8(initialUrl);
//     loadVideo(initialUrl);
//     return () => {
//       if (hlsInstance) {
//         hlsInstance.destroy();
//       }
//     };
//   }, [initialUrl]);

//   const loadVideo = (url: string) => {
//     const videoElement = videoRef.current;

//     if (hlsInstance) {
//       hlsInstance.stopLoad();
//       hlsInstance.detachMedia();
//       hlsInstance.destroy();
//       setHlsInstance(null);
//     }

//     if (Hls.isSupported()) {
//       const hls = new Hls({
//         // liveSyncDurationCount: 2,
//         // liveMaxLatencyDurationCount: 3,
//         // maxBufferHole: 0.5,
//         // maxLiveSyncPlaybackRate: 1.2,
//         // lowLatencyMode: true,
//       });
//       hls.loadSource(url);
//       hls.attachMedia(videoRef.current!);

//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         videoElement?.play().catch((err) => {
//           setHlsInstance(hls);
//           console.error("Error trying to play the video:", err);
//         });
//       });

//       hls.on(Hls.Events.ERROR, (event, data) => {
//         console.error("HLS.js error:", data);
//       });

//       setHlsInstance(hls);
//     } else if (videoElement?.canPlayType("application/vnd.apple.mpegurl")) {
//       videoElement.src = url;
//       videoElement?.addEventListener("loadedmetadata", () => {
//         videoElement.play().catch((err) => {
//           console.error("Error trying to play the video (native HLS):", err);
//         });
//       });
//     } else {
//       console.error("HLS.js is not supported in this browser.");
//     }
//   };





//   const handleMouseEnter = () => setControlsVisible(true);
//   const handleMouseLeave = () => setControlsVisible(false);



//   useEffect(() => {
//     const videoElement = document.getElementById("audioPlayer") as HTMLVideoElement;

//     const handlePlay = () => {
//       setIsPlaying(true);

//     };
//     const handlePause = () => setIsPlaying(false);

//     if (videoElement) {

//       videoElement.addEventListener("play", handlePlay);
//       videoElement.addEventListener("pause", handlePause);
//     }


//     return () => {
//       if (videoElement) {
//         videoElement.removeEventListener("play", handlePlay);
//         videoElement.removeEventListener("pause", handlePause);
//       }
//     };
//   }, []);


//   useEffect(() => {
//     const videoElement = videoRef.current;

//     if (videoElement) {
//       videoElement.play().catch((err) => {
//         console.error("Error trying to play the video automatically:", err);
//       });
//     }
//   }, []);

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setFullScreen(!!document.fullscreenElement);
//     };

//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     return () => {
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//     };
//   }, []);

//   return (
//     <>
//     <div
//       ref={videoContainerRef}
//       className={`mx-auto relative max-w-[800px] w-full flex justify-center aspect-video items-center bg-black ${customStyles.container}`}
//       onMouseMove={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <div className="relative w-[100%] h-[100%] flex justify-center items-center">
//         <div className="min-w-[100%] min-h-[100%] flex justify-center items-center">

//           <video ref={videoRef} id="audioPlayer" className={`custom-video-player min-w-full min-h-full ${customStyles.video}`} preload="auto"  autoPlay muted playsInline onDoubleClick={fullScreenClickHandler} onClick={handlePlayPause}>
//             مرورگر شما از ویدیو پشتیبانی نمی کند.
//           </video>
//         </div>
//         <div className="absolute z-100 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer" onClick={handlePlayPause}>
//           {!isPlaying ? <PlaySvg /> : null}
//         </div>
//       </div>


//       <VideoControlls
//         progress={progress}
//         fullscreen={fullscreen}
//         setProgress={setProgress}
//         isPlaying={isPlaying}
//         isMuted={true}
//         curr={currentTime}
//         durr={duration}
//         controlsVisible={controlsVisible}
//         isLive={isLive}
//         volume={1}
//         videoRefrence={videoRef}
//         videoContainerRefrence={videoContainerRef}
//         onFetchAndParse={fetchAndParseM3U8}
//         handleLoadVideo={loadVideo}
//         hlsInstance={hlsInstance}
//         qualityOptions={qualityOptions}
//         currentQuality=''
//         onFullscreenToggle={fullScreenClickHandler}
//         DefaultURL={DEFAULT_FALLBACK_URL}
//         onPlayPause={handlePlayPause}
//       />

//     </div>
//     <Link to='/ios'>
// <button>Go to ios component</button>
// </Link>
//     </>
//   );
// };

// export default VideoPlayer;





import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

import PlaySvg from "../../../assets/svg/PlaySvg";
import './styles/styles.css'
import VideoControlls from "./components/VideoControlls";
import { Link } from "react-router-dom";

const DEFAULT_FALLBACK_URL = "https://ontv.arvanlive.ir/hls/on2/on2.m3u8";

interface QualityOption {
  label: string;
  url: string;
}

interface IVideoPlayerProps {
  initialUrl: string;
  initialVolume?: number;
  initialMuted?: boolean;
  autoPlay?: boolean;
  customStyles?: {
    container?: string;
    video?: string;
  };
  onPlay?: () => void;
  onPause?: () => void;
  onQualityChange?: (quality: string) => void;
}

const VideoPlayer: React.FC<IVideoPlayerProps> = ({
  initialUrl = "",
  initialVolume = 0.5,
  initialMuted = true,
  autoPlay = false,
  customStyles = {},
  onPlay = () => { },
  onPause = () => { },
  onQualityChange = () => { },
}: IVideoPlayerProps) => {

  const [controlsVisible, setControlsVisible] = useState<boolean>(false);


  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);
  const [qualityOptions, setQualityOptions] = useState<QualityOption[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const inactivityTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [progress, setProgress] = useState<number>(0);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [fullscreen, setFullScreen] = useState<boolean>(false);

  const [isIos, setIsIos] = useState(false);

  


  // useEffect(() => {
  //   const detectIos = () => {
  //     const userAgent = navigator.userAgent.toLowerCase();
  
  //     const userAgentData = (navigator as any).userAgentData;
  
  //     if (userAgentData && userAgentData.platform) {
  //       const platform = userAgentData.platform.toLowerCase();
  //       if (platform.includes('iphone') || platform.includes('ipad') || platform.includes('ipod')) {
  //         setIsIos(true);
  //         console.log('دستگاه ios میباشد');
  //         return;
  //       }
  //     }
  

  //     if (
  //       userAgent.includes('iphone') ||
  //       userAgent.includes('ipad') ||
  //       userAgent.includes('ipod')
  //     ) {
  //       setIsIos(true);
  //       console.log('دستگاه ios میباشد');
  //     } else {
  //       console.log('نیست نیست');
  //       setIsIos(false);
  //     }
  //   };
  
  //   detectIos();
  // }, []);
  


  const detectIos = () => {
    // بررسی userAgent
    const userAgent = navigator.userAgent.toLowerCase();
  
    // بررسی userAgentData (فقط در مرورگرهای جدید)
    const userAgentData = (navigator as any).userAgentData;
  
    if (userAgentData && userAgentData.platform) {
      const platform = userAgentData.platform.toLowerCase();
      if (
        platform === 'iphone' || 
        platform === 'ipad' || 
        platform === 'ipod'
      ) {
        setIsIos(true);
        console.log('دستگاه ios میباشد');
        return;
      }
    }
  
    // fallback: بررسی userAgent
    if (
      userAgent.includes('iphone') ||
      userAgent.includes('ipad') ||
      userAgent.includes('ipod')
    ) {
      setIsIos(true);
      console.log('دستگاه ios میباشد');
    } else {
      console.log('نیست نیست');
      setIsIos(false);
    }
  };
  
  // نمایش اطلاعات مرورگر برای اشکال‌زدایی
  console.log("navigator.userAgent:", navigator.userAgent);
  console.log("navigator.userAgentData:", (navigator as any).userAgentData);
  
  // بررسی قابلیت‌های خاص Safari
  const detectIosWithSafariCheck = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
  
    if (isIosDevice && isSafari) {
      setIsIos(true);
      console.log('دستگاه ios میباشد');
    } else {
      setIsIos(false);
      console.log('نیست نیست');
    }
  };
  


  const handlePlayPause = () => {
    const videoElement = document.getElementById("audioPlayer") as HTMLVideoElement;

    if (videoElement) {
      if (controlsVisible) {
        setIsPlaying((prevIsPlaying) => {
          if (prevIsPlaying) {
            videoElement.pause();
          } else {
            videoElement.play();
          }
          return !prevIsPlaying;
        });
      }
      else {
        setControlsVisible(true);
      }

    }
  };



  const resetInactivityTimeout = () => {
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }
    inactivityTimeout.current = setTimeout(() => {
      setControlsVisible(false);
    }, 7000);
  };

  useEffect(() => {
    const handleMouseMove = () => {
      setControlsVisible(true);
      resetInactivityTimeout();
    };

    const videoContainer = videoContainerRef.current;
    if (videoContainer) {
      videoContainer.addEventListener("mousemove", handleMouseMove);

    }

    return () => {
      if (videoContainer) {
        videoContainer.removeEventListener("mousemove", handleMouseMove);
      }
      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current);
      }
    };
  }, []);






//   useEffect(() => {
//     if (!videoRef.current) return;
//     const video = videoRef.current;


//     if (isIos) {
//       if (videoRef.current) {
//         videoRef.current.src = initialUrl;
//         videoRef.current.play().catch((err) => console.error("Error:", err));
//       }
//       return;
//     }


//  else if (Hls.isSupported()) {

//       const hls = new Hls();
//       hls.attachMedia(video);
//       hls.loadSource(initialUrl);

//       hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
//         console.log(`Level ${data.level} loaded`);
//         if (data.details.live) {
//           console.log('The stream is live.');
//           setIsLive(true);
//         } else {
//           console.log('The stream is VOD.');
//           setIsLive(false);
//         }
//       });

//       hls.on(Hls.Events.MANIFEST_PARSED, () => {
//         setDuration(video.duration);
//       });

//       video.addEventListener('timeupdate', () => {
//         const duration = video.duration || hls.media?.duration || 0;
//         setCurrentTime(video.currentTime);
//         setDuration(duration);
//         setProgress((video.currentTime / duration) * 100);
//       });

//       return () => {
//         hls.destroy();
//       };
//     } else {
//       console.error('HLS is not supported on this device/browser.');
//     }
//   }, [initialUrl,isIos]);


useEffect(() => {
  if (!videoRef.current) return;
  const video = videoRef.current;

  if (isIos) {
    // تنظیم URL برای دستگاه iOS
    if (video) {
      video.src = initialUrl;
      video
        .play()
        .catch((err) => console.error("Error playing video on iOS:", err));
    }
    return;
  }

  if (Hls.isSupported()) {
    // پشتیبانی از HLS.js
    const hls = new Hls();
    hls.attachMedia(video);
    hls.loadSource(initialUrl);

    hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
      console.log(`Level ${data.level} loaded`);
      setIsLive(data.details.live);
    });

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      setDuration(video.duration);
    });

    video.addEventListener("timeupdate", () => {
      const duration = video.duration || hls.media?.duration || 0;
      setCurrentTime(video.currentTime);
      setDuration(duration);
      setProgress((video.currentTime / duration) * 100);
    });

    hls.on(Hls.Events.ERROR, (event, data) => {
      console.error("HLS.js error:", data);
    });

    return () => {
      hls.destroy();
    };
  } else {
    console.error("HLS is not supported on this device/browser.");
  }
}, [initialUrl, isIos]);



  console.log(initialUrl);
  const hlsUrl = ""



  const fetchAndParseM3U8 = async (url: string) => {

    if (!url) return;
    try {
      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      console.log({ response })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      const baseUrl = url.substring(0, url.lastIndexOf('/')) + "/";
      console.log({ baseUrl });

      const text = await response.text();

      const qualities: QualityOption[] = [];
      const lines = text.split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("#EXT-X-STREAM-INF")) {
          const resolutionMatch = lines[i].match(/RESOLUTION=(\d+)x(\d+)/);
          const height = resolutionMatch ? parseInt(resolutionMatch[2]) : null;
          const quality = height ? `${height}p` : "Unknown";
          const extractedUrl = lines[i + 1] ? `${baseUrl}${lines[i + 1].trim()}` : "Unknown";
          qualities.push({ label: quality, url: extractedUrl });
        }
      }

      console.log({ qualities });
      setQualityOptions(qualities);
    } catch (error) {
      console.error("Error fetching or parsing m3u8 file:", error);
    }
  };


  const fullScreenClickHandler = () => {
    const videoContainer = videoContainerRef.current;
    const videoElement = videoRef.current;

    setFullScreen((prevFullscreen) => {
      if (!prevFullscreen && videoContainer) {

        if ((videoContainer as any).requestFullscreen) {
          (videoContainer as any).requestFullscreen();


        } else if ((videoContainer as any)?.webkitRequestFullscreen) {
          (videoContainer as any).webkitRequestFullscreen();
        }else if((videoContainer as any).msRequestFullscreen){
        (videoContainer as any).msRequestFullscreen();
        }
      } else {

        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        }
      }

      return !prevFullscreen;
    });
  };


  useEffect(() => {

    fetchAndParseM3U8(initialUrl);
    loadVideo(initialUrl);
    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, [initialUrl]);

  const loadVideo = (url: string) => {
    const videoElement = videoRef.current;

    if (hlsInstance) {
      hlsInstance.stopLoad();
      hlsInstance.detachMedia();
      hlsInstance.destroy();
      setHlsInstance(null);
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
  
      });
      hls.loadSource(url);
      hls.attachMedia(videoRef.current!);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement?.play().catch((err) => {
          setHlsInstance(hls);
          console.error("Error trying to play the video:", err);
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS.js error:", data);
      });

      setHlsInstance(hls);
    } else if (videoElement?.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = url;
      videoElement?.addEventListener("loadedmetadata", () => {
        videoElement.play().catch((err) => {
          console.error("Error trying to play the video (native HLS):", err);
        });
      });
    } else {
      console.error("HLS.js is not supported in this browser.");
    }
  };





  const handleMouseEnter = () => setControlsVisible(true);
  const handleMouseLeave = () => setControlsVisible(false);



  useEffect(() => {
    const videoElement = document.getElementById("audioPlayer") as HTMLVideoElement;

    const handlePlay = () => {
      setIsPlaying(true);

    };
    const handlePause = () => setIsPlaying(false);

    if (videoElement) {

      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("pause", handlePause);
    }


    return () => {
      if (videoElement) {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("pause", handlePause);
      }
    };
  }, []);


  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.play().catch((err) => {
        console.error("Error trying to play the video automatically:", err);
      });
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <>
     {isIos ? (   <><div>IosPlayer</div>
    <video ref={videoRef} id="audioPlayer" className='custom-video-player min-w-full min-h-full' controls >
            مرورگر شما از ویدیو پشتیبانی نمی کند.
          </video></>) : (
             <div
             ref={videoContainerRef}
             className={`mx-auto relative max-w-[800px] w-full flex justify-center aspect-video items-center bg-black`}
             onMouseMove={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
           >
             <div className="relative w-[100%] h-[100%] flex justify-center items-center">
               <div className="min-w-[100%] min-h-[100%] flex justify-center items-center">
       
                 <video ref={videoRef} id="audioPlayer" className={`custom-video-player min-w-full min-h-full ${customStyles.video}`} preload="auto"  autoPlay muted playsInline onDoubleClick={fullScreenClickHandler} onClick={handlePlayPause}>
                   مرورگر شما از ویدیو پشتیبانی نمی کند.
                 </video>
               </div>
               <div className="absolute z-100 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer" onClick={handlePlayPause}>
                 {!isPlaying ? <PlaySvg /> : null}
               </div>
             </div>
       
       
             <VideoControlls
               progress={progress}
               fullscreen={fullscreen}
               setProgress={setProgress}
               isPlaying={isPlaying}
               isMuted={true}
               curr={currentTime}
               durr={duration}
               controlsVisible={controlsVisible}
               isLive={isLive}
               volume={1}
               videoRefrence={videoRef}
               videoContainerRefrence={videoContainerRef}
               onFetchAndParse={fetchAndParseM3U8}
               handleLoadVideo={loadVideo}
               hlsInstance={hlsInstance}
               qualityOptions={qualityOptions}
               currentQuality=''
               onFullscreenToggle={fullScreenClickHandler}
               DefaultURL={DEFAULT_FALLBACK_URL}
               onPlayPause={handlePlayPause}
             />
 
           </div>
      
          )}
   
    </>
  );
};

export default VideoPlayer;









