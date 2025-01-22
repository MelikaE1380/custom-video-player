// import Hls from 'hls.js';
// import React, { useEffect, useRef } from 'react'

// const IosPlayer = () => {
// const videoRef = useRef<HTMLVideoElement>(null);
// const initialURL = 'https://ontv.arvanlive.ir/hls/on2/on2.m3u8';

// useEffect(() => {
//     if (!videoRef.current) return;

//     const video = videoRef.current;

//     // بررسی پشتیبانی از HLS بومی
//     const canPlayNativeHls = (video: HTMLVideoElement) =>
//       video.canPlayType('application/vnd.apple.mpegurl') !== '';

//     if (canPlayNativeHls(video)) {
//       // استفاده از پخش بومی (Safari/iOS)
//       video.src = initialURL;
//       video.play().catch((error:any) => {
//         console.error('Error attempting to play video:', error);
//       });

//       return () => {
//         video.src = ''; // پاک کردن src بعد از تغییر ویدیو
//       };
//     } else if (Hls.isSupported()) {
//       // اگر HLS.js پشتیبانی می‌شود
//       const hls = new Hls();
//       hls.loadSource(initialURL);
//       hls.attachMedia(video);

//       hls.on(Hls.Events.MANIFEST_PARSED, function () {
//         video.play().catch((error: any) => {
//           console.error('Error attempting to play video:', error);
//         });
//       });

//       return () => {
//         hls.destroy();
//       };
//     } else {
//       console.error('HLS is not supported on this device/browser.');
//     }
//   }, [initialURL]);

//   return (
//    <>
//    {/* preload="auto"  autoPlay muted playsInline */}
//     <div>IosPlayer</div>
//     <video ref={videoRef} id="audioPlayer" className='custom-video-player min-w-full min-h-full' controls >
//             مرورگر شما از ویدیو پشتیبانی نمی کند.
//           </video>
//    </>
//   )
// }

// export default IosPlayer