import { Table } from "@mui/joy";
import {
  computeIncomeTax,
  computeOfficeCostPerSecond,
  computePayrollExpense,
  computeRevenueFromGameSales,
  roundPerSecond,
} from "../utils";
import useAppSelector from "../hooks/useAppSelector";
import useHypePerSecond from "../hooks/useHypePerSecond";

const FinancialTab = () => {
  const releasedGames = useAppSelector((state) => state.releasedGames.value);
  const gameProfitability = useAppSelector(
    (state) => state.gameProfitability.value,
  );
  const revenueFromGameSales = computeRevenueFromGameSales(
    releasedGames,
    gameProfitability,
  );
  const hypePerSecond = useHypePerSecond();
  const featureDevelopers = useAppSelector(
    (state) => state.featureDevelopers.value,
  );
  const bugFixers = useAppSelector((state) => state.bugFixers.value);
  const accountants = useAppSelector((state) => state.accountants.value);
  const payrollExpense = computePayrollExpense(
    hypePerSecond,
    featureDevelopers,
    bugFixers,
  );
  const office = useAppSelector((state) => state.office.value);
  const officeExpense = computeOfficeCostPerSecond(office);
  const taxExpense = computeIncomeTax(revenueFromGameSales, accountants);
  return (
    <Table style={{ maxWidth: "100%" }}>
      <thead>
        <tr>
          <th>Line Item</th>
          <th>Amount ($)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Revenue from Game Sales</td>
          <td>{roundPerSecond(revenueFromGameSales)}</td>
        </tr>
        <tr>
          <td>Office Expense</td>
          <td>{roundPerSecond(officeExpense)}</td>
        </tr>
        <tr>
          <td>Payroll Expense</td>
          <td>{roundPerSecond(payrollExpense)}</td>
        </tr>
        <tr>
          <td>Income Taxes</td>
          <td>{roundPerSecond(taxExpense)}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default FinancialTab;
