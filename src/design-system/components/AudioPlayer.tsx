import React, { useState, useEffect } from 'react';
import { Play, Square } from 'lucide-react';
import { audioService } from '../../core/services/audioService';

interface AudioPlayerProps {
  title: string;
  authorName?: string;
  durationSec: number;
  speechText?: string;
  onFinished?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  authorName,
  durationSec,
  speechText,
  onFinished,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      const step = 100 / durationSec;
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            onFinished?.();
            return 0;
          }
          return prev + step;
        });
      }, 1000);
    } else {
      setProgress(0);
    }
    return () => clearInterval(timer);
  }, [isPlaying, durationSec, onFinished]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioService.stop();
    } else {
      setIsPlaying(true);
      if (speechText) {
        audioService.speak(speechText);
      } else {
        audioService.playChimeTone('success');
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #E2DDD5',
        borderRadius: '18px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: 'var(--shadow-subtle)',
      }}
    >
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? `Stop listening to ${title}` : `Listen to ${title}`}
        className="touch-target-senior"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: isPlaying ? '#B42318' : '#197278',
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        {isPlaying ? <Square size={22} fill="#FFFFFF" /> : <Play size={24} fill="#FFFFFF" style={{ marginLeft: '3px' }} />}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#17324D', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {title}
        </div>
        {authorName && (
          <div style={{ fontSize: '14px', color: '#197278', fontWeight: 600, marginTop: '2px' }}>
            By {authorName} • {durationSec}s
          </div>
        )}

        {/* Visual Waveform / Progress bar */}
        <div
          style={{
            height: '8px',
            backgroundColor: '#EAF4F4',
            borderRadius: '4px',
            marginTop: '8px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: '#197278',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
};
