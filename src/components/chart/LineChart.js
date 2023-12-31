import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [selectOptions, setSelectOptions] = useState(["Asset Kantor"]);
  const [category, setCategory] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/inventory/chart?nama=${selectOptions.join(",")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        setCategory(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectOptions]);

  const getRandomColors = (count) => {
    const availableColors = [
      "#5499C7",
      "#45B39D",
      "#ABB2B9",
      "#283747",
      "#616A6B",
    ];
    const shuffledColors = [...availableColors].sort(() => 0.5 - Math.random());
    return shuffledColors.slice(0, count);
  };

  const depresiasiData = [
    {
      label: selectOptions.join(","),
      data: [
        category.totalTahun1,
        category.totalTahun2,
        category.totalTahun3,
        category.totalTahun4,
      ],
      borderColor: getRandomColors(4),
      backgroundColor: getRandomColors(4),
      fill: true,
    },
  ];

  const chartData = {
    labels: ["Tahun 1", "Tahun 2", "Tahun 3", "Tahun 4"],
    datasets: depresiasiData,
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Depresiasi Inventory",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Tahun",
        },
      },
      y: {
        title: {
          display: true,
          text: "Nilai",
        },
      },
    },
  };

  const handleAssetSelect = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectOptions(selectedOptions);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-4 p-4 border rounded-lg shadow-md bg-white">
      <div className="lg:py-10">
        <p className="text-[10px] md:text-[12px] 2xl:text-[16px] lg:px-[12px] mb-4 text-black">
          Pilih Asset
        </p>
        <select
          multiple
          onChange={handleAssetSelect}
          value={selectOptions}
          className="p-2 w-full bg-white text-gray-700 border rounded-md focus:none outline-none"
        >
          <option
            value="Asset Kantor"
            className="text-[10px] md:text-[12px] 2xl:text-[16px] mb-1 lg:mb-2"
          >
            Asset Kantor
          </option>
          <option
            value="Asset Perangkat Lunak"
            className="text-[10px] md:text-[12px] 2xl:text-[16px] mb-1 lg:mb-2"
          >
            Asset Perangkat Lunak
          </option>
          <option
            value="Asset Perangkat Keras"
            className="text-[10px] md:text-[12px] 2xl:text-[16px] mb-1 lg:mb-2"
          >
            Asset Perangkat Keras
          </option>
        </select>
      </div>
      <div className="col-span-2 min-h-[30vh] md:min-h-[40vh]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Chart;
