import useAppSelector from "../hooks/useAppSelector";
import { Table } from "@mui/joy";

const ReleasedGamesTab = () => {
  const releasedGames = useAppSelector((state) => state.releasedGames.value);
  return (
    <Table style={{ maxWidth: "100%" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Features</th>
          <th>Bugs</th>
        </tr>
      </thead>
      <tbody>
        {releasedGames.map((releasedGame) => {
          return (
            <tr>
              <td>{releasedGame.name}</td>
              <td>{releasedGame.features}</td>
              <td>{releasedGame.bugs}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ReleasedGamesTab;
