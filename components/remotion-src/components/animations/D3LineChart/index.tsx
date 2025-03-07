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
export interface LineDataPoint {
  x: number;
  y: number;
}

// Define the ReferenceLine interface based on the schema
interface ReferenceLine {
  y: number;
  color: string;
  label?: string;
  startFrame?: number;
  strokeWidth?: number;
  labelPadding?: number;
  labelFontSize?: number;
  labelFontWeight?: number;
}

// Schema for D3LineChart props
export const d3LineChartSchema = baseTemplateSchema.extend({
  lines: z.array(
    z.object({
      data: z.array(
        z.object({
          x: z.number(),
          y: z.number(),
        }),
      ),
      color: z.string(),
      strokeWidth: z.number().optional(),
      label: z.string().optional(),
    }),
  ),
  config: z
    .object({
      margin: z
        .object({
          top: z.number().optional(),
          right: z.number().optional(),
          bottom: z.number().optional(),
          left: z.number().optional(),
        })
        .optional(),
      backgroundColor: z.string().optional(),
      animationDuration: z.number().optional(),
      delay: z.number().optional(),
      yDomain: z.tuple([z.number(), z.number()]).optional(),
      springConfig: z
        .object({
          mass: z.number().optional(),
          damping: z.number().optional(),
        })
        .optional(),
      fontSize: z.number().optional(),
      axisColor: z.string().optional(),
      axisWidth: z.number().optional(),
      pointRadius: z.number().optional(),
      referenceLines: z.array(
        z.object({
          y: z.number(),
          color: z.string(),
          label: z.string().optional(),
          startFrame: z.number().optional(),
          strokeWidth: z.number().optional(),
          labelPadding: z.number().optional(),
          labelFontSize: z.number().optional(),
          labelFontWeight: z.number().optional(),
        })
      ).optional(),
      title: z.object({
        text: z.string(),
        fontSize: z.number().optional(),
        fontWeight: z.number().optional(),
        marginBottom: z.number().optional(),
      }).optional(),
      xLabel: z.object({
        text: z.string(),
        fontSize: z.number().optional(),
        fontWeight: z.number().optional(),
        marginTop: z.number().optional(),
      }).optional(),
      yLabel: z.object({
        text: z.string(),
        fontSize: z.number().optional(),
        fontWeight: z.number().optional(),
        marginRight: z.number().optional(),
      }).optional(),
      legend: z.object({
        fontSize: z.number().optional(),
        fontWeight: z.number().optional(),
        itemSpacing: z.number().optional(),
      }).optional(),
      ticks: z.object({
        fontSize: z.number().optional(),
        fontWeight: z.number().optional(),
        padding: z.number().optional(),
      }).optional(),
    })
    .optional()
    .default({}),
});

type D3LineChartProps = z.infer<typeof d3LineChartSchema>;

const defaultConfig = {
  margin: {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  },
  backgroundColor: "#ffffff",
  animationDuration: 30,
  delay: 10,
  springConfig: {
    mass: 1,
    damping: 30,
  },
  fontSize: 12,
  axisColor: "#888888",
  axisWidth: 1,
  pointRadius: 4,
};

