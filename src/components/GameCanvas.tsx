import React, { useRef, useEffect, useCallback } from 'react';
import { GameCanvasProps, GameState, Player, Monster, Particle, DamageText } from '../types/gameTypes';
import './GameCanvas.css';

const GameCanvas: React.FC<GameCanvasProps> = ({ gameState, setGameState, onCanvasClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const update = useCallback(() => {
    setGameState((prevState: GameState) => {
      const newState: GameState = { ...prevState };
      
      if (newState.player.attackCooldown > 0) {
        newState.player = {
          ...newState.player,
          attackCooldown: newState.player.attackCooldown - 1
        };
      }

      newState.player = {
        ...newState.player,
        animFrame: newState.player.animFrame + newState.player.animSpeed
      };

      newState.monsters = newState.monsters.map((monster: Monster) => ({
        ...monster,
        animFrame: monster.animFrame + monster.animSpeed
      }));

      newState.particles = newState.particles.filter((particle: Particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;
        return particle.life > 0;
      });

      newState.damageTexts = newState.damageTexts.filter((text: DamageText) => {
        text.y -= 1;
        text.life--;
        return text.life > 0;
      });

      return newState;
    });
  }, [setGameState]);

  const drawPlayer = useCallback((ctx: CanvasRenderingContext2D, player: Player) => {
    ctx.fillStyle = player.isAttacking ? '#ffaaff' : '#ff69b4';
    
    const offsetY = Math.sin(player.animFrame) * 2;
    
    ctx.fillRect(player.x, player.y + offsetY, player.width, player.height);
    
    ctx.fillStyle = '#ffddff';
    ctx.fillRect(player.x + 15, player.y + 10 + offsetY, 30, 30);
    
    ctx.fillStyle = '#4169e1';
    ctx.fillRect(player.x + 10, player.y + 45 + offsetY, 40, 35);
    
    if (player.isAttacking) {
      ctx.fillStyle = '#ffff00';
      ctx.fillRect(player.x + 50, player.y + 20 + offsetY, 20, 5);
      
      ctx.fillStyle = '#ffa500';
      for (let i = 0; i < 5; i++) {
        ctx.fillRect(
          player.x + 70 + i * 8,
          player.y + 15 + offsetY + Math.sin(Date.now() * 0.01 + i) * 3,
          6, 15
        );
      }
    }
    
    ctx.fillStyle = '#ff1493';
    ctx.fillRect(player.x + 5, player.y + 5 + offsetY, 50, 15);
  }, []);

  const drawMonsters = useCallback((ctx: CanvasRenderingContext2D, monsters: Monster[]) => {
    monsters.forEach((monster: Monster) => {
      const offsetY = Math.sin(monster.animFrame) * 1;
      
      ctx.fillStyle = monster.color;
      ctx.fillRect(monster.x, monster.y + offsetY, monster.width, monster.height);
      
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(monster.x + 10, monster.y + 10 + offsetY, 15, 15);
      
      const hpPercent = monster.hp / monster.maxHp;
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(monster.x, monster.y - 10, monster.width, 6);
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(monster.x, monster.y - 10, monster.width * hpPercent, 6);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(monster.name, monster.x + monster.width / 2, monster.y - 15);
    });
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    particles.forEach((particle: Particle) => {
      const alpha = particle.life / particle.maxLife;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x, particle.y, 3, 3);
      ctx.globalAlpha = 1;
    });
  }, []);

  const drawDamageTexts = useCallback((ctx: CanvasRenderingContext2D, damageTexts: DamageText[]) => {
    damageTexts.forEach((text: DamageText) => {
      const alpha = text.life / text.maxLife;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = text.color;
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(text.text, text.x, text.y);
      ctx.globalAlpha = 1;
    });
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 800, 600);

    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, '#2c1810');
    gradient.addColorStop(1, '#8B4513');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    drawPlayer(ctx, gameState.player);
    drawMonsters(ctx, gameState.monsters);
    drawParticles(ctx, gameState.particles);
    drawDamageTexts(ctx, gameState.damageTexts);
  }, [gameState, drawPlayer, drawMonsters, drawParticles, drawDamageTexts]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const gameLoop = () => {
      update();
      draw(ctx);
      animationRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [update, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="game-canvas"
      width={800}
      height={600}
      onClick={onCanvasClick}
    />
  );
};

export default GameCanvas;