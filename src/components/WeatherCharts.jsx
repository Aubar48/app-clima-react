import React, { useState } from "react";
import { useForecast } from "../hooks/useForecast";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
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
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const WeatherCharts = ({ lat, lon }) => {
  const forecast = useForecast(lat, lon);
  const [activeTab, setActiveTab] = useState("linea");

  const chartTabs = [
    { key: "linea", label: "Línea", component: Line },
    { key: "barra", label: "Barras", component: Bar },
    { key: "dona", label: "Dona", component: Doughnut },
  ];

  const colorPalette = ["#60a5fa", "#34d399", "#fbbf24", "#f472b6", "#a78bfa"];

  const chartData = {
    labels: forecast.map((f) => f.day),
    datasets: [
      {
        label: "Temperatura (°C)",
        data: forecast.map((f) => f.temp),
        backgroundColor:
          activeTab === "barra" || activeTab === "dona"
            ? forecast.map((_, i) => colorPalette[i % colorPalette.length])
            : "#60a5fa",
        borderColor: "#60a5fa",
        borderWidth: 2,
        fill: activeTab === "linea",
        tension: 0.3,
        pointBackgroundColor: "#60a5fa",
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
    scales:
      activeTab !== "dona"
        ? {
            x: {
              ticks: { color: "#fff" },
              grid: { display: false },
            },
            y: {
              ticks: { color: "#fff" },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
          }
        : {},
  };

  const ActiveChart = chartTabs.find((tab) => tab.key === activeTab)?.component;

  return (
    <div className="mt-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-white text-lg mb-4 text-center font-semibold">
        Pronóstico de 5 días
      </div>

      {/* Tarjetas de resumen */}
      <div className="flex flex-col sm:flex-row gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent mb-6 px-2 max-w-full">

        {forecast.map((f, idx) => (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-3 min-w-[72px] sm:min-w-[96px] flex-shrink-0 text-center border border-white/10 shadow-sm hover:bg-white/10 transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="text-xs font-medium mb-1 opacity-80">{f.day}</div>
            <img
              src={`https://openweathermap.org/img/wn/${f.icon}@2x.png`}
              alt="icono clima"
              className="w-8 h-8 sm:w-10 sm:h-10 mx-auto"
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
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {chartTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium min-w-[60px] ${
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
        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow min-h-[280px] sm:min-h-[320px]">
          <ActiveChart
            data={chartData}
            options={commonOptions}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherCharts;
