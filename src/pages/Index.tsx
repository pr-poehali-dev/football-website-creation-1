import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

type Sector = {
  id: string;
  name: string;
  price: number;
  color: string;
  hoverColor: string;
};

const sectors: Sector[] = [
  { id: 'vip', name: 'VIP Ложа', price: 5000, color: 'bg-yellow-600/70', hoverColor: 'bg-yellow-500' },
  { id: 'north', name: 'Северная трибуна', price: 2000, color: 'bg-sport-red/70', hoverColor: 'bg-sport-red-light' },
  { id: 'south', name: 'Южная трибуна', price: 1800, color: 'bg-sport-red-light/70', hoverColor: 'bg-sport-red' },
  { id: 'west', name: 'Западная трибуна', price: 1500, color: 'bg-sport-green/70', hoverColor: 'bg-sport-green-light' },
  { id: 'east', name: 'Восточная трибуна', price: 1500, color: 'bg-sport-green-light/70', hoverColor: 'bg-sport-green' },
];

const Index = () => {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [purchased, setPurchased] = useState(false);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const [fans, setFans] = useState<Array<{ id: number; x: number; y: number; sector: string }>>([]);

  useEffect(() => {
    if (selectedSector) {
      const newFans = Array.from({ length: 30 }, (_, i) => ({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        sector: selectedSector.id
      }));
      setFans(prev => [...prev, ...newFans]);
    }
  }, [selectedSector]);

  const handlePurchase = () => {
    if (selectedSector) {
      setPurchased(true);
    }
  };

  const getSectorFans = (sectorId: string) => fans.filter(f => f.sector === sectorId);

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
            <div className="text-center mb-6 sm:mb-12 animate-fade-in">
              <h1 className="font-druk text-3xl sm:text-5xl md:text-7xl text-white mb-2 sm:mb-4 drop-shadow-2xl tracking-wider bg-gradient-to-r from-sport-green-light via-white to-sport-red-light bg-clip-text text-transparent">
                ЛЕГИОН VS ТИТАН
              </h1>
              <p className="text-lg sm:text-2xl text-white/90 font-medium mb-3 sm:mb-0">
                Стадион «ЛЕГИОН»
              </p>
              <div className="mt-3 sm:mt-6 inline-block bg-sport-red/90 backdrop-blur-sm px-4 sm:px-8 py-2 sm:py-3 rounded-full border-2 border-sport-red-light">
                <p className="text-white font-bold text-sm sm:text-lg">
                  Прошлая встреча: 5:2 в пользу Титана 🔥
                </p>
              </div>
            </div>

            <Card className="bg-sport-green-dark/30 backdrop-blur-md border-sport-green/40 p-3 sm:p-8 mb-4 sm:mb-8">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="font-druk text-xl sm:text-3xl text-white mb-1 sm:mb-2">
                  ВЫБЕРИТЕ СЕКТОР
                </h2>
                <p className="text-sport-green-light text-xs sm:text-sm">
                  Нажмите на трибуну для выбора
                </p>
              </div>

              <div className="relative mx-auto mb-4 sm:mb-6 perspective-1000">
                <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-green-700 via-green-800 to-green-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-sport-green-light/30 transform-gpu" style={{ transform: 'rotateX(45deg) scale(0.9)' }}>
                    
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_7%,rgba(255,255,255,0.03)_7%,rgba(255,255,255,0.03)_14%)]" />
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_7%,rgba(255,255,255,0.02)_7%,rgba(255,255,255,0.02)_14%)]" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 sm:w-40 h-24 sm:h-40 border-2 sm:border-4 border-white/20 rounded-full flex items-center justify-center">
                        <div className="absolute w-full h-0.5 sm:h-1 bg-white/20" />
                        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white/40 rounded-full z-10" />
                      </div>
                    </div>

                    <div 
                      className={`absolute top-0 inset-x-0 h-16 sm:h-28 cursor-pointer transition-all duration-500 ${
                        hoveredSector === 'north' ? 'opacity-100 scale-105' : 'opacity-80'
                      } ${selectedSector?.id === 'north' ? 'ring-2 sm:ring-4 ring-yellow-400' : ''}`}
                      onClick={() => setSelectedSector(sectors.find(s => s.id === 'north')!)}
                      onMouseEnter={() => setHoveredSector('north')}
                      onMouseLeave={() => setHoveredSector(null)}
                    >
                      <div className={`w-full h-full ${selectedSector?.id === 'north' ? sectors.find(s => s.id === 'north')!.hoverColor : sectors.find(s => s.id === 'north')!.color} backdrop-blur-sm border-b-2 border-white/20 relative overflow-hidden`}>
                        <div className="absolute inset-0 grid grid-cols-10 gap-0.5 p-1">
                          {getSectorFans('north').slice(0, 20).map((fan, i) => (
                            <div 
                              key={fan.id} 
                              className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/60 rounded-full animate-pulse"
                              style={{ 
                                animationDelay: `${i * 100}ms`,
                                gridColumn: Math.floor(fan.x / 10) + 1,
                                gridRow: Math.floor(fan.y / 50) + 1
                              }}
                            />
                          ))}
                        </div>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 font-druk text-white text-[10px] sm:text-xs bg-black/30 px-2 py-0.5 sm:py-1 rounded">
                          2000₽
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`absolute bottom-0 inset-x-0 h-16 sm:h-28 cursor-pointer transition-all duration-500 ${
                        hoveredSector === 'south' ? 'opacity-100 scale-105' : 'opacity-80'
                      } ${selectedSector?.id === 'south' ? 'ring-2 sm:ring-4 ring-yellow-400' : ''}`}
                      onClick={() => setSelectedSector(sectors.find(s => s.id === 'south')!)}
                      onMouseEnter={() => setHoveredSector('south')}
                      onMouseLeave={() => setHoveredSector(null)}
                    >
                      <div className={`w-full h-full ${selectedSector?.id === 'south' ? sectors.find(s => s.id === 'south')!.hoverColor : sectors.find(s => s.id === 'south')!.color} backdrop-blur-sm border-t-2 border-white/20 relative overflow-hidden`}>
                        <div className="absolute inset-0 grid grid-cols-10 gap-0.5 p-1">
                          {getSectorFans('south').slice(0, 20).map((fan, i) => (
                            <div 
                              key={fan.id} 
                              className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/60 rounded-full animate-pulse"
                              style={{ 
                                animationDelay: `${i * 100}ms`,
                                gridColumn: Math.floor(fan.x / 10) + 1,
                                gridRow: Math.floor(fan.y / 50) + 1
                              }}
                            />
                          ))}
                        </div>
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 font-druk text-white text-[10px] sm:text-xs bg-black/30 px-2 py-0.5 sm:py-1 rounded">
                          1800₽
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`absolute left-0 inset-y-16 sm:inset-y-28 w-16 sm:w-32 cursor-pointer transition-all duration-500 ${
                        hoveredSector === 'west' ? 'opacity-100 scale-105' : 'opacity-80'
                      } ${selectedSector?.id === 'west' ? 'ring-2 sm:ring-4 ring-yellow-400' : ''}`}
                      onClick={() => setSelectedSector(sectors.find(s => s.id === 'west')!)}
                      onMouseEnter={() => setHoveredSector('west')}
                      onMouseLeave={() => setHoveredSector(null)}
                    >
                      <div className={`w-full h-full ${selectedSector?.id === 'west' ? sectors.find(s => s.id === 'west')!.hoverColor : sectors.find(s => s.id === 'west')!.color} backdrop-blur-sm border-r-2 border-white/20 relative overflow-hidden`}>
                        <div className="absolute inset-0 grid grid-rows-8 gap-0.5 p-1">
                          {getSectorFans('west').slice(0, 16).map((fan, i) => (
                            <div 
                              key={fan.id} 
                              className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/60 rounded-full animate-pulse mx-auto"
                              style={{ animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 font-druk text-white text-[10px] sm:text-xs bg-black/30 px-1 sm:px-2 py-0.5 sm:py-1 rounded writing-mode-vertical transform rotate-180">
                          1500₽
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`absolute right-0 inset-y-16 sm:inset-y-28 w-16 sm:w-32 cursor-pointer transition-all duration-500 ${
                        hoveredSector === 'east' ? 'opacity-100 scale-105' : 'opacity-80'
                      } ${selectedSector?.id === 'east' ? 'ring-2 sm:ring-4 ring-yellow-400' : ''}`}
                      onClick={() => setSelectedSector(sectors.find(s => s.id === 'east')!)}
                      onMouseEnter={() => setHoveredSector('east')}
                      onMouseLeave={() => setHoveredSector(null)}
                    >
                      <div className={`w-full h-full ${selectedSector?.id === 'east' ? sectors.find(s => s.id === 'east')!.hoverColor : sectors.find(s => s.id === 'east')!.color} backdrop-blur-sm border-l-2 border-white/20 relative overflow-hidden`}>
                        <div className="absolute inset-0 grid grid-rows-8 gap-0.5 p-1">
                          {getSectorFans('east').slice(0, 16).map((fan, i) => (
                            <div 
                              key={fan.id} 
                              className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/60 rounded-full animate-pulse mx-auto"
                              style={{ animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                        <div className="absolute left-1 top-1/2 -translate-y-1/2 font-druk text-white text-[10px] sm:text-xs bg-black/30 px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                          1500₽
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`absolute top-16 sm:top-28 left-1/2 -translate-x-1/2 w-20 sm:w-32 h-8 sm:h-12 cursor-pointer transition-all duration-500 ${
                        hoveredSector === 'vip' ? 'opacity-100 scale-110' : 'opacity-90'
                      } ${selectedSector?.id === 'vip' ? 'ring-2 sm:ring-4 ring-yellow-400' : ''}`}
                      onClick={() => setSelectedSector(sectors.find(s => s.id === 'vip')!)}
                      onMouseEnter={() => setHoveredSector('vip')}
                      onMouseLeave={() => setHoveredSector(null)}
                    >
                      <div className={`w-full h-full ${selectedSector?.id === 'vip' ? sectors.find(s => s.id === 'vip')!.hoverColor : sectors.find(s => s.id === 'vip')!.color} backdrop-blur-sm rounded-lg border-2 border-yellow-400/50 relative overflow-hidden`}>
                        <div className="absolute inset-0 flex flex-wrap gap-0.5 sm:gap-1 p-1 justify-center items-center">
                          {getSectorFans('vip').slice(0, 12).map((fan, i) => (
                            <div 
                              key={fan.id} 
                              className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full animate-pulse"
                              style={{ animationDelay: `${i * 100}ms` }}
                            />
                          ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-druk text-white text-[10px] sm:text-xs bg-black/40 px-1 sm:px-2 py-0.5 rounded">
                            👑 5000₽
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 z-20">
                      <Icon name="Trophy" className="w-6 h-6 sm:w-10 sm:h-10 text-yellow-400 drop-shadow-lg animate-pulse" />
                    </div>

                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-0 w-8 sm:w-16 h-8 sm:h-16 bg-white/5 rounded-full blur-xl" />
                      <div className="absolute bottom-0 right-0 w-8 sm:w-16 h-8 sm:h-16 bg-white/5 rounded-full blur-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {selectedSector && (
                <div className="animate-scale-in bg-sport-green/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border-2 border-sport-green-light mb-4 sm:mb-6">
                  <div className="text-center">
                    <p className="font-druk text-white text-base sm:text-xl mb-1 sm:mb-2">
                      {selectedSector.name}
                    </p>
                    <p className="text-sport-green-light text-2xl sm:text-3xl font-bold">
                      {selectedSector.price} ₽
                    </p>
                    <p className="text-white/60 text-xs sm:text-sm mt-2">
                      Болельщиков: {getSectorFans(selectedSector.id).length}
                    </p>
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
