import useAppSelector from "../hooks/useAppSelector";
import { Table } from "@mui/joy";
import { computeMoneyPerSecondForSingleGame, roundMoney } from "../utils";

const ReleasedGamesTab = () => {
  const releasedGames = useAppSelector((state) => state.releasedGames.value);
  const gameProfitability = useAppSelector(
    (state) => state.gameProfitability.value,
  );
  return (
    <Table style={{ maxWidth: "100%" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Features</th>
          <th>Bugs</th>
          <th>$/Second</th>
        </tr>
      </thead>
      <tbody>
        {releasedGames.map((releasedGame) => {
          return (
            <tr>
              <td>
                {releasedGame.name.length > 20
                  ? releasedGame.name.slice(0, 20) + "..."
                  : releasedGame.name}
              </td>
              <td>{Math.round(releasedGame.features)}</td>
              <td>{Math.round(releasedGame.bugs)}</td>
              <td>
                {roundMoney(
                  computeMoneyPerSecondForSingleGame(
                    releasedGame,
                    gameProfitability,
                  ),
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ReleasedGamesTab;
