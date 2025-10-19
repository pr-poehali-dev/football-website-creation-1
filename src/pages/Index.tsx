import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

type Seat = {
  id: string;
  sector: string;
  row: number;
  seat: number;
  price: number;
  status: 'available' | 'sold';
  x: number;
  y: number;
};

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];

  const createArc = (
    centerX: number,
    centerY: number,
    startAngle: number,
    endAngle: number,
    innerRadius: number,
    outerRadius: number,
    sector: string,
    basePrice: number,
    rows: number
  ) => {
    const rowStep = (outerRadius - innerRadius) / rows;
    
    for (let row = 0; row < rows; row++) {
      const radius = innerRadius + row * rowStep;
      const seatsInRow = Math.floor(radius * (endAngle - startAngle) / 1.2);
      const angleStep = (endAngle - startAngle) / seatsInRow;
      
      for (let i = 0; i < seatsInRow; i++) {
        const angle = startAngle + i * angleStep;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        seats.push({
          id: `${sector}-${row}-${i}`,
          sector,
          row: row + 1,
          seat: i + 1,
          price: basePrice + (rows - row) * 100,
          status: Math.random() < 0.62 ? 'sold' : 'available',
          x: (x / 100) * 100,
          y: (y / 100) * 100,
        });
      }
    }
  };

  const PI = Math.PI;
  createArc(50, 50, -PI * 0.75, -PI * 0.25, 28, 42, 'north', 2000, 8);
  createArc(50, 50, PI * 0.25, PI * 0.75, 28, 42, 'south', 1800, 8);
  createArc(50, 50, PI * 0.75, PI * 1.25, 28, 40, 'west', 1500, 7);
  createArc(50, 50, -PI * 0.25, PI * 0.25, 28, 40, 'east', 1500, 7);
  createArc(50, 50, -PI * 0.6, -PI * 0.4, 38, 42, 'vip', 5000, 3);

  return seats;
};

