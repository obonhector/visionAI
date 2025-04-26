import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// --- Componentes de iconos personalizados (en lugar de react-icons) ---
const TrendingUpIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ZapIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ActivityIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ReplayIcon = () => (
 <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);


// --- Helper function to generate SVG path data (Smooth Curves) ---
const generateLinePath = (points: { x: number; y: number }[]): string => {
  if (!points || points.length < 2) return '';
  let path = `M${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const x1 = points[i].x;
    const y1 = points[i].y;
    const x2 = points[i + 1].x;
    const y2 = points[i + 1].y;

    // Calculate control points for smooth Bézier curve
    // Adjust the 0.3 factor for more or less curve smoothness
    const ctrl1X = x1 + (x2 - x1) * 0.3;
    const ctrl1Y = y1;
    const ctrl2X = x2 - (x2 - x1) * 0.3;
    const ctrl2Y = y2;

    path += ` C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${x2} ${y2}`;
  }
  return path;
};

// --- Helper function to generate SVG path data for the area under the curve ---
const generateAreaPath = (points: { x: number; y: number }[], yBaseline: number): string => {
  if (!points || points.length === 0) return '';
  const linePath = generateLinePath(points); // Use smooth line path
  // Close the path by drawing lines to the bottom-right, bottom-left, and back to the start
  return `${linePath} L${points[points.length - 1].x} ${yBaseline} L${points[0].x} ${yBaseline} Z`;
};


// --- Define the interface for data points ---
interface DataPoint {
    x: number;
    y: number;
    label: string;
    value: string;
    growth: string;
    delay: number; // Delay for point appearance animation
    color?: string; // Optional color for point/highlight
}

// --- Define the interface for tooltip data ---
interface TooltipData {
  x: number;
  y: number;
  label: string;
  value: string;
  growth: string;
}

// --- Define the functional component EnhancedHeroGraph ---
const EnhancedHeroGraph: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  // State to force re-animation on replay
  const [animationKey, setAnimationKey] = useState(0);
  // Use useInView with the key to re-trigger when key changes
  const isInView = useInView(ref, { once: false, amount: 0.2 }); // `once: false` needed for replay

  // States for interactivity
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);

  // --- Data points for the graph visualization ---
  const dataPoints: DataPoint[] = [
    { x: 60, y: 200, label: 'Ene', value: 'Base', growth: '+0%', delay: 0, color: '#4F46E5' },
    { x: 140, y: 180, label: 'Feb', value: '+12%', growth: '+12%', delay: 0.1, color: '#6366F1' },
    { x: 220, y: 150, label: 'Mar', value: '+52%', growth: '+40%', delay: 0.2, color: '#8B5CF6' },
    { x: 300, y: 100, label: 'Abr', value: '+89%', growth: '+37%', delay: 0.3, color: '#A855F7' },
    { x: 380, y: 60, label: 'May', value: '+120%', growth: '+31%', delay: 0.4, color: '#D946EF' },
    { x: 440, y: 40, label: 'Jun', value: '+147%', growth: '+27%', delay: 0.5, color: '#EC4899' }
  ];

  // --- Generate SVG paths dynamically ---
  const yBaselineForArea = 240;
  const mainLinePath = generateLinePath(dataPoints);
  const areaPath = generateAreaPath(dataPoints, yBaselineForArea);
  const secondaryLinePoints = [
    { x: 60, y: 210 }, { x: 140, y: 190 }, { x: 220, y: 170 },
    { x: 300, y: 130 }, { x: 380, y: 80 }, { x: 440, y: 60 }
  ];
  const secondaryLinePath = generateLinePath(secondaryLinePoints);

  // --- Event Handlers ---
  const handlePointHover = (index: number | null) => {
    setActivePointIndex(index);
    if (index !== null) {
      const point = dataPoints[index];
      setTooltipData({
        x: point.x,
        y: point.y,
        label: point.label,
        value: point.value,
        growth: point.growth
      });
    } else {
      setTooltipData(null);
    }
  };

  const handleReplay = () => {
    setAnimationKey(prevKey => prevKey + 1); // Increment key to force re-render/re-animate
  };

  // Base animation delay for elements appearing after lines
  const postLineDrawDelay = 1.5; // Should be >= line draw duration

  return (
    // Main container - Added key for replay functionality
    <motion.div ref={ref} className="relative w-full aspect-[4/3] xs:aspect-[16/9] md:aspect-[18/9] max-w-4xl mx-auto text-white" key={animationKey}>

      {/* Subtle Background Gradient Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900/50 to-purple-900/30 opacity-0 rounded-xl pointer-events-none"
        animate={isInView ? { opacity: [0.1, 0.25, 0.1] } : { opacity: 0 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      {/* Subtle Particle Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isInView && Array.from({ length: 15 }).map((_, i) => ( // Reduced particle count
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{
              y: [null, "-30%", "-60%"], // Adjusted movement
              x: [null, `${(Math.random() - 0.5) * 15}%`], // Adjusted movement
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 6 + Math.random() * 8, // Adjusted duration
              delay: Math.random() * 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main SVG container */}
      <svg
        viewBox="0 0 500 300"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-labelledby="graphTitle"
        role="img"
        onMouseLeave={() => handlePointHover(null)} // Clear hover state when leaving SVG
      >
        <title id="graphTitle">Gráfico de Rendimiento Creciente Interactivo</title>
        <desc>Un gráfico de líneas interactivo que muestra una tendencia de crecimiento positiva durante seis meses, con efectos visuales y datos detallados al pasar el cursor.</desc>

        {/* --- SVG definitions (gradients, filters, clip paths) --- */}
        <defs>
          {/* Main gradient */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="#4F46E5" stopOpacity="1" />
             <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
             <stop offset="100%" stopColor="#EC4899" stopOpacity="1" />
          </linearGradient>
          {/* Area gradient */}
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.6" />
             <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
             <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
          </linearGradient>
           {/* Secondary gradient */}
          <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="1" /> {/* Cyan */}
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="1" /> {/* Teal */}
          </linearGradient>
          {/* Neon glow filter */}
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
             <feFlood floodColor="#8B5CF6" floodOpacity="0.8" result="glowColor"/>
             <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow"/>
             <feMerge> <feMergeNode in="softGlow"/> <feMergeNode in="SourceGraphic"/> </feMerge>
          </filter>
          {/* Highlight glow filter for hover */}
           <filter id="highlight-glow">
             <feGaussianBlur stdDeviation="3" result="blur"/>
             <feColorMatrix in="blur" type="matrix"
               values="1 0 0 0 0
                       0 1 0 0 0
                       0 0 1 0 0
                       0 0 0 18 -7" result="glow"/>
             <feMerge> <feMergeNode in="glow"/> <feMergeNode in="SourceGraphic"/> </feMerge>
           </filter>
          {/* Soft shadow filter */}
          <filter id="soft-shadow">
             <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
             <feOffset dx="0" dy="2"/>
             <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1"/>
             <feColorMatrix type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.1  0 0 0 0 0.1  0 0 0 0.5 0"/> {/* Darker shadow */}
             <feMerge> <feMergeNode/> <feMergeNode in="SourceGraphic"/> </feMerge>
          </filter>
          {/* Clip path */}
          <clipPath id="graphClip">
            <rect x="40" y="20" width="420" height="220" rx="8"/> {/* Rounded corners */}
          </clipPath>
        </defs>

        {/* --- Clipped Elements --- */}
        <g clipPath="url(#graphClip)">
          {/* Animated grid lines */}
          <g className="grid-lines">
            {/* Horizontal */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.line
                key={`h-line-${i}`}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={isInView ? { opacity: 0.15, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
                transition={{ duration: 1, delay: 0.1 + i * 0.05, ease: "easeOut" }}
                x1="40" y1={60 + i * 40} x2="460" y2={60 + i * 40}
                stroke="white" strokeDasharray="2,3" strokeWidth="0.5"
              />
            ))}
            {/* Vertical */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <motion.line
                key={`v-line-${i}`}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={isInView ? { opacity: 0.15, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
                transition={{ duration: 1, delay: 0.1 + i * 0.05, ease: "easeOut" }}
                x1={80 + i * 60} y1="30" x2={80 + i * 60} y2="240"
                stroke="white" strokeDasharray="2,3" strokeWidth="0.5"
              />
            ))}
          </g>

          {/* Performance Curves */}
          <g>
            {/* Area under the curve */}
            <motion.path
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.8 }} // Fade in after line starts drawing
              d={areaPath}
              fill="url(#areaGradient)"
            />
            {/* Secondary dashed line */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }} // Slightly slower draw
              d={secondaryLinePath}
              fill="none" stroke="url(#secondaryGradient)" strokeWidth="2"
              strokeLinecap="round" strokeDasharray="3,5" // Adjusted dash
            />
            {/* Main performance line */}
            <motion.path
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }} // Main draw animation
              d={mainLinePath}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3.5" // Slightly thinner
              strokeLinecap="round"
              filter="url(#neon-glow)"
            />
          </g>

          {/* Data Points with Hover Interaction */}
          {dataPoints.map((point, i) => {
            const isHighlighted = activePointIndex === i;
            return (
              <g key={`point-group-${i}`} style={{ cursor: 'pointer' }}
                 onMouseEnter={() => handlePointHover(i)}
                 // onMouseLeave handled by SVG container
              >
                {/* Invisible larger circle for easier hover targeting */}
                <circle cx={point.x} cy={point.y} r="15" fill="transparent" />

                {/* Outer halo circle (Subtle animation) */}
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  initial={{ opacity: 0, r: 8 }}
                  animate={isInView ? { opacity: isHighlighted ? 0.6 : 0.3, r: isHighlighted ? 11 : 8 } : { opacity: 0, r: 8 }}
                  transition={{ duration: 0.3, delay: postLineDrawDelay + point.delay, ease: "easeOut" }}
                  fill={point.color || "white"}
                  filter="url(#neon-glow)"
                />
                {/* Main data point circle */}
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  initial={{ opacity: 0, r: 5 }}
                  animate={isInView ? { opacity: 1, r: isHighlighted ? 6.5 : 5, filter: isHighlighted ? "url(#highlight-glow)" : "url(#soft-shadow)" } : { opacity: 0, r: 5 }}
                  transition={{ duration: 0.3, delay: postLineDrawDelay + point.delay, ease: "easeOut" }}
                  fill="white"
                  stroke={isHighlighted ? point.color : 'none'} // Add colored stroke on hover
                  strokeWidth="1.5"
                />
                 {/* Vertical line on hover */}
                 <motion.line
                   initial={{ opacity: 0, pathLength: 0 }}
                   animate={isInView && isHighlighted ? { opacity: 0.4, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
                   transition={{ duration: 0.2 }}
                   x1={point.x}
                   y1={point.y + (isHighlighted ? 7 : 5)} // Start below the circle
                   x2={point.x}
                   y2={yBaselineForArea}
                   stroke={point.color || "white"}
                   strokeDasharray="2,2"
                   strokeWidth="1"
                 />
              </g>
            );
          })}
        </g>

        {/* Axis Labels */}
        <g>
          {/* X-axis */}
          {dataPoints.map((point, i) => (
            <motion.text
              key={`x-label-${i}`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: activePointIndex === i ? 1 : 0.7 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: postLineDrawDelay + 0.2 + i * 0.05 }}
              x={point.x} y="260"
              textAnchor="middle"
              fill={activePointIndex === i ? point.color : "white"}
              className="text-[9px] sm:text-[11px] md:text-[12px] font-sans font-medium pointer-events-none" // Added pointer-events-none
            >
              {point.label}
            </motion.text>
          ))}
          {/* Y-axis */}
          {['0%', '25%', '50%', '75%', '100%'].map((value, i) => (
            <motion.text
              key={`y-label-${i}`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: postLineDrawDelay + 0.2 + i * 0.05 }}
              x="30" y={220 - i * 40}
              textAnchor="end"
              fill="white"
              className="text-[9px] sm:text-[11px] md:text-[12px] font-sans pointer-events-none" // Added pointer-events-none
            >
              {value}
            </motion.text>
          ))}
        </g>

        {/* Value Labels above points (Appear slightly later) */}
        {dataPoints.map((point, idx) => {
          if (point.value === 'Base') return null;
          return (
            <motion.g
              key={`value-label-${idx}`}
              initial={{ opacity: 0, y: 5 }}
              animate={isInView ? { opacity: activePointIndex === idx ? 1 : 0.8, y: 0, scale: activePointIndex === idx ? 1.05 : 1 } : { opacity: 0, y: 5 }}
              transition={{ duration: 0.3, delay: postLineDrawDelay + 0.4 + idx * 0.05 }} // Delayed appearance
            >
              <text
                x={point.x} y={point.y - 15}
                textAnchor="middle"
                fill={activePointIndex === idx ? point.color : "white"}
                className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold font-sans pointer-events-none" // Added pointer-events-none
                filter="url(#soft-shadow)"
              >
                {point.value}
              </text>
            </motion.g>
          );
        })}

        {/* Tooltip */}
        <AnimatePresence>
          {tooltipData && (
            <motion.g
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.15 }}
              style={{ pointerEvents: 'none' }} // Prevent tooltip from blocking hover on points below
            >
              {/* Tooltip Background */}
              <rect
                x={tooltipData.x - 55} // Adjusted size/position
                y={tooltipData.y - 65} // Adjusted position
                width="110"
                height="50"
                rx="6" // Slightly less rounded
                fill="rgba(17, 24, 39, 0.85)" // Darker, slightly more opaque
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1"
                filter="url(#soft-shadow)"
              />
              {/* Tooltip Content */}
              <text x={tooltipData.x} y={tooltipData.y - 48} textAnchor="middle" fill="white" className="text-[10px] font-medium">
                {tooltipData.label} 2025
              </text>
              <text x={tooltipData.x} y={tooltipData.y - 33} textAnchor="middle" fill="white" className="text-[12px] font-bold">
                {tooltipData.value}
              </text>
              <text x={tooltipData.x} y={tooltipData.y - 19} textAnchor="middle" fill="#A78BFA" className="text-[9px]"> {/* Violet color */}
                Crecimiento: {tooltipData.growth}
              </text>
              {/* Tooltip Pointer */}
              <path
                d={`M${tooltipData.x - 5} ${tooltipData.y - 15} L${tooltipData.x + 5} ${tooltipData.y - 15} L${tooltipData.x} ${tooltipData.y - 8} Z`} // Adjusted size/position
                fill="rgba(17, 24, 39, 0.85)"
              />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Floating Stat Cards */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-end justify-center p-2 xs:p-4 sm:p-8 space-y-2 xs:space-y-3"> {/* Adjusted spacing */}
        {/* Growth Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: postLineDrawDelay + 0.5 }} // Faster appearance
          className="pointer-events-auto bg-white/10 backdrop-blur-md rounded-xl p-2 xs:p-3 sm:p-4 border border-white/20 shadow-lg overflow-hidden w-28 xs:w-36 sm:w-44" // More responsive sizes
          onMouseEnter={() => handlePointHover(dataPoints.length - 1)}
          onMouseLeave={() => handlePointHover(null)}
        >
          <div className="relative z-10 flex items-start gap-2 sm:gap-3">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300"> <TrendingUpIcon /> </div>
            <div>
              <div className="text-xs font-medium text-white/80 font-sans">Crecimiento</div>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">{dataPoints[dataPoints.length - 1].value}</div>
            </div>
          </div>
           <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 blur-lg opacity-40"></div> {/* Adjusted blur/opacity */}
        </motion.div>
        {/* Efficiency Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: postLineDrawDelay + 0.65 }} // Staggered delay
           className="pointer-events-auto bg-white/10 backdrop-blur-md rounded-xl p-2 xs:p-3 sm:p-4 border border-white/20 shadow-lg overflow-hidden w-28 xs:w-36 sm:w-44"
           onMouseEnter={() => handlePointHover(3)} // Linked to April
           onMouseLeave={() => handlePointHover(null)}
        >
           <div className="relative z-10 flex items-start gap-2 sm:gap-3">
             <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300"> <ZapIcon /> </div>
             <div>
               <div className="text-xs font-medium text-white/80 font-sans">Eficiencia</div>
               <div className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">+83%</div>
             </div>
           </div>
           <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-lg opacity-40"></div>
        </motion.div>
        {/* Activity Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6, delay: postLineDrawDelay + 0.8 }} // Staggered delay
           className="pointer-events-auto bg-white/10 backdrop-blur-md rounded-xl p-2 xs:p-3 sm:p-4 border border-white/20 shadow-lg overflow-hidden w-28 xs:w-36 sm:w-44"
           onMouseEnter={() => handlePointHover(dataPoints.length - 1)} // Linked to last point
           onMouseLeave={() => handlePointHover(null)}
        >
           <div className="relative z-10 flex items-start gap-2 sm:gap-3">
             <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300"> <ActivityIcon /> </div>
             <div>
               <div className="text-xs font-medium text-white/80 font-sans">Actividad</div>
               <div className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">Alto</div>
             </div>
           </div>
           <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-lg opacity-40"></div>
        </motion.div>
      </div>

    </motion.div> // End of main container
  );
};

export default EnhancedHeroGraph;
