import { unwrapEth, wrapEth } from "@/utils/weth";
import css from "./page.module.css";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState, ChangeEvent, useCallback } from "react";

export default function InputForm({
  isWrap,
  balance,
}: {
  isWrap: boolean;
  balance: string;
  // onSubmit: () => void;
}) {
  const [amount, setAmount] = useState("0");
  // const [isLoading, setIsLoading] = useState("0");
  const [amountError, setAmountError] = useState<string | undefined>(undefined);

  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replaceAll(",", ".");

    setAmount(newValue);
  };

  const onSetToMax = useCallback(() => {
    setAmount(balance);
  }, [balance]);

  const onSubmit = async () => {
    try {
      if (isWrap) {
        await wrapEth(amount);
      } else {
        await unwrapEth(amount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper className={css.container}>
      <Typography>
        {isWrap ? "ETH " : "WETH "} balance: {balance}
      </Typography>
      <Box display="flex">
        <TextField
          variant="outlined"
          fullWidth
          onFocus={(event) => {
            event.target.select();
          }}
          value={amount}
          onChange={onChangeAmount}
          helperText={amountError}
          error={!!amountError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <button
                  disabled={false}
                  onClick={onSetToMax}
                  className={css.maxButton}
                >
                  Max
                </button>
              </InputAdornment>
            ),
          }}
          className={css.input}
          sx={{ flex: 3, mr: 4 }}
        />
        <Button
          onClick={onSubmit}
          variant="contained"
          fullWidth
          disableElevation
          sx={{ flex: 1 }}
          disabled={Number(amount) === 0}
        >
          {/* {isLocking ? <CircularProgress size={20} /> : "Lock"} */}
          {isWrap ? "Wrap ETH" : "Unwrap WETH"}
        </Button>
      </Box>
    </Paper>
  );
}
