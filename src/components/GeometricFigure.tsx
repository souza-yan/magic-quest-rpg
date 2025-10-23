interface GeometricFigureProps {
  shape: 'rectangle' | 'triangle' | 'circle' | 'trapezoid' | 'composite';
  dimensions: { [key: string]: number | string };
}

export const GeometricFigure = ({ shape, dimensions }: GeometricFigureProps) => {
  const getNum = (key: string): number => Number(dimensions[key]);
  
  const renderFigure = () => {
    switch (shape) {
      case 'rectangle':
        const width = getNum('width');
        const height = getNum('height');
        return (
          <svg width="200" height="150" viewBox="0 0 200 150" className="mx-auto">
            <rect 
              x="40" y="30" 
              width={width * 10} 
              height={height * 10}
              fill="hsl(var(--primary))" 
              fillOpacity="0.3"
              stroke="hsl(var(--primary))" 
              strokeWidth="3"
            />
            <line x1="40" y1={30 + height * 10 + 15} x2={40 + width * 10} y2={30 + height * 10 + 15} stroke="white" strokeWidth="2" />
            <text x={40 + (width * 10) / 2} y={30 + height * 10 + 30} fill="white" fontSize="14" textAnchor="middle" className="font-bold">
              {width}m
            </text>
            <line x1={40 + width * 10 + 15} y1="30" x2={40 + width * 10 + 15} y2={30 + height * 10} stroke="white" strokeWidth="2" />
            <text x={40 + width * 10 + 25} y={30 + (height * 10) / 2} fill="white" fontSize="14" className="font-bold">
              {height}m
            </text>
          </svg>
        );

      case 'triangle':
        const base = getNum('base');
        const triHeight = getNum('height');
        return (
          <svg width="200" height="150" viewBox="0 0 200 150" className="mx-auto">
            <polygon 
              points={`100,20 ${100 - base * 5},${20 + triHeight * 8} ${100 + base * 5},${20 + triHeight * 8}`}
              fill="hsl(var(--primary))" 
              fillOpacity="0.3"
              stroke="hsl(var(--primary))" 
              strokeWidth="3"
            />
            <line x1={100 - base * 5} y1={20 + triHeight * 8 + 15} x2={100 + base * 5} y2={20 + triHeight * 8 + 15} stroke="white" strokeWidth="2" />
            <text x="100" y={20 + triHeight * 8 + 30} fill="white" fontSize="14" textAnchor="middle" className="font-bold">
              base: {base}m
            </text>
            <line x1="100" y1="20" x2="100" y2={20 + triHeight * 8} stroke="white" strokeWidth="2" strokeDasharray="4" />
            <text x="105" y={20 + (triHeight * 8) / 2} fill="white" fontSize="14" className="font-bold">
              {triHeight}m
            </text>
          </svg>
        );

      case 'circle':
        const radius = getNum('radius');
        return (
          <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
            <circle 
              cx="100" cy="100" 
              r={radius * 10}
              fill="hsl(var(--primary))" 
              fillOpacity="0.3"
              stroke="hsl(var(--primary))" 
              strokeWidth="3"
            />
            <line x1="100" y1="100" x2={100 + radius * 10} y2="100" stroke="white" strokeWidth="2" />
            <text x={100 + (radius * 10) / 2} y="95" fill="white" fontSize="14" textAnchor="middle" className="font-bold">
              r = {radius}m
            </text>
          </svg>
        );

      case 'trapezoid':
        const base1 = getNum('base1');
        const base2 = getNum('base2');
        const trapHeight = getNum('height');
        return (
          <svg width="200" height="150" viewBox="0 0 200 150" className="mx-auto">
            <polygon 
              points={`${100 - base1 * 5},${20 + trapHeight * 8} ${100 + base1 * 5},${20 + trapHeight * 8} ${100 + base2 * 5},20 ${100 - base2 * 5},20`}
              fill="hsl(var(--primary))" 
              fillOpacity="0.3"
              stroke="hsl(var(--primary))" 
              strokeWidth="3"
            />
            <text x="100" y={20 + trapHeight * 8 + 20} fill="white" fontSize="12" textAnchor="middle" className="font-bold">
              base: {base1}m
            </text>
            <text x="100" y="15" fill="white" fontSize="12" textAnchor="middle" className="font-bold">
              base: {base2}m
            </text>
            <line x1={100 - base2 * 5 - 15} y1="20" x2={100 - base1 * 5 - 15} y2={20 + trapHeight * 8} stroke="white" strokeWidth="2" />
            <text x={100 - base2 * 5 - 25} y={20 + (trapHeight * 8) / 2} fill="white" fontSize="12" className="font-bold">
              {trapHeight}m
            </text>
          </svg>
        );

      case 'composite':
        const type = dimensions.type as string;
        if (type === 'L') {
          const w1 = getNum('w1');
          const h1 = getNum('h1');
          const w2 = getNum('w2');
          const h2 = getNum('h2');
          return (
            <svg width="200" height="180" viewBox="0 0 200 180" className="mx-auto">
              <rect x="30" y="20" width={w1 * 8} height={h1 * 8} fill="hsl(var(--primary))" fillOpacity="0.3" stroke="hsl(var(--primary))" strokeWidth="3" />
              <rect x="30" y={20 + h1 * 8} width={w2 * 8} height={h2 * 8} fill="hsl(var(--secondary))" fillOpacity="0.3" stroke="hsl(var(--secondary))" strokeWidth="3" />
              <text x={30 + (w1 * 8) / 2} y={20 + (h1 * 8) / 2} fill="white" fontSize="12" textAnchor="middle" className="font-bold">
                {w1}×{h1}
              </text>
              <text x={30 + (w2 * 8) / 2} y={20 + h1 * 8 + (h2 * 8) / 2} fill="white" fontSize="12" textAnchor="middle" className="font-bold">
                {w2}×{h2}
              </text>
            </svg>
          );
        } else if (type === 'house') {
          const houseBase = getNum('base');
          const rectHeight = getNum('rectHeight');
          const triHeight = getNum('triHeight');
          return (
            <svg width="200" height="180" viewBox="0 0 200 180" className="mx-auto">
              <rect x="50" y="80" width={houseBase * 8} height={rectHeight * 8} fill="hsl(var(--primary))" fillOpacity="0.3" stroke="hsl(var(--primary))" strokeWidth="3" />
              <polygon points={`${50 + (houseBase * 8) / 2},${80 - triHeight * 8} 50,80 ${50 + houseBase * 8},80`} fill="hsl(var(--secondary))" fillOpacity="0.3" stroke="hsl(var(--secondary))" strokeWidth="3" />
              <text x={50 + (houseBase * 8) / 2} y={80 + (rectHeight * 8) / 2} fill="white" fontSize="11" textAnchor="middle" className="font-bold">
                {houseBase}×{rectHeight}
              </text>
              <text x={50 + (houseBase * 8) / 2} y={80 - triHeight * 4} fill="white" fontSize="11" textAnchor="middle" className="font-bold">
                △h:{triHeight}
              </text>
            </svg>
          );
        } else if (type === 'shaded') {
          const bigW = getNum('bigW');
          const bigH = getNum('bigH');
          const smallW = getNum('smallW');
          const smallH = getNum('smallH');
          return (
            <svg width="220" height="200" viewBox="0 0 220 200" className="mx-auto">
              <rect x="30" y="30" width={bigW * 10} height={bigH * 10} fill="hsl(var(--primary))" fillOpacity="0.4" stroke="hsl(var(--primary))" strokeWidth="3" />
              <rect x={30 + (bigW * 10 - smallW * 10) / 2} y={30 + (bigH * 10 - smallH * 10) / 2} width={smallW * 10} height={smallH * 10} fill="hsl(var(--background))" stroke="white" strokeWidth="3" />
              <text x={30 + (bigW * 10) / 2} y="20" fill="white" fontSize="12" textAnchor="middle" className="font-bold">
                {bigW}×{bigH}
              </text>
              <text x={30 + (bigW * 10) / 2} y={30 + (bigH * 10) / 2} fill="white" fontSize="11" textAnchor="middle" className="font-bold">
                buraco: {smallW}×{smallH}
              </text>
            </svg>
          );
        }
        return null;

      default:
        return null;
    }
  };

  return (
    <div className="bg-black/40 rounded-lg p-4 my-4 border-2 border-primary/50">
      {renderFigure()}
    </div>
  );
};
