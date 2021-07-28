import React from "react"

const CompletedToggle = ({ viewCompleted, onChangeViewCompleted }) => {
  const handleClick = (event) => event.target.getAttribute("name") === "complete" ? onChangeViewCompleted(true) : onChangeViewCompleted(false)

  return (
    <div className="toggle-container">
      <span className={`incomplete view-toggle${viewCompleted ? "" : " active"}`} name="incomplete" onClick={handleClick} >
        Unfinished
      </span>
      <span className={`complete view-toggle${viewCompleted ? " active" : ""}`} name="complete" onClick={handleClick} >
        Finished
      </span>
    </div>
  )
}

export default CompletedToggle
