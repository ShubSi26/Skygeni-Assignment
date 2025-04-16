import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

const width = 800;
const barHeight = 20;
const gap = 25;

const CustomStackedChart = ({api}:{api:string}) => {
  const ref = useRef<SVGSVGElement>(null);
  const [chartData, setChartData] = useState<null | {
    topics: string[];
    count: number[];
    rightpercentage: number[];
    intermediate: number[];
  }>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(api);
      const json = await res.json();
      setChartData(json);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!chartData) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); 

    const allData = chartData.topics.map((topic, index) => {
      const count = chartData.count[index];
      const right = chartData.rightpercentage[index];
      const inter = chartData.intermediate[index] ?? 100;
      return { topic, count, right, inter };
    });

    const maxWidth = 500 - 50

    allData.forEach((d, i) => {
      const y = i * (barHeight + gap);
      const fullBarGroup = svg.append("g").attr("transform", `translate(100,${y})`);

      fullBarGroup
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", maxWidth)
        .attr("height", barHeight)
        .attr("fill", "#A9A9A9");
      if(i !== allData.length - 1) {
        fullBarGroup
        .append("text")
        .attr("x", maxWidth / 2)
        .attr("y", barHeight + 15)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "#333")
        .text(`${d.inter}%`);
      }

      const greenWidth = (d.count/allData[0].count)*maxWidth
      const greenX = (maxWidth - greenWidth) / 2;

      fullBarGroup
        .append("rect")
        .attr("x", greenX)
        .attr("y", 0)
        .attr("width", greenWidth)
        .attr("height", barHeight)
        .attr("fill", "#008000");

      fullBarGroup
        .append("text")
        .attr("x", greenX + greenWidth / 2)
        .attr("y", barHeight / 2 + 4)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .style("font-size", "12px")
        .text(d.count);

      svg
        .append("text")
        .attr("x", 0)
        .attr("y", y + barHeight / 2 + 5)
        .text(d.topic)
        .style("font-size", "12px");

      svg
        .append("text")
        .attr("x", maxWidth + 110)
        .attr("y", y + barHeight / 2 + 5)
        .text(`${d.right}%`)
        .style("font-size", "12px");
    });
  }, [chartData]);

  return <svg ref={ref} width={width} height={300}></svg>;
};

export default CustomStackedChart;