export const D3LineChart: React.FC<D3LineChartProps> = ({
  lines,
  config = {},
}) => {
  const { width, height, fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const svgRef = useRef<SVGSVGElement>(null);

  // Merge default config with provided config
  const finalConfig = {
    ...defaultConfig,
    ...config,
    margin: { ...defaultConfig.margin, ...config.margin },
    springConfig: { ...defaultConfig.springConfig, ...config.springConfig },
  };

  const animation = spring({
    fps,
    frame: frame - finalConfig.delay,
    config: finalConfig.springConfig,
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Clear previous content
    svg.selectAll("*").remove();

    // Create chart area group
    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate(${finalConfig.margin.left},${finalConfig.margin.top})`,
      );

    // Calculate chart dimensions
    const chartWidth =
      width - finalConfig.margin.left - finalConfig.margin.right;
    const chartHeight =
      height - finalConfig.margin.top - finalConfig.margin.bottom;

    // Create scales
    const allPoints = lines.flatMap((line) => line.data);
    const xMax = d3.max(allPoints, (d) => d.x) || 0;

    const xScale = d3.scaleLinear().domain([0, xMax]).range([0, chartWidth]);

    const yScale = d3
      .scaleLinear()
      .domain(finalConfig.yDomain || [0, 1])
      .range([chartHeight, 0]);

    // Add grid
    g.append("g")
      .attr("class", "grid-lines")
      .style("opacity", 0.5)
      .selectAll("line")
      .data(yScale.ticks(10))
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", chartWidth)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .style("stroke", finalConfig.axisColor)
      .style("stroke-width", 1)
      .style("stroke-dasharray", "4,4");

    // Add vertical grid lines
    g.append("g")
      .attr("class", "grid-lines-vertical")
      .style("opacity", 0.5)
      .selectAll("line")
      .data(xScale.ticks(10))
      .enter()
      .append("line")
      .attr("x1", (d) => xScale(d))
      .attr("x2", (d) => xScale(d))
      .attr("y1", 0)
      .attr("y2", chartHeight)
      .style("stroke", finalConfig.axisColor)
      .style("stroke-width", 1)
      .style("stroke-dasharray", "4,4");

    // Add reference lines with animation based on start frame
    g.selectAll(".reference-line")
      .data(finalConfig.referenceLines || [])
      .enter()
      .append("g")
      .attr("class", "reference-line")
      .each(function (d) {
        const group = d3.select(this);
        const startFrame = (d as ReferenceLine).startFrame || 0;
        const relativeFrame = frame - finalConfig.delay;
        const opacity = relativeFrame >= startFrame ? 0.7 : 0;

        // Add the line
        group
          .append("line")
          .attr("x1", 0)
          .attr("x2", chartWidth)
          .attr("y1", yScale(d.y))
          .attr("y2", yScale(d.y))
          .style("stroke", d.color)
          .style("stroke-width", d.strokeWidth || 2)
          .style("stroke-dasharray", "6,4")
          .style("opacity", opacity);

        // Add the label if provided
        if (d.label) {
          // Add white background for better contrast
          group
            .append("rect")
            .attr("x", chartWidth + (d.labelPadding || 10))
            .attr("y", yScale(d.y) - 12) // Position above the line
            .attr(
              "width",
              d.label.length * (d.labelFontSize || finalConfig.fontSize) * 0.7,
            ) // Approximate width
            .attr("height", 24) // Fixed height
            .attr("fill", finalConfig.backgroundColor)
            .attr("rx", 4) // Rounded corners
            .style("opacity", opacity);

          group
            .append("text")
            .attr("x", chartWidth + (d.labelPadding || 10))
            .attr("y", yScale(d.y))
            .attr("dy", "0.32em")
            .style("fill", d.color)
            .style("font-size", `${d.labelFontSize || finalConfig.fontSize}px`)
            .style("font-weight", d.labelFontWeight || 400)
            .style("font-family", "Inter, system-ui, -apple-system, sans-serif")
            .style("opacity", opacity)
            .text(d.label);
        }
      });

    // Add title with enhanced styling
    if (finalConfig.title?.text) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", finalConfig.title.marginBottom || 30)
        .attr("text-anchor", "middle")
        .style(
          "font-size",
          `${finalConfig.title.fontSize || finalConfig.fontSize * 1.5}px`,
        )
        .style("font-family", "Inter, system-ui, -apple-system, sans-serif")
        .style("font-weight", finalConfig.title.fontWeight || 600)
        .style("fill", finalConfig.axisColor)
        .text(finalConfig.title.text);
    }

    // Add x-axis label with enhanced styling
    if (finalConfig.xLabel?.text) {
      g.append("text")
        .attr("x", chartWidth / 2)
        .attr("y", chartHeight + (finalConfig.xLabel.marginTop || 45))
        .attr("text-anchor", "middle")
        .style(
          "font-size",
          `${finalConfig.xLabel.fontSize || finalConfig.fontSize}px`,
        )
        .style("font-family", "Inter, system-ui, -apple-system, sans-serif")
        .style("font-weight", finalConfig.xLabel.fontWeight || 500)
        .style("fill", finalConfig.axisColor)
        .text(finalConfig.xLabel.text);
    }

    // Add y-axis label with enhanced styling
    if (finalConfig.yLabel?.text) {
      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -chartHeight / 2)
        .attr("y", -(finalConfig.yLabel.marginRight || 60))
        .attr("text-anchor", "middle")
        .style(
          "font-size",
          `${finalConfig.yLabel.fontSize || finalConfig.fontSize}px`,
        )
        .style("font-family", "Inter, system-ui, -apple-system, sans-serif")
        .style("font-weight", finalConfig.yLabel.fontWeight || 500)
        .style("fill", finalConfig.axisColor)
        .text(finalConfig.yLabel.text);
    }

    // Add legend with enhanced styling
    const legend = g
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${chartWidth + 20}, 0)`);

    lines.forEach((line, i) => {
      const legendItem = legend
        .append("g")
        .attr(
          "transform",
          `translate(0, ${i * (finalConfig.legend?.itemSpacing || 25)})`,
        );

      // Add background for legend text
      legendItem
        .append("rect")
        .attr("x", 25) // Position after the line
        .attr("y", -12) // Align with text
        .attr(
          "width",
          (line.label?.length || 1) *
            (finalConfig.legend?.fontSize || finalConfig.fontSize) *
            0.7,
        )
        .attr("height", 24)
        .attr("fill", finalConfig.backgroundColor)
        .attr("rx", 4); // Rounded corners

      legendItem
        .append("line")
        .attr("x1", 0)
        .attr("x2", 20)
        .attr("y1", 0)
        .attr("y2", 0)
        .style("stroke", line.color)
        .style("stroke-width", line.strokeWidth || 2);

      legendItem
        .append("text")
        .attr("x", 30)
        .attr("y", 0)
        .attr("dy", "0.32em")
        .style(
          "font-size",
          `${finalConfig.legend?.fontSize || finalConfig.fontSize}px`,
        )
        .style("font-family", "Inter, system-ui, -apple-system, sans-serif")
        .style("font-weight", finalConfig.legend?.fontWeight || 500)
        .style("fill", line.color) // Use line color instead of axis color
        .text(line.label || `Series ${i + 1}`);
    });

    // Style for axes with enhanced styling
    const axisStyle = (g: d3.Selection<SVGGElement, unknown, null, undefined>) => {
      g.style(
        "font-size",
        `${finalConfig.ticks?.fontSize || finalConfig.fontSize}px`
      )
        .style("font-weight", finalConfig.ticks?.fontWeight || 500)
        .style("font-family", "Inter, system-ui, -apple-system, sans-serif")
        .style("color", finalConfig.axisColor);

      g.select(".domain")
        .style("stroke-width", finalConfig.axisWidth)
        .style("stroke", finalConfig.axisColor)
        .style("opacity", 0.5);

      g.selectAll(".tick line")
        .style("stroke-width", finalConfig.axisWidth)
        .style("stroke", finalConfig.axisColor)
        .style("opacity", 0.5);

      g.selectAll(".tick text")
        .style("fill", finalConfig.axisColor)
        .style(
          "font-size",
          `${finalConfig.ticks?.fontSize || finalConfig.fontSize}px`
        )
        .style("font-family", "Inter, system-ui, -apple-system, sans-serif")
        .style("font-weight", finalConfig.ticks?.fontWeight || 500)
        .attr(
          "dy",
          finalConfig.ticks?.padding
            ? `${finalConfig.ticks.padding}px`
            : "0.32em"
        );
    };

    // Add axes with styling
    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale))
      .call(axisStyle);

    g.append("g").call(d3.axisLeft(yScale)).call(axisStyle);

    // Create line generator with smoothing
    const lineGenerator = d3
      .line<LineDataPoint>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    // Draw each line
    lines.forEach((line, index) => {
      // Add line shadow for depth
      const shadowPath = g
        .append("path")
        .datum(line.data)
        .attr("fill", "none")
        .attr("stroke", line.color)
        .attr("stroke-width", (line.strokeWidth || 2) + 4)
        .attr("stroke-opacity", 0.2)
        .attr("filter", "url(#shadow)")
        .attr("d", lineGenerator);

      const path = g
        .append("path")
        .datum(line.data)
        .attr("fill", "none")
        .attr("stroke", line.color)
        .attr("stroke-width", line.strokeWidth || 2)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("d", lineGenerator);

      // Add data points with unique class name for each line
      g.selectAll(`.data-point-${index}`)
        .data(line.data)
        .enter()
        .append("circle")
        .attr("class", `data-point-${index}`)
        .attr("cx", (d) => xScale(d.x))
        .attr("cy", (d) => yScale(d.y))
        .attr("r", finalConfig.pointRadius)
        .attr("fill", line.color)
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .style("opacity", animation);

      // Animate both the shadow and main path
      const totalLength = path.node()?.getTotalLength() || 0;
      [path, shadowPath].forEach((p) => {
        p.attr("stroke-dasharray", `${totalLength} ${totalLength}`).attr(
          "stroke-dashoffset",
          totalLength * (1 - animation),
        );
      });
    });

    // Add shadow filter
    const defs = svg.append("defs");
    const filter = defs
      .append("filter")
      .attr("id", "shadow")
      .attr("filterUnits", "userSpaceOnUse")
      .attr("x", -4)
      .attr("y", -4)
      .attr("width", width + 8)
      .attr("height", height + 8);

    filter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3)
      .attr("result", "blur");

    filter.append("feOffset").attr("in", "blur").attr("dx", 0).attr("dy", 2);

    filter
      .append("feComponentTransfer")
      .append("feFuncA")
      .attr("type", "linear")
      .attr("slope", 0.2);
  }, [width, height, lines, animation, finalConfig, frame]);

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
  id: "D3LineChart",
  name: "D3 Line Chart",
  description: "A dynamic line chart visualization using D3",
  component: D3LineChart as React.FC<unknown>,
  schema: d3LineChartSchema,
  defaultProps: {
    lines: [
      {
        data: [
          { x: 0, y: 0 },
          { x: 1, y: 2 },
          { x: 2, y: 1 },
          { x: 3, y: 4 },
          { x: 4, y: 3 },
          { x: 5, y: 5 },
        ],
        color: "#3b82f6",
        strokeWidth: 3,
        label: "Series A",
      },
    ],
    config: defaultConfig,
  },
  category: "Data Visualizations",
  thumbnail: "/thumbnails/d3-line-chart.png",
});
