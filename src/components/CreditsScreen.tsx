import { Button } from '@/components/ui/button';

interface CreditsScreenProps {
  onBack: () => void;
}

export const CreditsScreen = ({ onBack }: CreditsScreenProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-black via-purple-950 to-black">
      <div className="text-center space-y-8 p-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-primary mb-8">CRÉDITOS</h1>
        
        <div className="space-y-6 text-sm">
          <div>
            <h2 className="text-lg text-secondary mb-2">Desenvolvimento</h2>
            <p className="text-muted-foreground">Yan Souza, Barbara Luisa, Cauã Liotti, Sophie Silva, Ana Beatriz Meireles, Eliene Fiuza, Erick Jesus, Nicolas Cascino.</p>
          </div>
          
          <div>
            <h2 className="text-lg text-secondary mb-2">Design</h2>
            <p className="text-muted-foreground">Sistema de design temático com cores vibrantes</p>
          </div>
          
          <div>
            <h2 className="text-lg text-secondary mb-2">Tecnologias</h2>
            <p className="text-muted-foreground">React • TypeScript • Tailwind CSS</p>
          </div>
          
          <div>
            <h2 className="text-lg text-secondary mb-2">Objetivo</h2>
            <p className="text-muted-foreground">
              Ensinar matemática de forma divertida e interativa através de elementos de RPG
            </p>
          </div>
        </div>

        <div className="pt-8">
          <Button
            onClick={onBack}
            className="bg-primary hover:bg-primary/80 px-8 h-12"
          >
            ◀ VOLTAR
          </Button>
        </div>
      </div>
    </div>
  );
};
