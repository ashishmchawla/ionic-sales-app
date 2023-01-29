import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";

interface GraphData {
  type: string;
  data: [];
}

const BarGraph: React.FC<GraphData> = ({ type, data }) => {
  useIonViewWillEnter(() => {
    ChartJS.register(CategoryScale);
  }, []);

  useIonViewWillLeave(() => {
    ChartJS.unregister(CategoryScale);
  }, []);

  const barChartData = {
    labels: ["Achieved", "Target"],
    datasets: [
      {
        label: "November Stats",
        backgroundColor: ["#3b5998", "#8b9dc3"],
        borderColor: "#8b9dc3",
        borderWidth: 2,
        hoverBackgroundColor: "#8b9dc3",
        hoverBorderColor: "#3b5998",
        data: data,
      },
    ],
  };

  return (
    <>
      <Bar data={barChartData} options={{ maintainAspectRatio: true }} />
    </>
  );
};

export default BarGraph;
