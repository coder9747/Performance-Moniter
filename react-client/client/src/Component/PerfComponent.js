import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function calculateColor(value) {
    if (value <= 30) return 'green';
    else if (value > 30 && value <= 50) return 'yellow';
    else if (value > 50 && value <= 75) return 'orange';
    return 'red';
}

const PerfComponent = (prop) => {
    const { data, nameOfUser } = prop;
    const { batteryInfo, cpuInfo, cpuUsageInPercentage, osInfo, ramInfo } = data;
    //extracting batteryInfo
    const { isCharging, percent, cycleCount, capacityUnit, currentCapacity, designedCapacity, maxCapacity } = batteryInfo;
    //extracting cpuInfo
    const { brand, cores, physicalCores, processors, speedMax, speedMin, } = cpuInfo;
    //extracting osInfo
    const { arch, distro, hostname, platform } = osInfo;
    //extracting ramInfo
    const { total, free, used } = ramInfo
    const color = calculateColor(cpuUsageInPercentage);
    return (
        <div className='item'>
            <h4 className='client-name'>{nameOfUser}</h4>
            <CircularProgressbar
                text={cpuUsageInPercentage + "%"}
                value={cpuUsageInPercentage}
                styles={buildStyles({
                    rotation: 0.5,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                    // Text size
                    textSize: '16px',
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,
                    // Can specify path transition in more detail, or remove it entirely
                    // Colors
                    pathColor: color,
                    textColor: color,
                    backgroundColor: '#3e98c7',
                })}
                strokeWidth={7}
                className='progress-bar'
            />
            <div className='items' >
                <div className='info-items'>
                    <h6>Battery Info <i className="fa-solid fa-battery-full"></i></h6>
                    <h4>Charging {isCharging ? "On" : "Off"}</h4>
                    <h4>Percentage {percent}% </h4>
                    <h4>cycleCount {cycleCount} </h4>
                    <h4>Current Cap {currentCapacity} {capacityUnit}  </h4>
                    <h4>
                        Designed Cap {designedCapacity}
                        {capacityUnit} </h4>
                    {/* <h4>maxCap {maxCapacity} {capacityUnit} </h4> */}

                    {/* <h4>Voltage 105  </h4> */}
                </div>
                <div className='info-items'>
                    <h6> Cpu Info <i className="fa-solid fa-microchip"></i></h6>

                    <h4>Brand {brand.slice(0, 10)}...</h4>
                    <h4>Cors {cores}</h4>
                    <h4>Physical Core {physicalCores}</h4>
                    <h4>Processor {processors}</h4>
                    <h4>Speed Max {speedMax}</h4>
                    <h4>Speed Min {speedMin}</h4>
                </div>
                <div className='info-items'>
                    <h6>System Info <i className="fa-solid fa-laptop"></i></h6>
                    <h4>Platform {platform.slice(0, 10)}</h4>
                    <h4>Arch {arch}</h4>
                    {/* <h4>Destro {distro.slice(0, 10)}...</h4> */}
                    <h4>Hostname {hostname.slice(0, 30)}...</h4>
                </div>
                <div className='info-items'>
                    <h6>Ram Info <i className="fa-solid fa-memory"></i></h6>
                    {/* <h4>Available {}</h4> */}
                    <h4>Free {(free / (1024 * 1024 * 1024)).toFixed(2)} GB</h4>
                    <h4>Total {(total / (1024 * 1024 * 1024)).toFixed(2)} GB</h4>
                    <h4>Used {(used / (1024 * 1024 * 1024)).toFixed(2)} GB</h4>
                </div>
            </div>
        </div>

    )
}

export default PerfComponent
