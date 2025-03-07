import * as d3 from "d3";
import { useEffect, useRef } from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { baseTemplateSchema } from "../../../shared/types";
import { registerAnimation } from "../registry";

// Types
export interface BarChartData {
  label: string;
  value: number;
}

// Schema for D3BarChart props
export const d3BarChartSchema = baseTemplateSchema.extend({
  data: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
    }),
  ),
  config: z
    .object({
      marginTop: z.number().optional().default(50),
      marginRight: z.number().optional().default(30),
      marginBottom: z.number().optional().default(30),
      marginLeft: z.number().optional().default(40),
      yPadding: z.number().optional().default(0.1),
      delay: z.number().optional().default(10),
      barColor: z.string().optional().default("#4290f5"),
      xLabel: z.string().optional().default("Value"),
      xFormat: z.string().optional().default("%"),
      backgroundColor: z.string().optional().default("white"),
      labelColor: z.string().optional().default("white"),
      fontSize: z.number().optional().default(10),
      springConfig: z
        .object({
          mass: z.number().optional().default(5),
          damping: z.number().optional().default(200),
        })
        .optional(),
    })
    .optional()
    .default({}),
});

type D3BarChartProps = z.infer<typeof d3BarChartSchema>;

const defaultConfig = {
  marginTop: 50,
  marginRight: 30,
  marginBottom: 30,
  marginLeft: 40,
  yPadding: 0.1,
  delay: 10,
  barColor: "#4290f5",
  xLabel: "Value",
  xFormat: "%",
  backgroundColor: "white",
  labelColor: "white",
  fontSize: 10,
  springConfig: {
    mass: 5,
    damping: 200,
  },
};

export const D3BarChart: React.FC<D3BarChartProps> = ({
  data,
  config = {},
}) => {
  const { width, height, fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const svgRef = useRef<SVGSVGElement>(null);

  // Merge default config with provided config
  const finalConfig = { ...defaultConfig, ...config };

  const yDomain = new d3.InternSet(
    d3.groupSort(
      data,
      ([d]) => -d.value,
      (d) => d.label,
    ),
  );

  const animation = spring({
    fps,
    frame: frame - finalConfig.delay,
    config: finalConfig.springConfig,
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const X = d3.map(data, (d) => d.value);
    const Y = d3.map(data, (d) => d.label);

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    const xRange = [finalConfig.marginLeft, width - finalConfig.marginRight];
    const yRange = [height - finalConfig.marginBottom, finalConfig.marginTop];

    const xDomain = [0, d3.max(X) as number];

    // Omit any data not present in the y-domain.
    const I = d3.range(X.length).filter((i) => yDomain.has(Y[i]));

    // Construct scales and axes.
    const xScale = d3.scaleLinear(xDomain, xRange);
    const yScale = d3.scaleBand(yDomain, yRange).padding(finalConfig.yPadding);
    const xAxis = d3.axisTop(xScale).ticks(width / 80, finalConfig.xFormat);
    const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

    // Compute titles.
    const formatValue = xScale.tickFormat(100, finalConfig.xFormat);
    const title = (i: number) => `${formatValue(X[i])}`;

    // Create x-axis (only once because it's static)
    if (!svg.select(".x-axis").node()) {
      svg
        .append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0,${finalConfig.marginTop})`)
        .call(xAxis)
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .selectAll(".tick line")
            .clone()
            .attr(
              "y2",
              height - finalConfig.marginTop - finalConfig.marginBottom,
            )
            .attr("stroke-opacity", 0.1),
        )
        .call((g) =>
          g
            .append("text")
            .attr("x", width - finalConfig.marginRight)
            .attr("y", -22)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(finalConfig.xLabel),
        );
    }

    // Create parent <g> element for bars
    if (!svg.select(".bars").node()) {
      svg.append("g").classed("bars", true).attr("fill", finalConfig.barColor);
    }

    svg
      .select("g.bars")
      .selectAll("rect")
      .data(I)
      .join(
        (enter) => {
          return enter
            .append("rect")
            .attr("x", xScale(0))
            .attr("y", (i) => yScale(Y[i]) as number)
            .attr("width", (i) =>
              Math.max(0, xScale(X[i]) * animation - xScale(0)),
            )
            .attr("height", yScale.bandwidth());
        },
        (update) => {
          return update.attr("width", (i) =>
            Math.max(0, xScale(X[i]) * animation - xScale(0)),
          );
        },
        (exit) => {
          return exit.remove();
        },
      );

    // Create parent <g> element for labels
    if (!svg.select(".labels").node()) {
      svg
        .append("g")
        .classed("labels", true)
        .attr("fill", finalConfig.labelColor)
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", finalConfig.fontSize);
    }

    svg
      .select("g.labels")
      .selectAll("text")
      .data(I)
      .join(
        (enter) => {
          return enter
            .append("text")
            .attr("x", (i) => xScale((X[i] * animation) as number))
            .attr("y", (i) => (yScale(Y[i]) as number) + yScale.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("dx", -4)
            .text(title)
            .call((text) =>
              text
                .filter((i) => xScale(X[i]) - xScale(0) < 20) // Short bars
                .attr("dx", +4)
                .attr("fill", "black")
                .attr("text-anchor", "start"),
            );
        },
        (update) => {
          return update.attr("x", (i) => xScale((X[i] * animation) as number));
        },
        (exit) => {
          return exit.remove();
        },
      );

    // Create y-axis (only once because it's static)
    if (!svg.select(".y-axis").node()) {
      svg
        .append("g")
        .classed("y-axis", true)
        .attr(`transform`, `translate(${finalConfig.marginLeft},0)`)
        .call(yAxis);
    }
  }, [height, animation, width, data, finalConfig, yDomain]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: finalConfig.backgroundColor,
      }}
    >
      <svg ref={svgRef} />
    </AbsoluteFill>
  );
};

// Register the animation
registerAnimation({
  id: "D3BarChart",
  name: "D3 Bar Chart",
  description: "A dynamic bar chart visualization using D3",
  component: D3BarChart,
  schema: d3BarChartSchema,
  defaultProps: {
    data: [
      { label: "A", value: 0.4 },
      { label: "B", value: 0.6 },
      { label: "C", value: 0.8 },
      { label: "D", value: 0.3 },
      { label: "E", value: 0.7 },
    ],
    config: defaultConfig,
  },
  category: "Data Visualizations",
  thumbnail: "/thumbnails/d3-bar-chart.png",
});
