import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
} from 'react';

function Carousel({
    children,
    speed = 50, // pixels per second
    initialDirection = 'right-to-left', // 'right-to-left' (content moves R to L), 'left-to-right' (content moves L to R)
    isInfinite = true,
    containerHeight = '200px',
    className = '',
}) {
    const [currentPosition, setCurrentPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartScrollPosition, setDragStartScrollPosition] = useState(0);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    const [autoScrollDirection, setAutoScrollDirection] = useState(() => {
        return initialDirection === 'left-to-right' ? 'right' : 'left';
    });

    const trackRef = useRef(null);
    const viewportRef = useRef(null);
    const animationFrameRef = useRef(null);
    const actualContentWidthRef = useRef(0);
    const lastTimestampRef = useRef(0);

    const originalChildrenArray = useMemo(
        () => React.Children.toArray(children),
        [children],
    );

    const itemsToRender = useMemo(() => {
        if (!isInfinite || originalChildrenArray.length === 0) {
            return originalChildrenArray;
        }
        return [
            ...originalChildrenArray,
            ...originalChildrenArray,
            ...originalChildrenArray,
        ];
    }, [originalChildrenArray, isInfinite]);

    const calculateWidthsAndSetInitialPosition = useCallback(() => {
        if (
            trackRef.current &&
            viewportRef.current &&
            originalChildrenArray.length > 0
        ) {
            const totalRenderedWidth = trackRef.current.scrollWidth;
            const numSets = isInfinite ? 3 : 1;

            if (totalRenderedWidth > 0 && numSets > 0) {
                const singleSetWidth = totalRenderedWidth / numSets;

                if (singleSetWidth > 0) {
                    // Ensure singleSetWidth is positive for calculations
                    actualContentWidthRef.current = singleSetWidth;
                    if (isInfinite) {
                        setCurrentPosition(-singleSetWidth);
                    } else {
                        setCurrentPosition(0);
                    }
                    setIsLayoutReady(true); // Layout is now ready
                } else {
                    actualContentWidthRef.current = 0;
                    setIsLayoutReady(false);
                }
            } else {
                actualContentWidthRef.current = 0;
                setIsLayoutReady(false);
            }
        } else {
            // Component not ready (no track/viewport ref, or no children)
            actualContentWidthRef.current = 0;
            setIsLayoutReady(false);
        }
    }, [isInfinite, originalChildrenArray.length]);

    // Effect for initial width calculation and on items/structure change
    useEffect(() => {
        // Using a timeout to allow child elements to render and their dimensions to be available.
        const timer = setTimeout(() => {
            calculateWidthsAndSetInitialPosition();
        }, 50); // 50ms delay, adjust if needed. 0ms can also work but 50ms gives more buffer.

        return () => clearTimeout(timer);
    }, [calculateWidthsAndSetInitialPosition, itemsToRender]); // itemsToRender ensures DOM is updated

    // Automatic Scrolling Logic
    useEffect(() => {
        // Updated condition to include !isLayoutReady
        if (
            isDragging ||
            speed === 0 ||
            !isLayoutReady ||
            !trackRef.current ||
            actualContentWidthRef.current === 0 ||
            originalChildrenArray.length === 0
        ) {
            if (animationFrameRef.current)
                cancelAnimationFrame(animationFrameRef.current);
            lastTimestampRef.current = 0;
            return;
        }

        const animate = (timestamp) => {
            if (!lastTimestampRef.current) {
                lastTimestampRef.current = timestamp;
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            const deltaTime = (timestamp - lastTimestampRef.current) / 1000; // seconds
            lastTimestampRef.current = timestamp;
            const moveDistance = speed * deltaTime;

            setCurrentPosition((prevPosition) => {
                let newPosition;
                if (autoScrollDirection === 'left') {
                    newPosition = prevPosition - moveDistance;
                } else {
                    newPosition = prevPosition + moveDistance;
                }

                if (isInfinite && actualContentWidthRef.current > 0) {
                    const contentWidth = actualContentWidthRef.current;
                    if (newPosition <= -2 * contentWidth) {
                        newPosition =
                            (newPosition % contentWidth) - contentWidth;
                        // Ensure it doesn't become 0 if newPosition was exactly -2 * contentWidth
                        if (
                            newPosition === -contentWidth &&
                            prevPosition - moveDistance < -2 * contentWidth
                        )
                            newPosition =
                                -contentWidth +
                                ((prevPosition - moveDistance) % contentWidth);
                    } else if (newPosition >= 0) {
                        newPosition =
                            (newPosition % contentWidth) - contentWidth;
                        // Ensure it doesn't become -contentWidth if newPosition was exactly 0
                        if (
                            newPosition === -contentWidth &&
                            prevPosition + moveDistance > 0
                        )
                            newPosition =
                                -contentWidth +
                                ((prevPosition + moveDistance) % contentWidth);
                    }
                } else if (
                    !isInfinite &&
                    viewportRef.current &&
                    trackRef.current
                ) {
                    const trackW = trackRef.current.scrollWidth;
                    const viewportW = viewportRef.current.offsetWidth;
                    const maxScrollOffset = Math.max(0, trackW - viewportW); // Ensure not negative

                    if (newPosition > 0) newPosition = 0;
                    if (newPosition < -maxScrollOffset)
                        newPosition = -maxScrollOffset;
                }
                return newPosition;
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current)
                cancelAnimationFrame(animationFrameRef.current);
            lastTimestampRef.current = 0;
        };
    }, [
        isDragging,
        speed,
        autoScrollDirection,
        isInfinite,
        originalChildrenArray.length,
        isLayoutReady,
    ]); // Added isLayoutReady to dependencies

    const handleDragStart = (clientX) => {
        setIsDragging(true);
        setDragStartX(clientX);
        setDragStartScrollPosition(currentPosition);
        if (animationFrameRef.current)
            cancelAnimationFrame(animationFrameRef.current);
        lastTimestampRef.current = 0;
        if (document.body) document.body.style.userSelect = 'none';
    };

    const handleDragMove = (clientX) => {
        if (!isDragging || !trackRef.current) return;
        const deltaX = clientX - dragStartX;
        let newPosition = dragStartScrollPosition + deltaX;

        if (!isInfinite && viewportRef.current && trackRef.current) {
            const trackW = trackRef.current.scrollWidth;
            const viewportW = viewportRef.current.offsetWidth;
            const maxScrollOffset = Math.max(0, trackW - viewportW);

            if (newPosition > 0) newPosition = 0;
            if (newPosition < -maxScrollOffset) newPosition = -maxScrollOffset;
        }
        setCurrentPosition(newPosition);

        if (deltaX > 5) {
            setAutoScrollDirection('right');
        } else if (deltaX < -5) {
            setAutoScrollDirection('left');
        }
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (document.body) document.body.style.userSelect = '';

        if (isInfinite && actualContentWidthRef.current > 0) {
            setCurrentPosition((prevPos) => {
                const contentWidth = actualContentWidthRef.current;
                let normalizedPos = prevPos;

                // Normalize to the range of the "middle" set: [-contentWidth, -2*contentWidth + epsilon]
                // If currentPosition is positive (viewing "first" set) or too negative (viewing "third" set)
                if (normalizedPos >= 0) {
                    normalizedPos =
                        (normalizedPos % contentWidth) - contentWidth;
                    if (normalizedPos === -contentWidth && prevPos !== 0) {
                        // Avoid snapping 0 to -contentWidth if it was already 0
                        normalizedPos =
                            -contentWidth + (prevPos % contentWidth);
                    }
                } else if (normalizedPos < -2 * contentWidth) {
                    // Strictly less than start of 3rd set's copy of 1st item
                    normalizedPos =
                        (normalizedPos % contentWidth) - contentWidth;
                }
                // If it ends up exactly on -2*contentWidth, it means it's at the start of the third set.
                // The auto-scroll logic will handle the jump.
                // The goal here is to bring it conceptually closer to the middle set.
                return normalizedPos;
            });
        }
    };

    const onMouseDown = (e) => {
        e.preventDefault();
        handleDragStart(e.clientX);
    };
    const onMouseMove = (e) => {
        if (isDragging) handleDragMove(e.clientX);
    };
    const onMouseUp = () => handleDragEnd();
    const onMouseLeave = () => {
        if (isDragging) handleDragEnd();
    };

    const onTouchStart = (e) => {
        handleDragStart(e.touches[0].clientX);
    };
    const onTouchMove = (e) => {
        if (isDragging) handleDragMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => handleDragEnd();

    useEffect(() => {
        const handleResize = () => {
            if (animationFrameRef.current)
                cancelAnimationFrame(animationFrameRef.current);
            // Recalculate widths and positions. This will also update isLayoutReady.
            calculateWidthsAndSetInitialPosition();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [calculateWidthsAndSetInitialPosition]);

    const viewportStyle = {
        width: '100%',
        height: containerHeight,
        overflow: 'hidden',
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
    };

    const trackStyle = {
        display: 'flex',
        transform: `translateX(${currentPosition}px)`,
        height: '100%',
        transition: isDragging ? 'none' : undefined,
    };

    const itemWrapperStyle = {
        flexShrink: 0,
        height: '100%',
        boxSizing: 'border-box',
    };

    if (originalChildrenArray.length === 0) {
        return (
            <div
                style={{
                    ...viewportStyle,
                    cursor: 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                className={className}
            >
                No items to display.
            </div>
        );
    }

    return (
        <div
            ref={viewportRef}
            style={viewportStyle}
            className={`carousel-viewport ${className}`}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            role="region"
            aria-roledescription="carousel"
        >
            <div
                ref={trackRef}
                style={trackStyle}
                className="carousel-track"
                aria-live={isDragging || !isLayoutReady ? 'off' : 'polite'}
            >
                {itemsToRender.map((child, index) => (
                    <div
                        key={`carousel-item-${index}`}
                        className="carousel-item"
                        style={itemWrapperStyle}
                        role="group"
                        aria-roledescription="slide"
                    >
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
