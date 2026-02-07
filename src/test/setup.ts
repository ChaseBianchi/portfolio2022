import '@testing-library/jest-dom/vitest'

// Mock IntersectionObserver for react-vertical-timeline-component
class MockIntersectionObserver {
  root = null
  rootMargin = ''
  thresholds: readonly number[] = []

  constructor() {
    this.root = null
    this.rootMargin = ''
    this.thresholds = []
  }

  observe() { return null }
  unobserve() { return null }
  disconnect() { return null }
  takeRecords() { return [] }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
})
