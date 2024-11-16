"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/customs/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart, PieChart, Power } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const generateData = (count: number, min: number, max: number) => {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * (max - min + 1) + min),
  );
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Temperature Trend",
    },
  },
  scales: {
    x: {
      type: "category" as const,
    },
    y: {
      beginAtZero: true,
    },
  },
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "PIR Sensor Activity",
    },
  },
  scales: {
    x: {
      type: "category" as const,
    },
    y: {
      beginAtZero: true,
    },
  },
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [acStatus, setAcStatus] = useState(false);
  const [curtainsStatus, setCurtainsStatus] = useState(false);
  const [securityStatus, setSecurityStatus] = useState(false);
  const [lightToggle, setLightToggle] = useState(false);
  const [tvPower, setTvPower] = useState(false);
  const [volume, setVolume] = useState(10);
  const [channel, setChannel] = useState(1);
  const [wifiStatus, setWifiStatus] = useState(false);
  const [temperature, setTemperature] = useState(generateData(6, 20, 30));
  const [pirMovements, setPirMovements] = useState(generateData(7, 5, 20));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (acStatus || curtainsStatus) {
      // Example logic: If AC or curtains change, update temperature data
      setTemperature(generateData(6, 20, 30)); // Simulating temp change
    }
  }, [acStatus, curtainsStatus]);

  // Function to update PIR sensor data when security status changes
  useEffect(() => {
    if (securityStatus) {
      setPirMovements(generateData(7, 5, 20)); // Simulating sensor activity
    }
  }, [securityStatus]);

  const toggleAC = () => setAcStatus(!acStatus);
  const toggleCurtains = () => setCurtainsStatus(!curtainsStatus);
  const toggleSecurity = () => setSecurityStatus(!securityStatus);
  const toggleLight = () => setLightToggle(!lightToggle);
  const toggleTvPower = () => setTvPower(!tvPower);
  const increaseVolume = () => setVolume((prev) => Math.min(prev + 1, 100));
  const decreaseVolume = () => setVolume((prev) => Math.max(prev - 1, 0));
  const nextChannel = () => setChannel((prev) => prev + 1);
  const prevChannel = () => setChannel((prev) => Math.max(prev - 1, 1));
  const toggleWifi = () => setWifiStatus(!wifiStatus);

  const temperatureData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    datasets: [
      {
        label: "Temperature (°C)",
        // data: generateData(6, 20, 30),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const pirData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Movements Detected",
        // data: generateData(7, 5, 20),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  if (!mounted) return null;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen p-8 bg-gradient-to-br from-purple-800 to-slate-900/80 text-white">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Sensor Cards */}
          <Card className="bg-neutral-400/20 backdrop-blur-lg border-gray-600 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                PIR Sensor
              </CardTitle>
              <LineChart className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">15 movements</div>
              <p className="text-xs text-gray-200">+2 since last hour</p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-400/20 backdrop-blur-lg border-gray-600 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Temperature
              </CardTitle>
              <BarChart className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">23.5°C</div>
              <p className="text-xs text-gray-200">-0.5°C since last hour</p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-400/20 backdrop-blur-lg border-gray-600 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Gas Sensor
              </CardTitle>
              <PieChart className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Normal</div>
              <p className="text-xs text-gray-200">No gas leaks detected</p>
            </CardContent>
          </Card>
          <Card className="bg-neutral-400/20 backdrop-blur-lg border-gray-600 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                IR Sensor (TV)
              </CardTitle>
              <Power className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">TV Control</div>
              <div className="text-md font-semibold mt-2 text-neutral-200">
                Volume: {volume}
              </div>
              <div className="text-md font-semibold mt-2 text-neutral-200">
                Channel: {channel}
              </div>
              <div className="flex space-x-2 mt-2">
                <Button
                  size="sm"
                  variant={tvPower ? "default" : "outline"}
                  onClick={toggleTvPower}
                >
                  {tvPower ? "Turn Off" : "Turn On"}
                </Button>
              </div>

              <div className="flex space-x-2 mt-2">
                <Button size="sm" variant="outline" onClick={decreaseVolume}>
                  Volume -
                </Button>
                <Button size="sm" variant="outline" onClick={increaseVolume}>
                  Volume +
                </Button>
              </div>

              <div className="flex space-x-2 mt-2">
                <Button size="sm" variant="outline" onClick={prevChannel}>
                  Previous Channel
                </Button>
                <Button size="sm" variant="outline" onClick={nextChannel}>
                  Next Channel
                </Button>
              </div>

              <div className="flex space-x-2 mt-2">
                <Button
                  size="sm"
                  variant={wifiStatus ? "default" : "outline"}
                  onClick={toggleWifi}
                >
                  WiFi {wifiStatus ? "Connected" : "Disconnected"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Card className="bg-neutral-300/90 backdrop-blur-lg border-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800">Temperature Trend</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-800">
              <Line options={lineChartOptions} data={temperatureData} />
            </CardContent>
          </Card>
          <Card className="bg-neutral-300/90 backdrop-blur-lg border-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800">
                PIR Sensor Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-800">
              <Bar options={barChartOptions} data={pirData} />
            </CardContent>
          </Card>
          {/* Home automation controls */}
          <Card className="mt-6 bg-neutral-400/20 backdrop-blur-lg border-gray-600 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">
                Home Automation Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  className="w-full"
                  variant={acStatus ? "default" : "outline"}
                  onClick={toggleAC}
                >
                  AC {acStatus ? "On" : "Off"}
                </Button>
                <Button
                  className="w-full"
                  variant={curtainsStatus ? "default" : "outline"}
                  onClick={toggleCurtains}
                >
                  Curtains {curtainsStatus ? "Open" : "Closed"}
                </Button>
                <Button
                  className="w-full"
                  variant={securityStatus ? "default" : "outline"}
                  onClick={toggleSecurity}
                >
                  Security {securityStatus ? "Armed" : "Disarmed"}
                </Button>
                <Button
                  className="w-full"
                  variant={lightToggle ? "default" : "outline"}
                  onClick={toggleLight}
                >
                  Light {lightToggle ? "On" : "Off"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
