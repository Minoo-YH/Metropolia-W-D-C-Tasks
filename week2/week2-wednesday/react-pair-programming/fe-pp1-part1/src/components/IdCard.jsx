function IdCard(props) {
  return (
    <div className="box id-card">
      <p><strong>First name:</strong> {props.firstName}</p>
      <p><strong>Last name:</strong> {props.lastName}</p>
      <p><strong>Gender:</strong> {props.gender}</p>
      <p><strong>Height:</strong> {props.height} cm</p>
      <p><strong>Birth:</strong> {props.birth.toDateString()}</p>
      <img src={props.picture} alt="profile" />
    </div>
  );
}

export default IdCard;