const Index = () => {
  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);
  const [purchasedSeat, setPurchasedSeat] = useState<Seat | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'sold') return;
    
    setSeats(prev => prev.map(s => 
      s.id === seat.id ? { ...s, status: 'sold' as const } : s
    ));
    setPurchasedSeat(seat);
    setShowSuccess(true);
  };

  const availableSeats = seats.filter(s => s.status === 'available').length;
  const totalSeats = seats.length;

  const getSeatColor = (seat: Seat) => {
    if (seat.status === 'sold') return '#4B5563';
    
    switch (seat.sector) {
      case 'vip': return '#EAB308';
      case 'north': return '#C92A2A';
      case 'south': return '#E03131';
      case 'west': return '#1A5C47';
      case 'east': return '#2D7A5F';
      default: return '#6B7280';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sport-black via-sport-green-dark to-sport-red-dark overflow-x-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(26,92,71,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(139,31,31,0.3),transparent_50%)]" />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 relative z-10 max-w-7xl">
        <Alert className="mb-4 sm:mb-6 bg-yellow-600/20 border-yellow-600/50 backdrop-blur-sm">
          <Icon name="AlertTriangle" className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-yellow-100 font-medium text-xs sm:text-sm">
            ⚠️ Это вымышленное событие. Оплата не настоящая.
          </AlertDescription>
        </Alert>

        {!showSuccess ? (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-4 sm:mb-8 animate-fade-in">
              <h1 className="font-druk text-3xl sm:text-5xl md:text-6xl text-white mb-2 sm:mb-3 drop-shadow-2xl tracking-wider bg-gradient-to-r from-sport-green-light via-white to-sport-red-light bg-clip-text text-transparent">
                ЛЕГИОН VS ТИТАН
              </h1>
              <p className="text-base sm:text-xl text-white/90 font-medium mb-3">
                Стадион «ЛЕГИОН»
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-center">
                <div className="bg-sport-red/90 backdrop-blur-sm px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border-2 border-sport-red-light">
                  <span className="text-white font-bold text-xs sm:text-sm">
                    Прошлая встреча: 5:2 в пользу Титана 🔥
                  </span>
                </div>
                <div className="bg-sport-green/90 backdrop-blur-sm px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border-2 border-sport-green-light">
                  <span className="text-white font-bold text-xs sm:text-sm">
                    📊 Доступно: {availableSeats} / {totalSeats}
                  </span>
                </div>
              </div>
            </div>

            <Card className="bg-sport-green-dark/40 backdrop-blur-md border-sport-green/40 p-4 sm:p-8 mb-4">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="font-druk text-xl sm:text-3xl text-white mb-2">
                  СХЕМА СТАДИОНА
                </h2>
                <p className="text-sport-green-light text-xs sm:text-sm mb-4">
                  Нажмите на место для покупки • Серые = проданы
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-4 sm:mb-6 text-xs">
                <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg backdrop-blur-sm border border-yellow-500/30">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
                  <div>
                    <div className="font-druk text-white text-xs">VIP ЛОЖА</div>
                    <div className="text-yellow-300 font-bold">5000₽</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg backdrop-blur-sm border border-sport-red/30">
                  <div className="w-3 h-3 rounded-full bg-sport-red shadow-lg shadow-sport-red/50" />
                  <div>
                    <div className="font-druk text-white text-xs">СЕВЕР</div>
                    <div className="text-sport-red-light font-bold">2000₽</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg backdrop-blur-sm border border-sport-red-light/30">
                  <div className="w-3 h-3 rounded-full bg-sport-red-light shadow-lg shadow-sport-red-light/50" />
                  <div>
                    <div className="font-druk text-white text-xs">ЮГ</div>
                    <div className="text-sport-red-light font-bold">1800₽</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg backdrop-blur-sm border border-sport-green/30">
                  <div className="w-3 h-3 rounded-full bg-sport-green shadow-lg shadow-sport-green/50" />
                  <div>
                    <div className="font-druk text-white text-xs">ЗАПАД</div>
                    <div className="text-sport-green-light font-bold">1500₽</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-lg backdrop-blur-sm border border-sport-green-light/30">
                  <div className="w-3 h-3 rounded-full bg-sport-green-light shadow-lg shadow-sport-green-light/50" />
                  <div>
                    <div className="font-druk text-white text-xs">ВОСТОК</div>
                    <div className="text-sport-green-light font-bold">1500₽</div>
                  </div>
                </div>
              </div>

              <div className="relative w-full bg-gradient-to-br from-green-950 via-green-900 to-green-950 rounded-3xl overflow-hidden border-4 border-sport-green-light/40 shadow-2xl" style={{ paddingBottom: '100%' }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.2),transparent_70%)]" />
                
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <radialGradient id="fieldGlow" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="rgba(34,197,94,0.3)" />
                      <stop offset="100%" stopColor="rgba(21,128,61,0.1)" />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  <circle cx="50" cy="50" r="45" fill="url(#fieldGlow)" />
                  
                  <g opacity="0.3" stroke="rgba(255,255,255,0.2)" strokeWidth="0.15" fill="none">
                    <rect x="25" y="30" width="50" height="40" />
                    <line x1="50" y1="30" x2="50" y2="70" />
                    <circle cx="50" cy="50" r="10" />
                    <circle cx="50" cy="50" r="0.8" fill="rgba(255,255,255,0.3)" />
                    <rect x="25" y="43" width="5" height="14" />
                    <rect x="70" y="43" width="5" height="14" />
                    <path d="M 30 43 Q 35 50 30 57" />
                    <path d="M 70 43 Q 65 50 70 57" />
                  </g>

                  <g className="seats-layer">
                    {seats.map((seat) => {
                      const isHovered = hoveredSeat?.id === seat.id;
                      return (
                        <circle
                          key={seat.id}
                          cx={seat.x}
                          cy={seat.y}
                          r={isHovered ? 0.9 : 0.6}
                          fill={getSeatColor(seat)}
                          className={`${
                            seat.status === 'sold' 
                              ? 'cursor-not-allowed opacity-50' 
                              : 'cursor-pointer hover:opacity-100 transition-all duration-200'
                          }`}
                          onClick={() => handleSeatClick(seat)}
                          onMouseEnter={() => seat.status === 'available' && setHoveredSeat(seat)}
                          onMouseLeave={() => setHoveredSeat(null)}
                          filter={isHovered ? 'url(#glow)' : ''}
                          opacity={seat.status === 'available' ? 0.9 : 0.5}
                          style={{
                            transition: 'all 0.2s ease',
                          }}
                        />
                      );
                    })}
                  </g>

                  <text x="50" y="8" textAnchor="middle" className="fill-white/40 text-[2.5px] font-druk">
                    СЕВЕР
                  </text>
                  <text x="50" y="95" textAnchor="middle" className="fill-white/40 text-[2.5px] font-druk">
                    ЮГ
                  </text>
                  <text x="8" y="52" textAnchor="middle" className="fill-white/40 text-[2.5px] font-druk" transform="rotate(-90 8 52)">
                    ЗАПАД
                  </text>
                  <text x="92" y="52" textAnchor="middle" className="fill-white/40 text-[2.5px] font-druk" transform="rotate(90 92 52)">
                    ВОСТОК
                  </text>

                  <g className="trophy-icon" opacity="0.6">
                    <circle cx="50" cy="50" r="1.5" fill="#EAB308" filter="url(#glow)" />
                    <text x="50" y="51.2" textAnchor="middle" className="text-[2px] fill-yellow-300">
                      ⚽
                    </text>
                  </g>
                </svg>

                {hoveredSeat && (
                  <div 
                    className="absolute bg-black/95 backdrop-blur-md text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 border-sport-green-light shadow-2xl pointer-events-none z-50 animate-fade-in"
                    style={{
                      left: `${hoveredSeat.x}%`,
                      top: `${hoveredSeat.y}%`,
                      transform: 'translate(-50%, -130%)',
                    }}
                  >
                    <div className="font-druk text-yellow-400 mb-1 text-xs sm:text-sm">
                      {hoveredSeat.sector.toUpperCase()}
                    </div>
                    <div className="text-[10px] sm:text-xs space-y-0.5 text-white/90">
                      <div>Ряд {hoveredSeat.row} • Место {hoveredSeat.seat}</div>
                      <div className="font-bold text-sport-green-light text-sm sm:text-base">
                        {hoveredSeat.price} ₽
                      </div>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-yellow-300 mt-1 animate-pulse">
                      Нажмите для покупки
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto animate-scale-in">
            <Card className="bg-gradient-to-br from-sport-green to-sport-green-light border-sport-green-light p-6 sm:p-12 text-center shadow-2xl">
              <div className="mb-4 sm:mb-6">
                <div className="inline-block bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-full animate-pulse">
                  <Icon name="CheckCircle2" className="w-16 h-16 sm:w-24 sm:h-24 text-white drop-shadow-lg" />
                </div>
              </div>
              <h2 className="font-druk text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6 drop-shadow-lg">
                СПАСИБО ЗА ПОКУПКУ!
              </h2>
              <p className="text-xl sm:text-2xl text-white/95 font-bold mb-2 sm:mb-4">
                Вы купили билет!
              </p>
              <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8">
                Ждём вас на стадионе «ЛЕГИОН» ⚽
              </p>
              
              <div className="bg-sport-green-dark/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-sport-green-light/30">
                <p className="font-druk text-white text-base sm:text-lg mb-3 sm:mb-4 border-b border-white/20 pb-2">ДЕТАЛИ БИЛЕТА</p>
                <div className="text-white/90 space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <p className="flex justify-between">
                    <span>🎫 Билет:</span>
                    <span className="font-bold">#{Math.floor(Math.random() * 900000 + 100000)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>⚽ Матч:</span>
                    <span className="font-bold">ЛЕГИОН vs ТИТАН</span>
                  </p>
                  <p className="flex justify-between">
                    <span>📍 Сектор:</span>
                    <span className="font-bold">{purchasedSeat?.sector.toUpperCase()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>🪑 Место:</span>
                    <span className="font-bold">Ряд {purchasedSeat?.row}, Место {purchasedSeat?.seat}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>💰 Цена:</span>
                    <span className="font-bold text-yellow-300">{purchasedSeat?.price} ₽</span>
                  </p>
                </div>
              </div>

              <div 
                onClick={() => {
                  setShowSuccess(false);
                  setPurchasedSeat(null);
                }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/30 font-druk px-6 py-3 rounded-xl cursor-pointer hover:scale-105 transition-all text-sm sm:text-base"
              >
                <Icon name="ArrowLeft" className="h-4 w-4" />
                КУПИТЬ ЕЩЁ
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
