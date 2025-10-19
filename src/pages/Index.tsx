import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

type Sector = {
  id: string;
  name: string;
  price: number;
  capacity: number;
  color: string;
  hoverColor: string;
};

const sectors: Sector[] = [
  { id: 'vip', name: 'VIP Ложа', price: 5000, capacity: 1000, color: 'bg-yellow-600/80', hoverColor: 'bg-yellow-500' },
  { id: 'north', name: 'Северная трибуна', price: 2000, capacity: 6000, color: 'bg-sport-red/80', hoverColor: 'bg-sport-red-light' },
  { id: 'south', name: 'Южная трибуна', price: 1800, capacity: 5000, color: 'bg-sport-red-light/80', hoverColor: 'bg-sport-red' },
  { id: 'west', name: 'Западная трибуна', price: 1500, capacity: 4000, color: 'bg-sport-green/80', hoverColor: 'bg-sport-green-light' },
  { id: 'east', name: 'Восточная трибуна', price: 1500, capacity: 4000, color: 'bg-sport-green-light/80', hoverColor: 'bg-sport-green' },
];

const Index = () => {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [purchased, setPurchased] = useState(false);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const [soldTickets, setSoldTickets] = useState<Record<string, number>>({
    vip: 450,
    north: 4200,
    south: 3800,
    west: 2900,
    east: 3100
  });

  const handlePurchase = () => {
    if (selectedSector) {
      setSoldTickets(prev => ({
        ...prev,
        [selectedSector.id]: prev[selectedSector.id] + 1
      }));
      setPurchased(true);
    }
  };

  const totalCapacity = sectors.reduce((sum, s) => sum + s.capacity, 0);
  const totalSold = Object.values(soldTickets).reduce((sum, n) => sum + n, 0);

  const renderFans = (sectorId: string, maxDots: number) => {
    const sector = sectors.find(s => s.id === sectorId);
    if (!sector) return null;
    
    const fillPercent = (soldTickets[sectorId] / sector.capacity) * 100;
    const dotsCount = Math.floor((fillPercent / 100) * maxDots);
    
    return Array.from({ length: dotsCount }).map((_, i) => (
      <div 
        key={i} 
        className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/70 rounded-full"
        style={{ 
          animationDelay: `${i * 20}ms`,
        }}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sport-black via-sport-green-dark to-sport-red-dark overflow-x-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(26,92,71,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(139,31,31,0.3),transparent_50%)]" />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 relative z-10 max-w-6xl">
        <Alert className="mb-4 sm:mb-8 bg-yellow-600/20 border-yellow-600/50 backdrop-blur-sm">
          <Icon name="AlertTriangle" className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-yellow-100 font-medium text-xs sm:text-sm">
            ⚠️ Это вымышленное событие. Оплата не настоящая.
          </AlertDescription>
        </Alert>

        {!purchased ? (
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6 sm:mb-10 animate-fade-in">
              <h1 className="font-druk text-3xl sm:text-5xl md:text-7xl text-white mb-2 sm:mb-4 drop-shadow-2xl tracking-wider bg-gradient-to-r from-sport-green-light via-white to-sport-red-light bg-clip-text text-transparent">
                ЛЕГИОН VS ТИТАН
              </h1>
              <p className="text-lg sm:text-2xl text-white/90 font-medium">
                Стадион «ЛЕГИОН» • Вместимость: 20 000
              </p>
              <div className="mt-3 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
                <div className="inline-block bg-sport-red/90 backdrop-blur-sm px-4 sm:px-8 py-2 sm:py-3 rounded-full border-2 border-sport-red-light">
                  <p className="text-white font-bold text-sm sm:text-lg">
                    Прошлая встреча: 5:2 в пользу Титана 🔥
                  </p>
                </div>
                <div className="inline-block bg-sport-green/90 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-sport-green-light">
                  <p className="text-white font-bold text-xs sm:text-sm">
                    📊 Продано: {totalSold.toLocaleString()} / {totalCapacity.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <Card className="bg-sport-green-dark/30 backdrop-blur-md border-sport-green/40 p-3 sm:p-8 mb-4 sm:mb-8">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="font-druk text-xl sm:text-3xl text-white mb-1 sm:mb-2">
                  ВЫБЕРИТЕ СЕКТОР
                </h2>
                <p className="text-sport-green-light text-xs sm:text-sm">
                  Нажмите на трибуну для выбора • Точки = болельщики
                </p>
              </div>

              <div className="relative mx-auto mb-4 sm:mb-6">
                <div className="relative w-full" style={{ paddingBottom: '70%' }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-green-700 via-green-800 to-green-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-sport-green-light/30 transform-gpu" style={{ transform: 'rotateX(50deg) scale(0.95)' }}>
                    
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_6.66%,rgba(150,200,150,0.15)_6.66%,rgba(150,200,150,0.15)_13.33%)]" />
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_12.5%,rgba(150,200,150,0.1)_12.5%,rgba(150,200,150,0.1)_25%)]" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-20 sm:w-32 h-20 sm:h-32 border-2 sm:border-3 border-white/30 rounded-full flex items-center justify-center">
                          <div className="absolute w-full h-0.5 bg-white/25" />
                          <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 rounded-full z-10" />
                        </div>
                        <div className="absolute -left-12 sm:-left-20 -right-12 sm:-right-20 -top-12 sm:-top-20 -bottom-12 sm:-bottom-20 border-2 sm:border-3 border-white/20 rounded-lg" />
                      </div>
                    </div>

                    <div 
                      className={`absolute top-0 inset-x-0 h-14 sm:h-24 cursor-pointer transition-all duration-500 group ${
                        hoveredSector === 'north' ? 'z-30' : 'z-10'
                      } ${selectedSector?.id === 'north' ? 'ring-2 sm:ring-4 ring-yellow-400' : ''}`}
                      onClick={() => setSelectedSector(sectors.find(s => s.id === 'north')!)}
                      onMouseEnter={() => setHoveredSector('north')}
                      onMouseLeave={() => setHoveredSector(null)}
                    >
                      <div className={`w-full h-full ${selectedSector?.id === 'north' ? sectors.find(s => s.id === 'north')!.hoverColor : sectors.find(s => s.id === 'north')!.color} backdrop-blur-sm relative overflow-hidden shadow-lg`}
                        style={{
                          clipPath: 'polygon(5% 0%, 95% 0%, 85% 100%, 15% 100%)',
                        }}
                      >
                        <div className="absolute inset-0 grid grid-cols-20 grid-rows-6 gap-0.5 p-1 opacity-90">
                          {renderFans('north', 120)}
                        </div>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 font-druk text-white text-[9px] sm:text-xs bg-black/40 px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">
                          СЕВЕР • {soldTickets.north.toLocaleString()}/{sectors.find(s => s.id === 'north')?.capacity.toLocaleString()}
                        </div>
                        <div className={`absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 ${selectedSector?.id === 'north' ? 'bg-white/15' : ''}`} />
                      </div>
                    </div>

                    <div 
                      className={`absolute bottom-0 inset-x-0 h-14 sm:h-24 cursor-pointer transition-all duration-500 group ${
                        hoveredSector === 'south' ? 'z-30' : 'z-10'
                      } ${selectedSector?.id === 'south' ? 'ring-2 sm:ring-4 ring-yellow-400' : ''}`}
                      onClick={() => setSelectedSector(sectors.find(s => s.id === 'south')!)}
                      onMouseEnter={() => setHoveredSector('south')}
                      onMouseLeave={() => setHoveredSector(null)}
                    >
                      <div className={`w-full h-full ${selectedSector?.id === 'south' ? sectors.find(s => s.id === 'south')!.hoverColor : sectors.find(s => s.id === 'south')!.color} backdrop-blur-sm relative overflow-hidden shadow-lg`}
                        style={{
                          clipPath: 'polygon(15% 0%, 85% 0%, 95% 100%, 5% 100%)',
                        }}
                      >
                        <div className="absolute inset-0 grid grid-cols-20 grid-rows-6 gap-0.5 p-1 opacity-90">
                          {renderFans('south', 100)}
                        </div>
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 font-druk text-white text-[9px] sm:text-xs bg-black/40 px-2 py-0.5 sm:py-1 rounded backdrop-blur-sm">
                          ЮГ • {soldTickets.south.toLocaleString()}/{sectors.find(s => s.id === 'south')?.capacity.toLocaleString()}
                        </div>
                        <div className={`absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 ${selectedSector?.id === 'south' ? 'bg-white/15' : ''}`} />
                      </div>
                    </div>

                    <div 
                      className={`absolute left-0 inset-y-14 sm:inset-y-24 w-12 sm:w-24 cursor-pointer transition-all duration-500 group ${
                        hoveredSector === 'west' ? 'z-30' : 'z-10'
                      } ${selectedSector?.id === 'west' ? 'ring-2 sm:ring-4 ring-yellow-400' : ''}`}
                      onClick={() => setSelectedSector(sectors.find(s => s.id === 'west')!)}
                      onMouseEnter={() => setHoveredSector('west')}
                      onMouseLeave={() => setHoveredSector(null)}
                    >
                      <div className={`w-full h-full ${selectedSector?.id === 'west' ? sectors.find(s => s.id === 'west')!.hoverColor : sectors.find(s => s.id === 'west')!.color} backdrop-blur-sm relative overflow-hidden shadow-lg`}
                        style={{
                          clipPath: 'polygon(0% 10%, 100% 20%, 100% 80%, 0% 90%)',
                        }}
                      >
                        <div className="absolute inset-0 grid grid-cols-4 grid-rows-20 gap-0.5 p-1 opacity-90">
                          {renderFans('west', 80)}
                        </div>
                        <div className="absolute right-0.5 sm:right-1 top-1/2 -translate-y-1/2 font-druk text-white text-[8px] sm:text-[10px] bg-black/40 px-1 py-2 sm:py-3 rounded backdrop-blur-sm writing-mode-vertical transform rotate-180">
                          ЗАПАД • {soldTickets.west.toLocaleString()}
                        </div>
                        <div className={`absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 ${selectedSector?.id === 'west' ? 'bg-white/15' : ''}`} />
                      </div>
                    </div>

                    <div 
                      className={`absolute right-0 inset-y-14 sm:inset-y-24 w-12 sm:w-24 cursor-pointer transition-all duration-500 group ${
                        hoveredSector === 'east' ? 'z-30' : 'z-10'
                      } ${selectedSector?.id === 'east' ? 'ring-2 sm:ring-4 ring-yellow-400' : ''}`}
                      onClick={() => setSelectedSector(sectors.find(s => s.id === 'east')!)}
                      onMouseEnter={() => setHoveredSector('east')}
                      onMouseLeave={() => setHoveredSector(null)}
                    >
                      <div className={`w-full h-full ${selectedSector?.id === 'east' ? sectors.find(s => s.id === 'east')!.hoverColor : sectors.find(s => s.id === 'east')!.color} backdrop-blur-sm relative overflow-hidden shadow-lg`}
                        style={{
                          clipPath: 'polygon(0% 20%, 100% 10%, 100% 90%, 0% 80%)',
                        }}
                      >
                        <div className="absolute inset-0 grid grid-cols-4 grid-rows-20 gap-0.5 p-1 opacity-90">
                          {renderFans('east', 80)}
                        </div>
                        <div className="absolute left-0.5 sm:left-1 top-1/2 -translate-y-1/2 font-druk text-white text-[8px] sm:text-[10px] bg-black/40 px-1 py-2 sm:py-3 rounded backdrop-blur-sm">
                          ВОСТОК • {soldTickets.east.toLocaleString()}
                        </div>
                        <div className={`absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 ${selectedSector?.id === 'east' ? 'bg-white/15' : ''}`} />
                      </div>
                    </div>

                    <div 
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-3 sm:-mt-6 w-24 sm:w-40 h-6 sm:h-10 cursor-pointer transition-all duration-500 group ${
                        hoveredSector === 'vip' ? 'z-40 scale-110' : 'z-20'
                      } ${selectedSector?.id === 'vip' ? 'ring-2 sm:ring-4 ring-yellow-300' : ''}`}
                      onClick={() => setSelectedSector(sectors.find(s => s.id === 'vip')!)}
                      onMouseEnter={() => setHoveredSector('vip')}
                      onMouseLeave={() => setHoveredSector(null)}
                    >
                      <div className={`w-full h-full ${selectedSector?.id === 'vip' ? sectors.find(s => s.id === 'vip')!.hoverColor : sectors.find(s => s.id === 'vip')!.color} backdrop-blur-sm rounded-lg border-2 border-yellow-400/60 relative overflow-hidden shadow-xl`}>
                        <div className="absolute inset-0 flex flex-wrap gap-0.5 p-0.5 sm:p-1 justify-center items-center">
                          {renderFans('vip', 40)}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="font-druk text-white text-[9px] sm:text-xs bg-black/50 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded backdrop-blur-sm">
                            👑 VIP • {soldTickets.vip}/{sectors.find(s => s.id === 'vip')?.capacity}
                          </span>
                        </div>
                        <div className={`absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300 ${selectedSector?.id === 'vip' ? 'bg-white/25' : ''}`} />
                      </div>
                    </div>

                    <div className="absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50">
                      <Icon name="Trophy" className="w-5 h-5 sm:w-8 sm:h-8 text-yellow-400 drop-shadow-2xl animate-pulse" />
                    </div>

                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/4 left-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-white/5 rounded-full blur-2xl" />
                      <div className="absolute bottom-1/4 right-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-white/5 rounded-full blur-2xl" />
                    </div>

                    <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 text-white/30 text-[8px] sm:text-xs font-druk">
                      ВМЕСТИМОСТЬ: 20K
                    </div>
                  </div>
                </div>
              </div>

              {selectedSector && (
                <div className="animate-scale-in bg-sport-green/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-sport-green-light mb-4 sm:mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="font-druk text-white text-sm sm:text-base mb-1">
                        {selectedSector.name}
                      </p>
                      <p className="text-sport-green-light text-2xl sm:text-3xl font-bold">
                        {selectedSector.price} ₽
                      </p>
                    </div>
                    <div>
                      <p className="text-white/70 text-xs sm:text-sm mb-1">
                        Заполненность
                      </p>
                      <p className="text-white text-lg sm:text-2xl font-bold">
                        {Math.round((soldTickets[selectedSector.id] / selectedSector.capacity) * 100)}%
                      </p>
                      <p className="text-white/60 text-[10px] sm:text-xs mt-1">
                        {soldTickets[selectedSector.id].toLocaleString()} / {selectedSector.capacity.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            <div className="text-center">
              <Button
                onClick={handlePurchase}
                disabled={!selectedSector}
                size="lg"
                className="font-druk text-base sm:text-2xl px-8 sm:px-12 py-6 sm:py-8 bg-gradient-to-r from-sport-red-dark to-sport-red-light hover:from-sport-red to-sport-red-light text-white shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Icon name="Ticket" className="mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8" />
                {selectedSector ? 'КУПИТЬ БИЛЕТ' : 'ВЫБЕРИТЕ СЕКТОР'}
              </Button>
              {selectedSector && (
                <p className="text-white/60 mt-3 sm:mt-4 text-xs sm:text-sm animate-fade-in">
                  К оплате: {selectedSector.price} ₽
                </p>
              )}
            </div>
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
                    <span className="font-bold">{selectedSector?.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>👥 Вместимость:</span>
                    <span className="font-bold">{selectedSector?.capacity.toLocaleString()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>💰 Цена:</span>
                    <span className="font-bold text-yellow-300">{selectedSector?.price} ₽</span>
                  </p>
                </div>
              </div>

              <Button
                onClick={() => {
                  setPurchased(false);
                  setSelectedSector(null);
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
