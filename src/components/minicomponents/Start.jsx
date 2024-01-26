function Star() {
    let poseX = Math.random() * 100;
    let poseY = Math.random() * 100;
    let scale = Math.random() * 2;

  return (
    <div className={`absolute w-[50px] h-[50px]`} style={{"top" : poseX + "%", "left" : poseY + "%" }}>
        <span className={`block absolute bg-white rounded-[50%] top-[23px] left-[23px]`} style={{"padding" : scale, "boxShadow" : "3px 0 10px azure , -3px 0 10px azure, 0 3px 10px azure, 0 -3px 10px azure"}}>

        </span>
    </div>
  )
}

export default Star