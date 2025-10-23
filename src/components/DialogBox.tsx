import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface DialogBoxProps {
  speaker: string;
  text: string;
  onClose: () => void;
}

export const DialogBox = ({ speaker, text, onClose }: DialogBoxProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-end justify-center z-40 animate-fade-in">
      <Card className="w-full max-w-4xl m-8 p-6 bg-card border-4 border-primary animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-2xl">
            🧙‍♂️
          </div>
          <h3 className="text-1xl font-bold text-primary">{speaker}</h3>
        </div>
        <p className="text-1xl leading-relaxed mb-6 text-foreground">
          {text}
        </p>
        <div className="flex justify-end">
          <Button 
            onClick={onClose}
            className="bg-primary hover:bg-primary/80 text-xs px-6"
          >
            CONTINUAR ▶
          </Button>
        </div>
      </Card>
    </div>
  );
};
