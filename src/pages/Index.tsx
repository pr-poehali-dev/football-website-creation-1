import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

type Seat = {
  id: string;
  sector: string;
  row: number;
  seat: number;
  price: number;
  status: 'available' | 'sold' | 'selected';
  x: number;
  y: number;
};

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  let id = 0;

  const sectorConfig = [
    { name: 'north', rows: 12, seatsPerRow: 30, basePrice: 2000, startY: 8, endY: 22, curvature: 0.3 },
    { name: 'south', rows: 12, seatsPerRow: 30, basePrice: 1800, startY: 78, endY: 92, curvature: -0.3 },
    { name: 'west', rows: 8, seatsPerRow: 25, basePrice: 1500, startY: 25, endY: 75, curvature: 0.2, vertical: true, isLeft: true },
    { name: 'east', rows: 8, seatsPerRow: 25, basePrice: 1500, startY: 25, endY: 75, curvature: 0.2, vertical: true, isLeft: false },
    { name: 'vip', rows: 4, seatsPerRow: 20, basePrice: 5000, startY: 42, endY: 58, curvature: 0 },
  ];

  sectorConfig.forEach(config => {
    for (let row = 0; row < config.rows; row++) {
      for (let seat = 0; seat < config.seatsPerRow; seat++) {
        let x, y;
        
        if (config.vertical) {
          const rowProgress = row / config.rows;
          const seatProgress = seat / config.seatsPerRow;
          const baseX = config.isLeft ? 8 + rowProgress * 12 : 80 + rowProgress * 12;
          const curveOffset = Math.sin(seatProgress * Math.PI) * config.curvature * 5;
          
          x = baseX + curveOffset;
          y = config.startY + seatProgress * (config.endY - config.startY);
        } else if (config.name === 'vip') {
          const seatProgress = seat / config.seatsPerRow;
          x = 35 + seatProgress * 30;
          y = config.startY + row * 4;
        } else {
          const seatProgress = seat / config.seatsPerRow;
          const rowProgress = row / config.rows;
          const curveOffset = Math.sin(seatProgress * Math.PI) * config.curvature * 15;
          
          x = 15 + seatProgress * 70;
          y = config.startY + rowProgress * (config.endY - config.startY) + curveOffset;
        }

        const randomSold = Math.random() < 0.65;
        
        seats.push({
          id: `${config.name}-${row}-${seat}`,
          sector: config.name,
          row: row + 1,
          seat: seat + 1,
          price: config.basePrice + (config.rows - row) * 100,
          status: randomSold ? 'sold' : 'available',
          x,
          y,
        });
        id++;
      }
    }
  });

  return seats;
};

