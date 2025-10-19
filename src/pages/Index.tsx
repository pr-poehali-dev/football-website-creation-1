import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

type Sector = {
  id: string;
  name: string;
  price: number;
  color: string;
  position: string;
};

const sectors: Sector[] = [
  { id: 'vip', name: 'VIP Ложа', price: 5000, color: 'bg-yellow-500/80', position: 'top-8 left-1/2 -translate-x-1/2' },
  { id: 'north', name: 'Северная трибуна', price: 2000, color: 'bg-sport-red/80', position: 'top-2 left-1/2 -translate-x-1/2 w-32' },
  { id: 'south', name: 'Южная трибуна', price: 1800, color: 'bg-sport-red-light/80', position: 'bottom-2 left-1/2 -translate-x-1/2 w-32' },
  { id: 'west', name: 'Западная трибуна', price: 1500, color: 'bg-sport-green/80', position: 'top-1/2 -translate-y-1/2 left-2 h-24' },
  { id: 'east', name: 'Восточная трибуна', price: 1500, color: 'bg-sport-green/80', position: 'top-1/2 -translate-y-1/2 right-2 h-24' },
];

const Index = () => {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [purchased, setPurchased] = useState(false);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  const handlePurchase = () => {
    if (selectedSector) {
      setPurchased(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sport-black via-sport-green-dark to-sport-red-dark overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(26,92,71,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(139,31,31,0.3),transparent_50%)]" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Alert className="mb-8 bg-yellow-600/20 border-yellow-600/50 backdrop-blur-sm">
          <Icon name="AlertTriangle" className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-yellow-100 font-medium">
            ⚠️ Это вымышленное событие. Оплата не настоящая.
          </AlertDescription>
        </Alert>

        {!purchased ? (
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="font-druk text-5xl md:text-7xl text-white mb-4 drop-shadow-2xl tracking-wider bg-gradient-to-r from-sport-green-light via-white to-sport-red-light bg-clip-text text-transparent">
                ЛЕГИОН VS ТИТАН
              </h1>
              <p className="text-2xl text-white/90 font-medium">
                Стадион «ЛЕГИОН»
              </p>
              <div className="mt-6 inline-block bg-sport-red/90 backdrop-blur-sm px-8 py-3 rounded-full border-2 border-sport-red-light">
                <p className="text-white font-bold text-lg">
                  Прошлая встреча: 5:2 в пользу Титана 🔥
                </p>
              </div>
            </div>

            <Card className="bg-sport-green-dark/30 backdrop-blur-md border-sport-green/40 p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="font-druk text-3xl text-white mb-2">
                  ВЫБЕРИТЕ СЕКТОР
                </h2>
                <p className="text-sport-green-light text-sm">
                  Нажмите на сектор стадиона для выбора
                </p>
              </div>

              <div className="relative mx-auto max-w-3xl mb-6">
                <div className="relative aspect-[16/9] bg-gradient-to-b from-green-800 to-green-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-sport-green-light/30">
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_48%,rgba(255,255,255,0.05)_48%,rgba(255,255,255,0.05)_52%,transparent_52%)] bg-[length:100%_15px]" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 border-4 border-white/30 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>

                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sport-green-dark/80 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-sport-green-dark/80 to-transparent" />
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-sport-green-dark/80 to-transparent" />
                  <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-sport-green-dark/80 to-transparent" />

                  {sectors.map((sector) => (
                    <div
                      key={sector.id}
                      className={`absolute ${sector.position} cursor-pointer transition-all duration-300 ${
                        hoveredSector === sector.id ? 'scale-110 z-20' : 'z-10'
                      } ${selectedSector?.id === sector.id ? 'ring-4 ring-yellow-400' : ''}`}
                      onClick={() => setSelectedSector(sector)}
                      onMouseEnter={() => setHoveredSector(sector.id)}
                      onMouseLeave={() => setHoveredSector(null)}
                    >
                      <div className={`${sector.color} backdrop-blur-sm px-4 py-2 rounded-lg border-2 ${
                        selectedSector?.id === sector.id ? 'border-yellow-400' : 'border-white/30'
                      } hover:border-white hover:shadow-lg hover:shadow-white/20 transition-all`}>
                        <span className="font-druk text-white text-xs whitespace-nowrap block">
                          {sector.id === 'vip' ? '👑' : '🎫'} {sector.price} ₽
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <Icon name="Trophy" className="w-10 h-10 text-yellow-400 drop-shadow-lg animate-pulse" />
                  </div>
                </div>
              </div>

              {selectedSector && (
                <div className="animate-scale-in bg-sport-green/30 backdrop-blur-sm rounded-xl p-6 border-2 border-sport-green-light mb-6">
                  <div className="text-center">
                    <p className="font-druk text-white text-xl mb-2">
                      {selectedSector.name}
                    </p>
                    <p className="text-sport-green-light text-3xl font-bold">
                      {selectedSector.price} ₽
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
                className="font-druk text-2xl px-12 py-8 bg-gradient-to-r from-sport-red-dark to-sport-red-light hover:from-sport-red to-sport-red-light text-white shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Icon name="Ticket" className="mr-3 h-8 w-8" />
                {selectedSector ? 'КУПИТЬ БИЛЕТ' : 'ВЫБЕРИТЕ СЕКТОР'}
              </Button>
              {selectedSector && (
                <p className="text-white/60 mt-4 text-sm animate-fade-in">
                  К оплате: {selectedSector.price} ₽
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto animate-scale-in">
            <Card className="bg-gradient-to-br from-sport-green to-sport-green-light border-sport-green-light p-12 text-center shadow-2xl">
              <div className="mb-6">
                <div className="inline-block bg-white/20 backdrop-blur-sm p-6 rounded-full animate-pulse">
                  <Icon name="CheckCircle2" className="w-24 h-24 text-white drop-shadow-lg" />
                </div>
              </div>
              <h2 className="font-druk text-4xl md:text-5xl text-white mb-6 drop-shadow-lg">
                СПАСИБО ЗА ПОКУПКУ!
              </h2>
              <p className="text-2xl text-white/95 font-bold mb-4">
                Вы купили билет!
              </p>
              <p className="text-xl text-white/90 mb-8">
                Ждём вас на стадионе «ЛЕГИОН» ⚽
              </p>
              
              <div className="bg-sport-green-dark/50 backdrop-blur-sm rounded-xl p-6 mb-6 border-2 border-sport-green-light/30">
                <p className="font-druk text-white text-lg mb-4 border-b border-white/20 pb-2">ДЕТАЛИ БИЛЕТА</p>
                <div className="text-white/90 space-y-3 text-left">
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
                className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30 font-druk hover:scale-105 transition-all"
              >
                <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                КУПИТЬ ЕЩЁ
              </Button>
            </Card>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
