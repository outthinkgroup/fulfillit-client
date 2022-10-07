import React from "react";
import styled from "styled-components";
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

export default function CampaignGraph({ name, logs, view }) {
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
      const sortedDates = logs.map((l) => new Date(l.date)).sort(sortDates);

      // generate all dates between start and end of our log data for more accurate representation
      // with the same shape as what is created by byOccurrences
      const fillerDates = datesBetween(
        sortedDates[0],
        sortedDates.at(-1),
        view
      ).reduce((acc, date) => {
        acc[genDateKey(date, view)] = 0;
        return acc;
      }, {});
      // the filler dates will be overwritten if we have logs for that date
      const groups = { ...fillerDates, ...byOccurrences[view](sortedDates) };
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
    [logs, view]
  );

  if (!data) return null;
  return (
    <CampaignGraphWrapper>
      <LChart options={options} data={data} />
    </CampaignGraphWrapper>
  );
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LChart({ options, data }) {
  return <Line options={options} data={data} />;
}

const CampaignGraphWrapper = styled.div``;

function dateReducer(groups, date) {
  //gets the year
  const y = date.getFullYear();
  if (!(y in groups)) {
    groups[y] = { count: 0, month: {} };
  }
  groups[y].count++;

  //gets the month
  const m = date.getMonth() + 1;
  if (!(m in groups[y].month)) {
    groups[y].month[m] = { count: 0, day: {} };
  }
  groups[y].month[m].count++;

  //gets the day
  const d = date.getDate();
  if (!(d in groups[y].month[m].day)) {
    groups[y].month[m].day[d] = { count: 0, hour: {} };
  }
  groups[y].month[m].day[d].count++;

  //gets the hour
  const h = date.getHours();
  if (!(h in groups[y].month[m].day[d].hour)) {
    groups[y].month[m].day[d].hour[h] = { count: 0 };
  }
  groups[y].month[m].day[d].hour[h].count++;
  console.log(groups);
  return groups;
}

function flattenBy(view, obj) {
  if (view == "year") {
    const data = Object.keys(obj).map((key) => {
      return obj[key].count;
    });
    const labels = Object.keys(obj);
    return { labels, data };
  }
  if (view == "month") {
    const data = Object.keys(obj)
      .map((y) => {
        return Object.keys(obj[y].month).map((m) => obj[y].month[m].count);
      })
      .flat();
    const labels = Object.keys(obj)
      .map((y) => {
        return Object.keys(obj[y].month).map((m) => `${m}-${y}`);
      })
      .flat();
    console.log({ data, labels });
    return { data, labels };
  }

  console.log(obj);
  if (view == "day") {
    const labels = [];
    const data = [];

    const years = Object.keys(obj);
    for (let yi = 0; yi < years.length; yi++) {
      const months = Object.keys(obj[years[yi]].month);

      for (let mi = 0; mi < months.length; mi++) {
        const days = Object.keys(obj[years[yi]].month[months[mi]].day);

        for (let di = 0; di < days.length; di++) {
          data.push(obj[years[yi]].month[months[mi]].day[days[di]].count);
          labels.push(`${years[yi]}-${months[mi]}-${days[di]}`);
        }
      }
    }

    return { data, labels };
  }

  if (view == "hour") {
    const labels = [];
    const data = [];

    const years = Object.keys(obj);
    for (let yi = 0; yi < years.length; yi++) {
      const months = Object.keys(obj[years[yi]].month);

      for (let mi = 0; mi < months.length; mi++) {
        const days = Object.keys(obj[years[yi]].month[months[mi]].day);

        for (let di = 0; di < days.length; di++) {
          const hours = Object.keys(
            obj[years[yi]].month[months[mi]].day[days[di]].hour
          );

          for (let hi = 0; hi < hours.length; hi++) {
            data.push(
              obj[years[yi]].month[months[mi]].day[days[di]].hour[hours[hi]]
                .count
            );
            labels.push(
              `${years[yi]}-${months[mi]}-${days[di]} - ${hours[hi]}:00`
            );
          }
        }
      }
    }

    return { data, labels };
  }
}

/**

  1. loop thru data
  
   
  {
    year:{
      2022:{count:10}
      month:{
        'january':{count:10}
        day:{
          01-01-23:{count:10}
          hour:{
            12:{count:10}
          },
        },
      },
    },
  }
  
  */

function filldates(dateStrings, view) {
  const sorted = dateStrings
    .map((s) => new Date(s.split(" ")[0]))
    .sort((a, b) => a.getTime() - b.getTime());
  const first = sorted[0].getTime();
  const last = sorted.at(-1).getTime();
  console.log(new Date(first), new Date(last));
  const diff = last - first;
  let d = [];
  if (view == "hour") {
    const span = diff / 1000 / 60 / 60;
    for (let i = 0; i <= span; i++) {
      d.push(new Date(first + span * i).toLocaleDateString());
    }
  }

  return d;
}