const Index = () => {
  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);
  const [purchased, setPurchased] = useState(false);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'sold') return;
    
    setSeats(prev => prev.map(s => ({
      ...s,
      status: s.id === seat.id ? 'selected' : (s.status === 'selected' ? 'available' : s.status)
    })));
    setSelectedSeat(seat);
  };

  const handlePurchase = () => {
    if (selectedSeat) {
      setSeats(prev => prev.map(s => 
        s.id === selectedSeat.id ? { ...s, status: 'sold' as const } : s
      ));
      setPurchased(true);
    }
  };

  const availableSeats = seats.filter(s => s.status === 'available').length;
  const totalSeats = seats.length;

  const getSeatColor = (seat: Seat) => {
    if (seat.status === 'sold') return 'bg-gray-600';
    if (seat.status === 'selected') return 'bg-yellow-400';
    
    switch (seat.sector) {
      case 'vip': return 'bg-yellow-500';
      case 'north': return 'bg-sport-red';
      case 'south': return 'bg-sport-red-light';
      case 'west': return 'bg-sport-green';
      case 'east': return 'bg-sport-green-light';
      default: return 'bg-gray-400';
    }
  };

  const displaySeat = hoveredSeat || selectedSeat;

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

        {!purchased ? (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-4 sm:mb-8 animate-fade-in">
              <h1 className="font-druk text-3xl sm:text-5xl md:text-6xl text-white mb-2 sm:mb-3 drop-shadow-2xl tracking-wider bg-gradient-to-r from-sport-green-light via-white to-sport-red-light bg-clip-text text-transparent">
                ЛЕГИОН VS ТИТАН
              </h1>
              <p className="text-base sm:text-xl text-white/90 font-medium mb-2">
                Стадион «ЛЕГИОН»
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-center text-xs sm:text-sm">
                <div className="bg-sport-red/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-sport-red-light">
                  <span className="text-white font-bold">Прошлая встреча: 5:2 🔥</span>
                </div>
                <div className="bg-sport-green/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-sport-green-light">
                  <span className="text-white font-bold">Доступно: {availableSeats} / {totalSeats}</span>
                </div>
              </div>
            </div>

            <Card className="bg-sport-green-dark/40 backdrop-blur-md border-sport-green/40 p-3 sm:p-6 mb-4">
              <div className="text-center mb-3 sm:mb-4">
                <h2 className="font-druk text-lg sm:text-2xl text-white mb-1 sm:mb-2">
                  ВЫБЕРИТЕ МЕСТО
                </h2>
                <p className="text-sport-green-light text-xs sm:text-sm">
                  Нажмите на кружок • Серые = проданы
                </p>
              </div>

              <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap justify-center text-xs">
                <div className="flex items-center gap-1.5 bg-black/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                  <span className="text-white/90">VIP 5000₽</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-sport-red" />
                  <span className="text-white/90">Север 2000₽</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-sport-red-light" />
                  <span className="text-white/90">Юг 1800₽</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-sport-green" />
                  <span className="text-white/90">Запад 1500₽</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-sport-green-light" />
                  <span className="text-white/90">Восток 1500₽</span>
                </div>
              </div>

              <div className="relative w-full bg-gradient-to-b from-green-900/50 to-green-800/50 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-sport-green-light/30 shadow-2xl" style={{ paddingBottom: '100%' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <pattern id="field-grass" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <rect width="10" height="10" fill="rgba(34, 197, 94, 0.1)" />
                      <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                    </pattern>
                  </defs>

                  <rect width="100" height="100" fill="url(#field-grass)" />
                  
                  <rect x="30" y="35" width="40" height="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
                  <circle cx="50" cy="50" r="8" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
                  <circle cx="50" cy="50" r="0.5" fill="rgba(255,255,255,0.2)" />
                  <line x1="50" y1="35" x2="50" y2="65" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />

                  <g className="seats-layer">
                    {seats.map((seat) => (
                      <g key={seat.id}>
                        <circle
                          cx={seat.x}
                          cy={seat.y}
                          r={seat.status === 'selected' ? '0.8' : hoveredSeat?.id === seat.id ? '0.7' : '0.5'}
                          className={`${getSeatColor(seat)} ${
                            seat.status === 'sold' 
                              ? 'cursor-not-allowed opacity-40' 
                              : 'cursor-pointer hover:opacity-100 transition-all duration-200'
                          } ${seat.status === 'selected' ? 'animate-pulse' : ''}`}
                          onClick={() => handleSeatClick(seat)}
                          onMouseEnter={() => setHoveredSeat(seat)}
                          onMouseLeave={() => setHoveredSeat(null)}
                          style={{
                            filter: seat.status === 'selected' ? 'drop-shadow(0 0 2px rgba(250,204,21,0.8))' : 
                                    hoveredSeat?.id === seat.id ? 'drop-shadow(0 0 1px rgba(255,255,255,0.6))' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                        />
                      </g>
                    ))}
                  </g>

                  <text x="50" y="51" textAnchor="middle" className="text-[3px] fill-yellow-400 font-druk">
                    ⚽
                  </text>
                </svg>

                {displaySeat && (
                  <div 
                    className="absolute bg-black/90 backdrop-blur-sm text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-white/30 pointer-events-none z-50 text-xs sm:text-sm"
                    style={{
                      left: `${displaySeat.x}%`,
                      top: `${displaySeat.y}%`,
                      transform: 'translate(-50%, -120%)',
                    }}
                  >
                    <div className="font-druk text-yellow-400 mb-0.5">
                      {displaySeat.sector.toUpperCase()}
                    </div>
                    <div className="text-[10px] sm:text-xs space-y-0.5">
                      <div>Ряд {displaySeat.row} • Место {displaySeat.seat}</div>
                      <div className="font-bold text-sport-green-light">{displaySeat.price} ₽</div>
                    </div>
                  </div>
                )}
              </div>

              {selectedSeat && (
                <div className="mt-4 sm:mt-6 animate-scale-in">
                  <Card className="bg-sport-green/30 backdrop-blur-sm border-2 border-sport-green-light p-3 sm:p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-druk text-white text-sm sm:text-base mb-1">
                          {selectedSeat.sector.toUpperCase()} - РЯД {selectedSeat.row}, МЕСТО {selectedSeat.seat}
                        </p>
                        <p className="text-sport-green-light text-xl sm:text-2xl font-bold">
                          {selectedSeat.price} ₽
                        </p>
                      </div>
                      <Button
                        onClick={handlePurchase}
                        size="lg"
                        className="font-druk text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-sport-red-dark to-sport-red-light hover:from-sport-red to-sport-red-light text-white shadow-xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 rounded-xl"
                      >
                        <Icon name="Ticket" className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                        КУПИТЬ
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
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
                    <span className="font-bold">{selectedSeat?.sector.toUpperCase()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>🪑 Место:</span>
                    <span className="font-bold">Ряд {selectedSeat?.row}, Место {selectedSeat?.seat}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>💰 Цена:</span>
                    <span className="font-bold text-yellow-300">{selectedSeat?.price} ₽</span>
                  </p>
                </div>
              </div>

              <Button
                onClick={() => {
                  setPurchased(false);
                  setSelectedSeat(null);
                }}
                variant="outline"
                className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30 font-druk hover:scale-105 transition-all text-sm sm:text-base"
              >
                <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                КУПИТЬ ЕЩЁ
              </Button>
            </Card>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
