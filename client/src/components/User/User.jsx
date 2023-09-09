export const User = ({ user, index }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.peerFives.balance}</td>
      <td>{user.reward.balance}</td>
      <button>login</button>
    </tr>
  );
};
