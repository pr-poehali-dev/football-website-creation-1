import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [purchased, setPurchased] = useState(false);
  const [showStadium, setShowStadium] = useState(true);

  const handlePurchase = () => {
    setPurchased(true);
    setTimeout(() => {
      setShowStadium(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sport-blue via-sport-purple to-sport-dark overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Alert className="mb-8 bg-yellow-500/20 border-yellow-500/50 backdrop-blur-sm">
          <Icon name="AlertTriangle" className="h-4 w-4" />
          <AlertDescription className="text-yellow-100 font-medium">
            ⚠️ Это вымышленное событие. Оплата не настоящая.
          </AlertDescription>
        </Alert>

        {!purchased ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="font-druk text-5xl md:text-7xl text-white mb-4 drop-shadow-2xl tracking-wider">
                ЛЕГИОН VS ТИТАН
              </h1>
              <p className="text-2xl text-white/90 font-medium">
                Стадион «ЛЕГИОН»
              </p>
              <div className="mt-6 inline-block bg-sport-orange/90 backdrop-blur-sm px-8 py-3 rounded-full">
                <p className="text-white font-bold text-lg">
                  Прошлая встреча: 5:2 в пользу Титана
                </p>
              </div>
            </div>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="font-druk text-3xl text-white mb-4">
                  СТАДИОН «ЛЕГИОН»
                </h2>
              </div>

              <div 
                className={`relative mx-auto max-w-2xl cursor-pointer transition-all duration-500 ${
                  showStadium ? 'hover:scale-105 hover:rotate-1' : ''
                }`}
                onClick={() => setShowStadium(!showStadium)}
              >
                <div className="relative aspect-[16/10] bg-gradient-to-b from-green-600 to-green-700 rounded-3xl overflow-hidden shadow-2xl transform perspective-1000">
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_48%,rgba(255,255,255,0.1)_48%,rgba(255,255,255,0.1)_52%,transparent_52%)] bg-[length:100%_20px]" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-4 border-white/50 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                  
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <div className="bg-sport-blue/90 backdrop-blur-sm px-6 py-2 rounded-full">
                      <span className="font-druk text-white text-sm">ЛЕГИОН</span>
                    </div>
                    <div className="bg-sport-purple/90 backdrop-blur-sm px-6 py-2 rounded-full">
                      <span className="font-druk text-white text-sm">ТИТАН</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-800/80 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent" />
                  </div>

                  <div className="absolute top-2 left-1/2 -translate-x-1/2">
                    <Icon name="Trophy" className="w-8 h-8 text-yellow-400 drop-shadow-lg animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-white/70 text-sm mb-2">
                  ⬆️ Нажмите на стадион
                </p>
              </div>
            </Card>

            <div className="text-center">
              <Button
                onClick={handlePurchase}
                size="lg"
                className="font-druk text-2xl px-12 py-8 bg-gradient-to-r from-sport-orange to-red-600 hover:from-sport-orange/90 hover:to-red-600/90 text-white shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 rounded-xl"
              >
                <Icon name="Ticket" className="mr-3 h-8 w-8" />
                КУПИТЬ БИЛЕТ
              </Button>
              <p className="text-white/60 mt-4 text-sm">
                Цена: 1500 ₽
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto animate-scale-in">
            <Card className="bg-gradient-to-br from-green-500 to-green-600 border-green-400 p-12 text-center shadow-2xl">
              <div className="mb-6">
                <div className="inline-block bg-white/20 backdrop-blur-sm p-6 rounded-full">
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
                Ждём вас на стадионе «ЛЕГИОН»
              </p>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <p className="font-druk text-white text-lg mb-2">ДЕТАЛИ БИЛЕТА</p>
                <div className="text-white/90 space-y-2">
                  <p>🎫 Билет #782451</p>
                  <p>⚽ ЛЕГИОН vs ТИТАН</p>
                  <p>📍 Стадион «Легион»</p>
                  <p>💰 1500 ₽</p>
                </div>
              </div>

              <Button
                onClick={() => setPurchased(false)}
                variant="outline"
                className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30 font-druk"
              >
                <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                ВЕРНУТЬСЯ
              </Button>
            </Card>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
