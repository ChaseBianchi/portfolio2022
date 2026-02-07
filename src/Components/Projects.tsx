import { useState, useEffect, useCallback, useRef } from 'react'
import ProjectTile from './ProjectTile'
import { projects } from '../data/projects'

function Projects() {
  const [slideIndex, setSlideIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)

  const handleLeftArrow = useCallback(() => {
    setSlideIndex(prev => prev > 0 ? prev - 1 : prev)
  }, [])

  const handleRightArrow = useCallback(() => {
    setSlideIndex(prev => prev < projects.length - 1 ? prev + 1 : prev)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleLeftArrow()
      if (e.key === 'ArrowRight') handleRightArrow()
    }

    const container = carouselRef.current
    if (container) {
      container.addEventListener('keydown', handleKeyDown)
      return () => container.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleLeftArrow, handleRightArrow])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleRightArrow()
      else handleLeftArrow()
    }
  }

  return (
    <section id='projects' className="comp-wrapper" aria-label="Projects">
      <h2>Projects</h2>
      <button
        onClick={handleLeftArrow}
        style={slideIndex === 0 ? { opacity: '50%' } : { opacity: '100%' }}
        className="arrowWrapper leftArrowWrapper"
        aria-label="Previous project"
        disabled={slideIndex === 0}
      >
        <i className="arrow left"></i>
      </button>
      <div
        ref={carouselRef}
        tabIndex={0}
        style={{ width: `${350 * projects.length}px` }}
        className="projectContainer"
        role="region"
        aria-roledescription="carousel"
        aria-label="Project carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {projects.map(proj => (
          <ProjectTile key={proj.id} data={proj} leftPx={`${38 + 350 * (proj.id - slideIndex)}px`} />
        ))}
      </div>
      <button
        onClick={handleRightArrow}
        style={slideIndex === projects.length - 1 ? { opacity: '50%' } : { opacity: '100%' }}
        className="arrowWrapper rightArrowWrapper"
        aria-label="Next project"
        disabled={slideIndex === projects.length - 1}
      >
        <i className="arrow right"></i>
      </button>
      <p className="slideIndicator" aria-live="polite">
        {slideIndex + 1} of {projects.length}
      </p>
    </section>
  )
}

export default Projects
