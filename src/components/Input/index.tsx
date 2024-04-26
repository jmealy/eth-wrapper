"use client";

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
}) {
  const [amount, setAmount] = useState("0");
  const [amountError, setAmountError] = useState<string | undefined>(undefined);

  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replaceAll(",", ".");

    setAmount(newValue);
  };

  const onSetToMax = useCallback(() => {}, []);

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
          onClick={() => {}}
          variant="contained"
          fullWidth
          disableElevation
          sx={{ flex: 1 }}
          // disabled={isDisabled}
        >
          {/* {isLocking ? <CircularProgress size={20} /> : "Lock"} */}
          {isWrap ? "Wrap ETH" : "Unwrap WETH"}
        </Button>
      </Box>
    </Paper>
  );
}
