import InputForm from "@/components/Input";
import { useCallback, useEffect, useState } from "react";
import { unwrapEth, wrapEth } from "@/utils/weth";
import { useBalances } from "@/hooks/useBalances";
import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

enum actionType {
  wrap = "wrap",
  unwrap = "unwrap",
}

export default function WrapEth() {
  const [ethBalance, setEthBalance] = useState("");
  const [wethBalance, setWethBalance] = useState<string>("");
  const { getEthBalance, getWethBalance } = useBalances();
  const [isWrap, setIsWrap] = useState(true);
  const displayedBalance = isWrap ? ethBalance : wethBalance;

  const getBalances = useCallback(async () => {
    setEthBalance((await getEthBalance()) || "0");
    setWethBalance((await getWethBalance()) || "0");
  }, [getEthBalance, getWethBalance]);

  useEffect(() => {
    getBalances();
  }, [getBalances]);

  return (
    <Box
      display="flex"
      justifyItems="center"
      justifyContent="center"
      height="90vh"
    >
      <Paper sx={{ width: "100%", maxWidth: "900px", m: "auto", p: "32px" }}>
        <Typography variant="h2" mb={6} display="flex" justifyContent="center">
          Eth Wrapper
        </Typography>
        <Box mb={8} display="flex" justifyContent="center">
          <ToggleButtonGroup
            color="primary"
            size="large"
            value={isWrap ? actionType.wrap : actionType.unwrap}
            exclusive
            onChange={(_, newValue: actionType) =>
              setIsWrap(newValue === actionType.wrap)
            }
            aria-label="Platform"
          >
            <ToggleButton value={actionType.wrap}>
              {actionType.wrap}
            </ToggleButton>
            <ToggleButton value={actionType.unwrap}>
              {actionType.unwrap}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <InputForm
          balance={displayedBalance}
          isWrap={isWrap}
          onWrap={(amount: string) => wrapEth(amount)}
          onUnwrap={(amount: string) => unwrapEth(amount)}
        />
      </Paper>
    </Box>
  );
}
