const os = require("node-os-utils");
const si = require("systeminformation");


const cpu = os.cpu;

async function perfData(socket, id) {
    try {
        const cpuUsageInPercentage = await cpu.usage();
        const cpuInfo = await si.cpu();
        // const systemInfo = await si.system();
        const osInfo = await si.osInfo();
        const ramInfo = await si.mem();
        const batteryInfo = await si.battery();
        // const driveInfo = await drive.getDiskInfo();
        socket.emit("perfData", { id, data: { cpuUsageInPercentage, osInfo, ramInfo, batteryInfo, cpuInfo } });
    } catch (error) {
        socket.disconnect();
        throw new Error(`Please Install All dependencies or Program Not Suported In Your System ${error.message}`,);
        //when error happend disconnect socket

    }

}

module.exports = perfData;