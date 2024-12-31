import useAppSelector from "../hooks/useAppSelector";
import { Table } from "@mui/joy";
import {
  computeAgePenalty,
  computeMoneyPerSecondForSingleGame,
  roundMoney,
} from "../utils";

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
          <th>Hype</th>
          <th>Revenue ($/Second)</th>
          <th>Age Penalty ($/Second)</th>
        </tr>
      </thead>
      <tbody>
        {releasedGames.map((releasedGame, index) => {
          return (
            <tr>
              <td>
                {releasedGame.name.length > 20
                  ? releasedGame.name.slice(0, 20) + "..."
                  : releasedGame.name}
              </td>
              <td>{Math.round(releasedGame.features)}</td>
              <td>{Math.round(releasedGame.bugs)}</td>
              <td>{Math.round(releasedGame.hype)}</td>
              <td>
                {roundMoney(
                  computeMoneyPerSecondForSingleGame(
                    releasedGame,
                    gameProfitability,
                    releasedGames.length - index - 1,
                  ),
                )}
              </td>
              <td>{computeAgePenalty(releasedGames.length - index - 1)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ReleasedGamesTab;
