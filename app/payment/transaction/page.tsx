"use client";

import { useCartStore } from '@/store/cart';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CreditCard, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const STEPS = [
  { id: 1, title: "Bağlantı Kuruluyor", duration: 2000 },
  { id: 2, title: "Kart Bilgileri Doğrulanıyor", duration: 3000 },
  { id: 3, title: "İşlem Tamamlanıyor", duration: 2000 },
];

export default function PaymentTransactionPage() {
  const { total } = useCartStore();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const runSteps = async () => {
      for (let i = 0; i < STEPS.length; i++) {
        await new Promise(resolve => {
          timeout = setTimeout(() => {
            setCurrentStep(i);
            resolve(null);
          }, STEPS[i].duration);
        });
      }
      
      // Complete animation
      timeout = setTimeout(() => {
        setIsComplete(true);
      }, 1000);
    };

    runSteps();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-[url('/patterns/topography.svg')] bg-fixed">
      <div className="min-h-screen backdrop-blur-xl bg-background/80">
        <div className="container mx-auto px-4 py-8 max-w-3xl min-h-screen flex flex-col">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-2 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Geri Dön
            </Button>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md mx-auto">
              <AnimatePresence mode="wait">
                {!isComplete ? (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="space-y-8"
                  >
                    {/* Processing Animation */}
                    <div className="relative aspect-square w-48 mx-auto">
                      {/* Rotating Circles */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="absolute inset-0 rounded-full border-4 border-primary/30 border-t-primary" />
                      </motion.div>
                      <motion.div
                        className="absolute inset-4"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary/60" />
                      </motion.div>
                      <motion.div
                        className="absolute inset-8"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="absolute inset-0 rounded-full border-4 border-primary/10 border-t-primary/40" />
                      </motion.div>

                      {/* Center Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <CreditCard className="w-12 h-12 text-primary" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Amount Display */}
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-primary">₺ {total.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">İşleminiz Gerçekleştiriliyor</div>
                    </div>

                    {/* Steps Progress */}
                    <div className="space-y-4">
                      {STEPS.map((step, index) => (
                        <motion.div
                          key={step.id}
                          className="relative"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ 
                            opacity: currentStep >= index ? 1 : 0.5,
                            x: 0
                          }}
                          transition={{ delay: index * 0.2 }}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              currentStep >= index ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            }`}>
                              {currentStep > index ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <span>{step.id}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{step.title}</div>
                              {currentStep === index && (
                                <motion.div
                                  className="h-1 bg-primary/20 mt-2 rounded-full overflow-hidden"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                >
                                  <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ 
                                      duration: STEPS[index].duration / 1000,
                                      ease: "linear"
                                    }}
                                  />
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6"
                  >
                    {/* Success Animation */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle2 className="w-12 h-12 text-primary" />
                      </motion.div>
                    </motion.div>

                    {/* Success Message */}
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-primary">
                        İşlem Başarılı
                      </h2>
                      <p className="text-muted-foreground">
                        Ödemeniz başarıyla tamamlandı
                      </p>
                    </div>

                    {/* Amount Confirmation */}
                    <div className="bg-primary/5 rounded-xl p-4">
                      <div className="text-sm text-muted-foreground">Ödenen Tutar</div>
                      <div className="text-3xl font-bold text-primary">₺ {total.toFixed(2)}</div>
                    </div>

                    {/* Return Button */}
                    <Button
                      className="w-full h-12"
                      onClick={() => router.push('/menu')}
                    >
                      Menüye Dön
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
