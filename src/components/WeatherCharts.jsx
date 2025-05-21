import React, { useEffect, useState } from "react";
import { getWindDirection } from "../api/weatherUtils";
const API_KEY = "fbed159456078512625fc3667e773801";

import {
  Line,
  Bar,
  Doughnut,
  Pie,
  Radar,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  RadarController,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);


const WeatherCharts = ({ lat, lon }) => {
  const [forecast, setForecast] = useState([]);
  const [activeTab, setActiveTab] = useState("linea");

  useEffect(() => {
    if (!lat || !lon) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=es&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const daily = data.list.filter((item) => item.dt_txt.includes("12:00:00"));
        const formatted = daily.map((item) => ({
          day: new Date(item.dt * 1000).toLocaleDateString("es-ES", {
            weekday: "short",
          }),
          temp: Math.round(item.main.temp),
          humidity: item.main.humidity,
          wind: {
            speed: Math.round(item.wind.speed * 3.6),
            direction: getWindDirection(item.wind.deg),
          },
          icon: item.weather[0].icon,
        }));
        setForecast(formatted);
      });
  }, [lat, lon]);

  const chartData = {
    labels: forecast.map((f) => f.day),
    datasets: [
      {
        label: "Temperatura (°C)",
        data: forecast.map((f) => f.temp),
        backgroundColor: "#60a5fa",
        borderColor: "#60a5fa",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointBackgroundColor: "#60a5fa",
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  const chartTabs = [
    { key: "linea", label: "Línea", component: Line },
    { key: "barra", label: "Barras", component: Bar },
    { key: "dona", label: "Dona", component: Doughnut },
    { key: "pastel", label: "Pastel", component: Pie },
    { key: "radar", label: "Radar", component: Radar },
  ];

  const ActiveChart = chartTabs.find((tab) => tab.key === activeTab)?.component;

  return (
    <div className="mt-10 max-w-md mx-auto">
      <div className="text-white text-lg mb-2 text-center">Pronóstico de 5 días</div>

      {/* Tarjetas de resumen */}
      <div className="flex gap-2 overflow-x-auto mb-6">
        {forecast.map((f, idx) => (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-3 w-24 text-center border border-white/10 shadow-sm hover:bg-white/10 transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="text-xs font-medium mb-1 opacity-80">{f.day}</div>
            <img
              src={`https://openweathermap.org/img/wn/${f.icon}@2x.png`}
              alt="icono clima"
              className="w-10 h-10 mx-auto"
            />
            <div className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              {f.temp}°C
            </div>
            <div className="text-xs opacity-70">💧 {f.humidity}%</div>
            <div className="text-xs opacity-70">💨 {f.wind.speed} km/h</div>
            <div className="text-xs opacity-70">{f.wind.direction}</div>
          </div>
        ))}
      </div>

      {/* Tabs de gráfico */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {chartTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium ${
              activeTab === tab.key
                ? "bg-white text-[#2c2a72]"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gráfico activo */}
      {forecast.length > 0 && ActiveChart && (
        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow">
          <ActiveChart data={chartData} options={commonOptions} />
        </div>
      )}
    </div>
  );
};

export default WeatherCharts;
