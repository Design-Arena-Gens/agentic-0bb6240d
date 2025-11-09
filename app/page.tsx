const SCALE = 12; // pixels per foot

type Space = {
  label: string;
  width: number; // in feet along x-axis
  height: number; // in feet along y-axis
  x: number; // offset from left in feet
  y: number; // offset from top in feet
  color: string;
  details?: string;
};

const hall: Space = {
  label: "Hall 24' × 12'",
  width: 12,
  height: 24,
  x: 11,
  y: 0,
  color: "#c7d2fe",
  details: "Central double-height hall; staircase from south-east corner."
};

const leftRooms: Space[] = [
  {
    label: "Room A 12' × 11'",
    width: 11,
    height: 12,
    x: 0,
    y: 0,
    color: "#fbd38d"
  },
  {
    label: "Room B 12' × 11'",
    width: 11,
    height: 12,
    x: 0,
    y: 12,
    color: "#f6ad55"
  }
];

const rightRooms: Space[] = [
  {
    label: "Room C 12' × 11'",
    width: 11,
    height: 12,
    x: 23,
    y: 0,
    color: "#bfdbfe"
  },
  {
    label: "Room D 12' × 11'",
    width: 11,
    height: 12,
    x: 23,
    y: 12,
    color: "#93c5fd"
  }
];

const staircase: Space = {
  label: "Stair 8' × 6'",
  width: 6,
  height: 8,
  x: 17,
  y: 16,
  color: "#fed7e2",
  details: "Access to upper floors from hall corner."
};

const spaces: Space[] = [...leftRooms, hall, ...rightRooms, staircase];

const overall = {
  width: 34,
  height: 24
};

const formatFeet = (value: number) => `${value.toFixed(1)} ft`;

export default function Page() {
  return (
    <main className="app-shell">
      <section>
        <h1>Ground Floor Arrangement</h1>
        <p className="details">
          Central longitudinal hall sized 24&apos; × 12&apos; with two 12&apos; ×
          11&apos; rooms flanking each side. Staircase originates from the
          south-east corner of the hall. Ridge height maintained at 11.6 ft.
        </p>
      </section>
      <section className="plan-wrapper">
        <svg
          width={overall.width * SCALE}
          height={overall.height * SCALE}
          viewBox={`0 0 ${overall.width * SCALE} ${overall.height * SCALE}`}
          role="img"
          aria-labelledby="floor-title"
          style={{ background: "#e2e8f0", borderRadius: 12, padding: 12 }}
        >
          <title id="floor-title">Ground floor layout</title>
          <defs>
            <pattern id="stairs" patternUnits="userSpaceOnUse" width="12" height="12">
              <rect width="12" height="12" fill="#fed7e2" />
              <path
                d="M0 12 L12 0"
                stroke="#f472b6"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </pattern>
            <marker
              id="dim-arrow"
              markerWidth="6"
              markerHeight="6"
              refX="3"
              refY="3"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L6,3 L0,6 z" fill="#334155" />
            </marker>
          </defs>
          <rect
            x={0}
            y={0}
            width={overall.width * SCALE}
            height={overall.height * SCALE}
            fill="#f8fafc"
            stroke="#0f172a"
            strokeWidth={2}
            rx={16}
          />
          {spaces.map((space) => (
            <g key={space.label}>
              <rect
                x={space.x * SCALE}
                y={space.y * SCALE}
                width={space.width * SCALE}
                height={space.height * SCALE}
                fill={space.label.startsWith("Stair") ? "url(#stairs)" : space.color}
                stroke="#1f2937"
                strokeWidth={1.5}
                rx={space.label.startsWith("Hall") ? 6 : 4}
              />
              <text
                x={(space.x + space.width / 2) * SCALE}
                y={(space.y + space.height / 2) * SCALE}
                fill="#0f172a"
                fontSize={12}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ userSelect: "none" }}
              >
                {space.label}
              </text>
            </g>
          ))}
          <DimensionLine
            from={{ x: 0, y: -1.4 }}
            to={{ x: overall.width, y: -1.4 }}
            label={`Total width ${formatFeet(overall.width)}`}
          />
          <DimensionLine
            from={{ x: -1.4, y: 0 }}
            to={{ x: -1.4, y: overall.height }}
            label={`Total length ${formatFeet(overall.height)}`}
            vertical
          />
          <DimensionLine
            from={{ x: leftRooms[0].width, y: overall.height + 1.2 }}
            to={{ x: leftRooms[0].width + hall.width, y: overall.height + 1.2 }}
            label={`Hall width ${formatFeet(hall.width)}`}
          />
          <DimensionLine
            from={{ x: overall.width + 1.2, y: 0 }}
            to={{ x: overall.width + 1.2, y: hall.height }}
            label={`Hall length ${formatFeet(hall.height)}`}
            vertical
          />
        </svg>
      </section>
      <section className="legend">
        {spaces.map((space) => (
          <div className="legend-item" key={space.label}>
            <span
              className="legend-swatch"
              style={{
                background: space.label.startsWith("Stair")
                  ? "repeating-linear-gradient(135deg, #fbcfe8 0, #fbcfe8 6px, #f472b6 6px, #f472b6 12px)"
                  : space.color
              }}
            />
            <span>
              <strong>{space.label}</strong>
              {space.details ? ` — ${space.details}` : null}
            </span>
          </div>
        ))}
        <div className="legend-item">
          <span className="legend-swatch" style={{ background: "#94a3b8" }} />
          <span>
            <strong>Ridge Height</strong> — {formatFeet(11.6)} from finished floor level.
          </span>
        </div>
      </section>
    </main>
  );
}

type DimensionLineProps = {
  from: { x: number; y: number };
  to: { x: number; y: number };
  label: string;
  vertical?: boolean;
};

function DimensionLine({ from, to, label, vertical }: DimensionLineProps) {
  const x1 = from.x * SCALE;
  const y1 = from.y * SCALE;
  const x2 = to.x * SCALE;
  const y2 = to.y * SCALE;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#334155"
        strokeWidth={1.4}
        markerStart="url(#dim-arrow)"
        markerEnd="url(#dim-arrow)"
      />
      <text
        x={vertical ? midX - 12 : midX}
        y={vertical ? midY + 4 : midY - 8}
        fontSize={11}
        fill="#0f172a"
        textAnchor={vertical ? "end" : "middle"}
        transform={
          vertical ? `rotate(-90 ${midX - 12} ${midY + 4})` : undefined
        }
      >
        {label}
      </text>
    </g>
  );
}
