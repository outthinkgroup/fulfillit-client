import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import {
  genDateKey,
  datesBetween,
  sortDates,
  byOccurrences,
} from "./datemanager";

export default function CampaignGraph({ name, dates, view, startDate }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Transactions by ${view} for ${name}`,
      },
    },
  };
  const data = React.useMemo(
    function transformLogsToGraphData() {
			console.log(dates)
      const formattedDates = dates?.reduce((acc, l) => {
        let date = new Date(`${l.month}/${l.day}/${l.year}`);
        acc[genDateKey(date, view)] = l.count;
        return acc;
      }, {});

      if (dates?.length <= 0) {
        return null;
      }
			console.log(formattedDates)
      // generate all dates between start and end of our log data for more accurate representation
      // with the same shape as what is created by byOccurrences
      const fillerDates = datesBetween(startDate, new Date(), view).reduce(
        (acc, date) => {
          acc[genDateKey(date, view)] = 0;
          return acc;
        },
        {},
      );
      // the filler dates will be overwritten if we have logs for that date
      const groups = { ...fillerDates, ...formattedDates };
      const data = Object.values(groups);

      const datasets = [
        {
          label: `By ${view}`,
          data,
          pointRadius: Object.values(groups).map((v) => (v > 0 ? 3 : 0)),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ];
      const labels = Object.keys(groups);
      return {
        labels,
        datasets,
      };
    },
    [dates, view],
  );

  if (!data) return <p>Not enough data to display</p>;
	console.log(data)

  return (
    <div>
      <LChart options={options} data={data} />
    </div>
  );
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function LChart({ options, data }) {
  return <Line options={options} data={data} />;
}
