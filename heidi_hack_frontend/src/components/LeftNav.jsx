import React, { useState, useEffect } from 'react'
import './LeftNav.css'

function LeftNav() {
  const [filters, setFilters] = useState({
    conditions: ['Diabetes'],
    timeframe: 'Last 3 Months',
    customDateRange: { start: '', end: '' },
    eventTypes: ['Med Stopped'],
    showDeviationsOnly: true,
    ageRange: [50, 70],
    sex: 'Any',
    background: 'Any',
    clusterTags: ['Polypharmacy', 'Frequent Attender'],
    sortBy: 'Most Complex'
  })

  const [patientsFound, setPatientsFound] = useState(142)

  // Update patient count when filters change
  useEffect(() => {
    const calculatePatientCount = () => {
      let baseCount = 250
      baseCount -= filters.conditions.length * 12
      baseCount -= filters.eventTypes.length * 8
      baseCount -= filters.clusterTags.length * 15
      if (filters.showDeviationsOnly) baseCount *= 0.6
      const ageSpan = filters.ageRange[1] - filters.ageRange[0]
      baseCount *= (ageSpan / 100)
      return Math.max(Math.floor(baseCount), 0)
    }
    setPatientsFound(calculatePatientCount())
  }, [filters])

  const handleConditionChange = (condition) => {
    setFilters(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }))
  }

  const handleEventTypeChange = (eventType) => {
    setFilters(prev => ({
      ...prev,
      eventTypes: prev.eventTypes.includes(eventType)
        ? prev.eventTypes.filter(e => e !== eventType)
        : [...prev.eventTypes, eventType]
    }))
  }

  const handleClusterTagChange = (tag) => {
    setFilters(prev => ({
      ...prev,
      clusterTags: prev.clusterTags.includes(tag)
        ? prev.clusterTags.filter(t => t !== tag)
        : [...prev.clusterTags, tag]
    }))
  }

  const handleAgeRangeChange = (event) => {
    const value = parseInt(event.target.value)
    const isMin = event.target.name === 'ageMin'
    setFilters(prev => ({
      ...prev,
      ageRange: isMin ? [value, prev.ageRange[1]] : [prev.ageRange[0], value]
    }))
  }

  const resetFilters = () => {
    setFilters({
      conditions: [],
      timeframe: 'Last 3 Months',
      customDateRange: { start: '', end: '' },
      eventTypes: [],
      showDeviationsOnly: false,
      ageRange: [0, 100],
      sex: 'Any',
      background: 'Any',
      clusterTags: [],
      sortBy: 'Most Recent'
    })
  }

  return (
    <div className="smart-refine-panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <span className="icon">🔍</span>
          Refine
        </h2>
      </div>

      <div className="panel-content">
        {/* Conditions */}
        <div className="filter-section">
          <h3 className="section-title">
            <span className="icon">✅</span>
            Conditions
          </h3>
          <div className="checkbox-group">
            {['Diabetes', 'Cardiovascular', 'CKD', 'PCOS', 'Asthma'].map(condition => (
              <label key={condition} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.conditions.includes(condition)}
                  onChange={() => handleConditionChange(condition)}
                />
                <span className="checkmark"></span>
                {condition}
              </label>
            ))}
          </div>
        </div>

        {/* Timeframe */}
        <div className="filter-section">
          <h3 className="section-title">
            <span className="icon">🕒</span>
            Timeframe
          </h3>
          <div className="radio-group">
            {['Last Week', 'Last 3 Months', 'This Year', 'Custom Range'].map(timeframe => (
              <label key={timeframe} className="radio-item">
                <input
                  type="radio"
                  name="timeframe"
                  checked={filters.timeframe === timeframe}
                  onChange={() => setFilters(prev => ({ ...prev, timeframe }))}
                />
                <span className="radio-mark"></span>
                {timeframe}
              </label>
            ))}
          </div>
          {filters.timeframe === 'Custom Range' && (
            <div className="date-range">
              <input
                type="date"
                className="date-input"
                value={filters.customDateRange.start}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  customDateRange: { ...prev.customDateRange, start: e.target.value }
                }))}
              />
              <input
                type="date"
                className="date-input"
                value={filters.customDateRange.end}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  customDateRange: { ...prev.customDateRange, end: e.target.value }
                }))}
              />
            </div>
          )}
        </div>

        {/* Event Type */}
        <div className="filter-section">
          <h3 className="section-title">
            <span className="icon">📦</span>
            Event Type
          </h3>
          <div className="checkbox-group">
            {['Referral Made', 'Med Started', 'Med Stopped', 'Abnormal Lab', 'No Follow-up'].map(eventType => (
              <label key={eventType} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.eventTypes.includes(eventType)}
                  onChange={() => handleEventTypeChange(eventType)}
                />
                <span className="checkmark"></span>
                {eventType}
              </label>
            ))}
          </div>
        </div>

        {/* Deviation */}
        <div className="filter-section">
          <h3 className="section-title">
            <span className="icon">⚠️</span>
            Deviation
          </h3>
          <label className="toggle-item">
            <input
              type="checkbox"
              checked={filters.showDeviationsOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, showDeviationsOnly: e.target.checked }))}
            />
            <span className="toggle-switch"></span>
            Show Deviations Only
          </label>
        </div>

        {/* Demographics */}
        <div className="filter-section">
          <h3 className="section-title">
            <span className="icon">👥</span>
            Demographics
          </h3>
          <div className="demographics-group">
            <div className="age-slider">
              <label className="slider-label">Age {filters.ageRange[0]}–{filters.ageRange[1]}</label>
              <div className="dual-slider">
                <input
                  type="range"
                  name="ageMin"
                  min="0"
                  max="100"
                  value={filters.ageRange[0]}
                  onChange={handleAgeRangeChange}
                  className="slider slider-min"
                />
                <input
                  type="range"
                  name="ageMax"
                  min="0"
                  max="100"
                  value={filters.ageRange[1]}
                  onChange={handleAgeRangeChange}
                  className="slider slider-max"
                />
              </div>
            </div>
            <div className="sex-radio">
              <label className="demo-label">Sex:</label>
              <div className="radio-group-inline">
                {['Any', 'Male', 'Female'].map(sex => (
                  <label key={sex} className="radio-item-inline">
                    <input
                      type="radio"
                      name="sex"
                      checked={filters.sex === sex}
                      onChange={() => setFilters(prev => ({ ...prev, sex }))}
                    />
                    <span className="radio-mark"></span>
                    {sex}
                  </label>
                ))}
              </div>
            </div>
            <div className="background-select">
              <label className="demo-label">Background:</label>
              <select
                value={filters.background}
                onChange={(e) => setFilters(prev => ({ ...prev, background: e.target.value }))}
                className="select-input"
              >
                <option value="Any">Any</option>
                <option value="CALD">CALD</option>
                <option value="ATSI">ATSI</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cluster Tags */}
        <div className="filter-section">
          <h3 className="section-title">
            <span className="icon">🧠</span>
            Cluster Tags
          </h3>
          <div className="checkbox-group">
            {['Polypharmacy', 'Frequent Attender', 'Complex Multimorbidity', 'Language Barrier'].map(tag => (
              <label key={tag} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.clusterTags.includes(tag)}
                  onChange={() => handleClusterTagChange(tag)}
                />
                <span className="checkmark"></span>
                {tag}
              </label>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div className="filter-section">
          <h3 className="section-title">
            <span className="icon">🔄</span>
            Sort By
          </h3>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            className="select-input"
          >
            <option value="Most Recent">Most Recent</option>
            <option value="Most Deviant">Most Deviant</option>
            <option value="Most Complex">Most Complex</option>
            <option value="Needs Follow-up">Needs Follow-up</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="panel-actions">
        <button onClick={resetFilters} className="reset-btn">
          Reset Filters
        </button>
        <div className="patients-found">
          <span className="count">{patientsFound}</span>
          <span className="label">Patients Found</span>
        </div>
      </div>
    </div>
  )
}

export default LeftNav
