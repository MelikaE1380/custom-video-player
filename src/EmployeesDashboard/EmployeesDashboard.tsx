// import React from 'react'
// import EmployeesMainTable from './components/EmployeesMainTable'
// import MusicPlayer from './components/VideoPlayer'
import VideoPlayer from "./components/VideoPlayer"

const EmployeesDashboard = () => {
    return (
        <>
            <VideoPlayer
                // initialUrl='https://ncdn.telewebion.com/tv3/live/playlist.m3u8'
                // initialUrl='https://ontv.arvanvod.ir/eZB2anykqP/5LJd3JAv6k/h_,144_200,240_400,360_800,480_1500,720_2090,1080_2090,k.mp4.list/master.m3u8'
                initialUrl='https://ontv.arvanlive.ir/hls/on2/on2.m3u8'
                customStyles={{ container: '' }}
            />
            {/* <EmployeesMainTable /> */}

        </>
    )
}

export default EmployeesDashboard


