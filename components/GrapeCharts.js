'use client';
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

const GrapeCharts = ({ category }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = {
    HYBRIDS: {
      "Baco Noir": 17,
      "Brianna": 6,
      "Cayuga White": 31,
      "Chambourcin": 100,
      "Chancellor": 42,
      "Chardonel": 18,
      "Crimson Cabernet": 8,
      "De Chaunac": 26,
      "Foch": 63,
      "Frontenac": 34,
      "Frontenac Blanc": 12,
      "Frontenac Gris": 28,
      "Himrod": 6,
      "Itasca": 14,
      "La Crescent": 25,
      "Leon Millot": 6,
      "Marquette": 97,
      "Noiret": 9,
      "Petite Pearl": 33,
      "Regent": 8,
      "Seyval": 64,
      "Traminette": 81,
      "Valiant": 5,
      "Valvin Muscat": 26,
      "Vidal Blanc": 105,
      "Vignoles": 76,
      "Others": 110,
      "TOTAL": 1050
    },
    VINIFERA: {
      "Auxerrois": 7,
      "Cabernet Franc": 180,
      "Cabernet Sauvignon": 56,
      "Chardonnay": 320,
      "Gamay Noir": 32,
      "Gewurtztraminer": 77,
      "Gruner Veltliner": 19,
      "Lemberger": 42,
      "Merlot": 130,
      "Muscat Ottonel": 12,
      "Pinot Blanc": 62,
      "Pinot Gris": 270,
      "Pinot Meunier": 12,
      "Pinot Noir": 250,
      "Riesling": 670,
      "Sauvignon Blanc": 64,
      "Syrah": 14,
      "Viognier": 8,
      "Zweigelt": 5,
      "Others": 95,
      "TOTAL": 2325
    }
  };

  const createChartData = (categoryData) => {
    const sortedData = Object.entries(categoryData)
      .filter(([key]) => key !== 'TOTAL' && key !== 'Others')
      .sort(([, a], [, b]) => b - a);

    const top10Data = sortedData.slice(0, 10);
    const othersData = sortedData.slice(10);
    const top10Labels = top10Data.map(([key]) => key);
    const top10Values = top10Data.map(([, value]) => value);
    const othersValue = othersData.reduce((acc, [, value]) => acc + value, 0) + (categoryData["Others"] || 0);

    return {
      labels: [...top10Labels, 'Others'],
      datasets: [
        {
          data: [...top10Values, othersValue],
          backgroundColor: [
            '#E8B0D5', '#D9B3E6', '#B4E0C3', '#F2C4C4', '#C4D8E2',
            '#E2BDD2', '#D6B3E3', '#C4E5B9', '#F5D6D6', '#D1E0E5',
            '#F0C3D6', '#DAC0E0',
          ],
          hoverOffset: 30,
          borderColor: 'rgba(255, 255, 255, 0)',
        }
      ]
    };
  };

  const chartData = createChartData(data[category]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return hoveredIndex === context.dataIndex ? `${label} - ${value} acres` : label;
        },
        color: '#575656',
        anchor: 'end',
        align: 'end',
        offset: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 30,
        backgroundColor: 'transparent',
        font: { size: isMobile ? 8 : 18, weight: 400, lineHeight: 1.5 }
      }
    },
    layout: {
      padding: {
        top: 40,
        bottom: isMobile ? 50 : 50,
        left: isMobile ? 20 : 300,
        right: isMobile ? 0 : 300
      }
    },
    onHover: (event, elements) => {
      setHoveredIndex(elements.length > 0 ? elements[0].index : null);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{
        width: '100%',
        maxWidth: isMobile ? '400px' : '1100px',
        height: isMobile ? '230px' : '570px',
        margin: 'auto',
        marginBottom: isMobile ? '0' : 'auto'
      }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default GrapeCharts;
