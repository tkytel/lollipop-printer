import { useRef } from "react";
import { useImmerAtom } from "jotai-immer";
import { payloadAtom } from "../helper/Jotai";

export default function HagakiSvg() {
  const [payload] = useImmerAtom(payloadAtom);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handlePrint = () => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Print SVG</title>
          <style>
            body, html { margin: 0; padding: 0; background: #fff; }
            @page { size: auto; margin: 0; }
            svg { display: block; margin: auto; }
          </style>
        </head>
        <body>
          ${svgElement.outerHTML}
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            };
          <\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div style={{ marginInline: "auto", width: "100mm", height: "148mm" }}>
      <button onClick={handlePrint} style={{ width: "100%" }}>🖨️ 印刷</button>

      <svg
        ref={svgRef}
        width="100mm"
        height="148mm"
        viewBox="0 0 100 148"
        xmlns="http://www.w3.org/2000/svg"
        style={{ border: "1px solid #ccc", background: "#fff", display: "block" }}
      >
        <rect x="5" y="5" width="90" height="138" fill="none" stroke="#ddd" />

        <text x="10" y="10" fontSize="4.2" fontFamily="monospace">
          {payload.split("\n").map((line, i) => (
            <tspan key={i} x="10" dy={i === 0 ? 0 : "1.2em"}>
              {line}
            </tspan>
          ))}
        </text>
      </svg>
    </div>
  );
}
