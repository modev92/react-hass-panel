import { useCallback, useRef, useState } from 'react';

function preventDefault(e: Event) {
  if (!isTouchEvent(e)) return;

  if (e.touches.length < 2 && e.preventDefault) {
    e.preventDefault();
  }
}

export function isTouchEvent(e: Event): e is TouchEvent {
  return e && 'touches' in e;
}

interface PressHandlers<T> {
  onLongPress?: (e: React.MouseEvent<T> | React.TouchEvent<T>) => void;
  onSwipe?: (percentage: number) => void;
  onClick?: (e: React.MouseEvent<T> | React.TouchEvent<T>) => void;
}

interface Options {
  delay?: number;
  shouldPreventDefault?: boolean;
  initialSwipePercentage?: number;
}

export default function useInteraction<T>(
  { onLongPress, onClick, onSwipe }: PressHandlers<T>,
  { delay = 500, shouldPreventDefault = true, initialSwipePercentage = 0 }: Options = {}
) {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const target = useRef<EventTarget>();
  const containerRef = useRef<HTMLButtonElement | null>(null);
  const [mousePositionStart, setMousePositionStart] = useState({ x: -1, y: -1 });
  const [relevantInitialSwipe, setRelevantInitialSwipe] = useState(0);

  const start = useCallback(
    (e: React.MouseEvent<T> | React.TouchEvent<T>) => {
      e.persist();
      const clonedEvent = { ...e };

      if (shouldPreventDefault && e.target) {
        e.target.addEventListener('touchend', preventDefault, { passive: false });
        target.current = e.target;
      }

      if (clonedEvent.type === 'touchstart') {
        const touch = (clonedEvent as React.TouchEvent<T>).touches?.[0];
        setMousePositionStart({ x: touch.pageX, y: touch.pageY });
      } else {
        setMousePositionStart({ x: (clonedEvent as React.MouseEvent<T>).clientX, y: (clonedEvent as React.MouseEvent<T>).clientY });
      }

      setRelevantInitialSwipe(initialSwipePercentage);
      timeout.current = setTimeout(() => {
        onLongPress && onLongPress(clonedEvent);
        setLongPressTriggered(true);
      }, delay);
    },
    [shouldPreventDefault, initialSwipePercentage, delay, onLongPress]
  );

  const clear = useCallback(
    (e: React.MouseEvent<T> | React.TouchEvent<T>, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      let newX = 0;
      let newY = 0;
      if (e.type === 'touchmove') {
        const touch = (e as React.TouchEvent<T>).touches?.[0];
        newX = touch.pageX;
        newY = touch.pageY;
      } else {
        newX = (e as React.MouseEvent<T>).clientX;
        newY = (e as React.MouseEvent<T>).clientY;
      }

      const smallMoveX = Math.abs(mousePositionStart.x - newX) < 5;
      const smallMoveY = Math.abs(mousePositionStart.y - newY) < 5;
      if (smallMoveX && smallMoveY) {
        shouldTriggerClick && !longPressTriggered && onClick?.(e);
      }

      setLongPressTriggered(false);
      setMousePositionStart({ x: -1, y: -1 });

      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault);
      }
    },
    [longPressTriggered, mousePositionStart, onClick, shouldPreventDefault]
  );

  const mouseMove = useCallback(
    (ev: React.MouseEvent<T> | React.TouchEvent<T>) => {
      if (!onSwipe) {
        return;
      }
      if (onLongPress) {
        // prevent trigger longpress
        timeout.current && clearTimeout(timeout.current);
      }
      // let newX = 0;
      let newY = 0;
      if (ev.type === 'touchmove') {
        const touch = (ev as React.TouchEvent<T>).touches?.[0];
        // newX = touch.pageX;
        newY = touch.pageY;
      } else {
        // newX = (ev as React.MouseEvent<T>).clientX;
        newY = (ev as React.MouseEvent<T>).clientY;
      }

      const containerH = containerRef.current?.offsetHeight;
      if (mousePositionStart.y !== -1 && containerH) {
        const offsetY = mousePositionStart.y - newY;
        const percentage = Math.abs(offsetY) / containerH;

        const newValue = offsetY > 0 ? relevantInitialSwipe + percentage * 100 : relevantInitialSwipe - percentage * 100;
        if (newValue > 100) {
          onSwipe(100);
        } else if (newValue < 0) {
          onSwipe(0);
        } else {
          onSwipe(Math.round(newValue));
        }
      }
    },
    [mousePositionStart.y, onLongPress, onSwipe, relevantInitialSwipe]
  );

  return {
    onMouseDown: (e: React.MouseEvent<T>) => start(e),
    onTouchStart: (e: React.TouchEvent<T>) => start(e),
    onMouseUp: (e: React.MouseEvent<T>) => clear(e),
    onMouseLeave: (e: React.MouseEvent<T>) => clear(e, false),
    onTouchEnd: (e: React.TouchEvent<T>) => clear(e),
    onMouseMove: (e: React.MouseEvent<T>) => mouseMove(e),
    onTouchMove: (e: React.TouchEvent<T>) => mouseMove(e),
    ref: containerRef,
  };
}
